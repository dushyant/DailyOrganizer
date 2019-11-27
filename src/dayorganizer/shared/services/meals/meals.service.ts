import { Observable, of } from 'rxjs';
import { Meal } from './meals.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap, filter } from "rxjs/operators";

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';
import { Store } from 'store';

export interface Meal {
  name: string,
  foods: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<Meal[]> = this.afdb.list(`meals/${this.uid}`)
    .snapshotChanges().pipe(
      map(meals => {
        return meals.map(meal => ({ $key: meal.key, ...meal.payload.val() as Meal }))
      }
      ),
      tap(next => this.store.set('meals', next))
    );

  constructor(
    private store: Store,
    private afdb: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if (!key) return of({});
    return this.store.select<Meal[]>('meals').pipe(
      filter(meals => meals !== null && meals !== undefined),
      map(meals => meals.find((meal: Meal) => meal.$key === key))
    );
  }

  addMeal(meal: Meal) {
    return this.afdb.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.afdb.list(`meals/${this.uid}`).remove(key);
  }

  updateMeal(key: string, meal: Meal) {
    return this.afdb.object(`meals/${this.uid}/${key}`).update(meal);
  }

}