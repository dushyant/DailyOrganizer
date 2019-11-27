import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Meal, MealsService } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <span *ngIf="meal$ | async as meal; else title">
          {{ meal.name ? 'Edit' : 'Create'}} Meal
          </span>
          <ng-template #title>
            Loading
          </ng-template>
        </h1>
      </div>
      <div *ngIf="meal$ | async as meal; else loading;">
        <meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div>
      <ng-template>
        <div class="message">Loading...</div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<any>;
  subscription: Subscription

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(
      switchMap(param => this.mealsService.getMeal(param.id))
      );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  async addMeal(meal: Meal) {
    await this.mealsService.addMeal(meal);
    this.backToMeal();
  }

  async updateMeal(meal: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.updateMeal(key, meal);
    this.backToMeal();
  }

  async removeMeal(meal: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealsService.removeMeal(key);
    this.backToMeal();
  }

  backToMeal() {
    this.router.navigate(['meals']);
  }
}