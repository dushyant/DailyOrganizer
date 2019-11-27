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
        <div class="exercise-form__name">
          <label>
            <h3>Exercise name</h3>
            <input
              type="text"
              placeholder="e.g. Running, Yoga, Streching"
              formControlName="name">
            <div class="error" *ngIf="required">
              Exercise name is required
            </div>
          </label>
          <label>
            <h3>Duration <span>(minutes)</span></h3>
            <input
              type="number"
              placeholder="Enter exercise duration"
              formControlName="duration">
            <div class="error" *ngIf="required">
              Duration is required
            </div>
          </label>
          <label>
            <h3>Notes <span>(optional)</span></h3>
            <textarea
              type="type"
              placeholder="Enter exercise notes"
              formControlName="notes">
            </textarea>
          </label>
        </div>

        <div class="exercise-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createExercise()">
              Create exercise
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateExercise()">
              Save
            </button>
            <a 
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="exercise-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p> Delete exercise?</p>
              <button class="confirm"  type="button" (click)="removeExercise()">
                Yes
              </button>
              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>
            </div>

            <button class="button button--delete" type="button" (click)="toggle()">
              Delete
            </button>
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