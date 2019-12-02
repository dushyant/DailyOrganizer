import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlus, faDumbbell } from "@fortawesome/free-solid-svg-icons"

import { Store } from 'store';

import { ExercisesService, Exercise } from '../../../shared/services/exercises/exercises.service';

@Component({
  selector: 'exercises',
  styleUrls: ['exercises.component.scss'],
  template: `
    <div class="exercises">
      <div class="exercises__title">
        <h1 class="text-dark">
          <fa-icon class="text-dark mr-1" [icon]="faDumbbell"></fa-icon>
          My Exercises
        </h1>
        <button
          type="button"
          class="btn btn-success btn-sm rounded-lg"
          [routerLink]="['../exercises/new']">
          <fa-icon [icon]="faPlus"></fa-icon>
          New Exercise
        </button>
      </div>
      <div *ngIf="exercises$ | async as exercises; else loading;">
        <div class="message p-4" *ngIf="!exercises.length">
          No exercises. Add a new exercises.
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" *ngFor="let exercise of exercises">
            <list-item 
              [itemType]="itemType"
              [item]="exercise"
              (remove)="removeExercise($event)">
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
export class ExercisesComponent implements OnInit, OnDestroy {

  faDumbbell = faDumbbell;
  faPlus = faPlus;
  itemType: string = 'exercises'

  exercises$: Observable<Exercise[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private exercisesServices: ExercisesService
  ) {}

  ngOnInit() {
    this.exercises$ = this.store.select<Exercise[]>('exercises');
    this.subscription = this.exercisesServices.exercises$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeExercise(exercise: Exercise) {
    this.exercisesServices.removeExercise(exercise.$key);
  }

}