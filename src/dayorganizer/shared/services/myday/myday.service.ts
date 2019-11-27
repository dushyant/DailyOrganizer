import { DayItem, DayItemList } from './myday.service';
import { AngularFireDatabase } from '@angular/fire/database';

import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, switchMap, withLatestFrom } from "rxjs/operators";

import { Store } from 'store';

import { AuthService } from './../../../../auth/shared/services/auth/auth.service';
import { Exercise } from './../exercises/exercises.service';
import { Meal } from './../meals/meals.service';

export interface DayItem {
  meals: Meal[],
  exercises: Exercise[],
  timestamp: number,
  section: string,
  $key?: string
}

export interface DayItemList {
  morning?: DayItem,
  noon?: DayItem,
  evening?: DayItem
  [key: string]: any
}

@Injectable()
export class MyDayService {

  private date$ = new BehaviorSubject(new Date);
  private section$ = new Subject();
  private itemList$ = new Subject();

  selected$ = this.section$.pipe(
    tap((next: any) => {
      return this.store.set('selected', next)
    })
  )

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  )

  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([ items, section ]: any[]) => {
      
      const id = section.data.$key;

      const defaults: DayItem = {
        exercises: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };
      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  )

  myday$: Observable<DayItem[]> = this.date$.pipe(
    tap((next: any) => {
      return this.store.set('date', next)
    }),
    map((day: any) => {    
      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return { startAt, endAt };

    }),
    switchMap(({ startAt, endAt }: any) => {
      const getDayValue = this.getDay(startAt, endAt).valueChanges();
      return getDayValue;
    }),
    map((data: any) => {
     
      const mapped: any = {};

      for(let prop of data) {     
        if(!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }
      
      return mapped;
    }),
    tap(next => {
      return this.store.set('myday', next)
    })
  );
  
  constructor(
    private store: Store,
    private authService: AuthService,
    private afdb: AngularFireDatabase
  ) {}

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  addItems(items: string[]) {   
    this.itemList$.next(items);
  }
  
  get uid() {
    return this.authService.user.uid;
  }

  private updateSection(key: string, payload: DayItem) {
    return this.afdb.object(`myday/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: DayItem) {
    return this.afdb.list(`myday/${this.uid}`).push(payload);
  }

  private getDay(startAt: number, endAt: number) {
    return this.afdb.list(`myday/${this.uid}`, (ref) => {
      return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt);
    });
  }

}