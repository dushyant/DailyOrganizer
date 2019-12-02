import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus, faHamburger } from "@fortawesome/free-solid-svg-icons"

import { Store } from 'store';

import { MealsService, Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1 class="text-dark">
          <fa-icon class="text-dark mr-2" [icon]="faHamburger"></fa-icon>
          My Meals
        </h1>
        <button
          type="button"
          class="btn btn-success btn-sm rounded-lg"
          [routerLink]="['../meals/new']">
          <fa-icon [icon]="faPlus"></fa-icon>
          New Meal
        </button>
      </div>
      <div *ngIf="meals$ | async as meals; else loading;">
        <div class="message p-4" *ngIf="!meals.length">
          No meals. Add a new meal.
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" *ngFor="let meal of meals">
            <list-item 
              [itemType]="itemType"
              [item]="meal"
              (remove)="removeMeal($event)">
            </list-item>
          </li>
        </ul>
      </div>
      <ng-template #loading>
      <div class="p-3 d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {

  faPlus = faPlus;
  faHamburger = faHamburger;
  itemType: string = 'meals'

  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(meal: Meal) {
    this.mealsService.removeMeal(meal.$key);
  }

}