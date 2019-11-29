import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Exercise } from '../../../shared/services/exercises/exercises.service';


@Component({
  selector: 'exercise-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['exercise-form.component.scss'],
  template: `
    <div class="exercise-form">
      <form [formGroup]="form">
        <div class="exercise-form__fields">
          <div class="form-group">
            <label for="inputExerciseName">Exercise name</label>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Running, Yoga, Streching"
              formControlName="name"
              id="inputExerciseName">
            <div class="alert alert-danger mt-1" role="alert" *ngIf="required">
              Exercise name is required
            </div>
          </div>
          <div class="form-group">
            <label for="inputExerciseDuration">Duration <span>(minutes)</span></label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter exercise duration"
              formControlName="duration"
              id="inputExerciseDuration">
          </div>
          <div class="form-group">
            <label for="textareaNotes">Notes <span>(optional)</span></label>
            <textarea
              type="type"
              class="form-control"
              placeholder="Enter exercise notes"
              formControlName="notes"
              id="textareaNotes">
            </textarea>
          </div>
        </div>
        <div class="p-4 d-flex">
          <div class="flex-grow-1">
            <button
              type="button"
              class="btn btn-primary mr-2"
              *ngIf="!exists"
              (click)="createExercise()">
              Create exercise
            </button>
            <button
              type="button"
              class="btn btn-primary mr-2"
              *ngIf="exists"
              (click)="updateExercise()">
              Save
            </button>
            <button 
              type="button"
              class="btn btn-light"
              [routerLink]="['../']">
              Cancel
            </button>
          </div>

          <div class="d-flex flex-shrink-1" *ngIf="exists">
            <div class="d-flex align-items-start item-delete" *ngIf="toggled">
              <p class="mr-2"> Delete exercise?</p>
              <button class="btn btn-danger btn-sm mr-2"  type="button" (click)="removeExercise()">
                Yes
              </button>
              <button class="btn btn-light btn-sm mr-2" type="button" (click)="toggle()">
                No
              </button>
            </div>
            <div class="flex-shrink-1">
              <button class="btn btn-danger" type="button" (click)="toggle()">
                Delete
              </button>
            </div>
          </div>
        </div>
    </form>
  </div>
  `
})
export class ExerciseFormComponent implements OnChanges {

  exists: Boolean = false;
  toggled: Boolean = false;

  @Input()
  exercise: Exercise

  @Output()
  create = new EventEmitter<Exercise>();

  @Output()
  update = new EventEmitter<Exercise>();

  @Output()
  remove =new EventEmitter<Exercise>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    duration: [0, Validators.required],
    notes: ['']
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.exercise && this.exercise.name) {
      this.exists = true;

      const value = this.exercise;
      this.form.patchValue(value);
    }
  }

  get required() {
    return(
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  createExercise() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateExercise() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeExercise() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}