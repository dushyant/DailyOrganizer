import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

// Services
import { MyDayService, DayItem } from './../../../shared/services/myday/myday.service';
import { Exercise, ExercisesService } from './../../../shared/services/exercises/exercises.service';
import { Meal, MealsService } from './../../../shared/services/meals/meals.service';

@Component({
  selector: 'my-day',
  styleUrls: ['myday.component.scss'],
  template: `
    <div class="my-day">
      <calendar-controls 
        [date]="date$ | async"
        [dayItems]="myDay$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </calendar-controls>

      <add-items
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="addItems($event)"
        (cancel)="closeAddItemModal()">
      </add-items>

    </div>
  `
})
export class MyDayComponent implements OnInit, OnDestroy {

  open: boolean = false;

  date$: Observable<Date>;
  myDay$: Observable<DayItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Exercise[]>;
  subscriptions: Subscription[] = [];
  
  constructor(
    private myDayService: MyDayService,
    private mealService: MealsService,
    private exercisesService: ExercisesService,
    private store: Store
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.myDay$ = this.store.select('myday');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.myDayService.myday$.subscribe(),
      this.myDayService.selected$.subscribe(),
      this.myDayService.list$.subscribe(),
      this.myDayService.items$.subscribe(),
      this.mealService.meals$.subscribe(),
      this.exercisesService.exercises$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.myDayService.updateDate(date);
  }

  changeSection(event: any) {       
    this.open = true;    
    this.myDayService.selectSection(event);    
  }

  addItems(items: string[]) {   
    this.myDayService.addItems(items);
    this.closeAddItemModal();
  }

  closeAddItemModal() {
    this.open = false;
  }
}