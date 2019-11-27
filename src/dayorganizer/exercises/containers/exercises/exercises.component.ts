import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { ExercisesService, Exercise } from '../../../shared/services/exercises/exercises.service';


@Component({
  selector: 'exercises',
  styleUrls: ['exercises.component.scss'],
  template: `
    <div class="exercises">
      <div class="exercises__title">
        <h1>My Exercises</h1>
        <a class="btn__add" [routerLink]="['../exercises/new']">New Exercises</a>
      </div>
      <div *ngIf="exercises$ | async as exercises; else loading;">
        <div class="message" *ngIf="!exercises.length">
          No exercises. Add a new exercises.
        </div>
        <list-item 
          *ngFor="let exercise of exercises"
          [item]="exercise"
          (remove)="removeExercise($event)">
        </list-item>
      </div>
      <ng-template #loading>
        <div class="message">Loading...</div>
      </ng-template>
    </div>
  `
})
export class ExercisesComponent implements OnInit, OnDestroy {

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