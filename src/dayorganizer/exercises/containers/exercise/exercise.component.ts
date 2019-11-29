import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faDumbbell } from "@fortawesome/free-solid-svg-icons"

import { Exercise, ExercisesService } from '../../../shared/services/exercises/exercises.service';

@Component({
  selector: 'exercise',
  styleUrls: ['exercise.component.scss'],
  template: `
    <div class="exercise">
      <div class="exercise__title">
        <h1>
          <span *ngIf="exercise$ | async as exercise; else title">
            <fa-icon class="text-dark mr-1" [icon]="faDumbbell"></fa-icon>
            {{ exercise.name ? 'Edit' : 'Create'}} exercise
          </span>
          <ng-template #title>
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </ng-template>
        </h1>
      </div>
      <div *ngIf="exercise$ | async as exercise; else loading;">
        <exercise-form
          [exercise]="exercise"
          (create)="addExercise($event)"
          (update)="updateExercise($event)"
          (remove)="removeExercise($event)">
        </exercise-form>
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
export class ExerciseComponent implements OnInit, OnDestroy {

  faDumbbell = faDumbbell;

  exercise$: Observable<any>;
  subscription: Subscription

  constructor(
    private exercisesService: ExercisesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 
  ngOnInit() {
    this.subscription = this.exercisesService.exercises$.subscribe();
    this.exercise$ = this.route.params.pipe(
      switchMap(param => this.exercisesService.getExercises(param.id))
      );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  async addExercise(exercise: Exercise) {
    await this.exercisesService.addExercise(exercise);
    this.backToExercise();
  }

  async updateExercise(exercise: Exercise) {
    const key = this.route.snapshot.params.id;
    await this.exercisesService.updateExercise(key, exercise);
    this.backToExercise();
  }

  async removeExercise(exercise: Exercise) {
    const key = this.route.snapshot.params.id;
    await this.exercisesService.removeExercise(key);
    this.backToExercise();
  }

  backToExercise() {
    this.router.navigate(['exercises']);
  }
}