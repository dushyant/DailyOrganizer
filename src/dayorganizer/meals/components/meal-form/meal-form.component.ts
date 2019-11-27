import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="Enter meal name"
              formControlName="name">
            <div class="error" *ngIf="required">
              Meal name is required
            </div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addFood()">
              Add food
            </button>
          </div>
          <div formArrayName="foods">
            <label *ngFor="let food of foods.controls; index as i;">
              <input [formControlName]="i" placeholder="e.g. Oatmeal">
              <span
                class="meal-form__remove"
                (click)="removeFood(i)">
                X
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createMeal()">
              Create meal
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateMeal()">
              Save
            </button>
            <a 
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p> Delete item?</p>
              <button class="confirm"  type="button" (click)="removeMeal()">
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
export class MealFormComponent implements OnChanges {

  exists: Boolean = false;
  toggled: Boolean = false;

  @Input()
  meal: Meal

  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove =new EventEmitter<Meal>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    foods: this.formBuilder.array([''])
  });

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.clearFoods();

      const value = this.meal;
      this.form.patchValue(value);

      if (value.foods) {
        for(let food of value.foods) {
          this.foods.push(new FormControl(food));
        }
      }
    }
  }

  get foods() {
    return this.form.get('foods') as FormArray;
  }

  get required() {
    return(
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  clearFoods() {
    while(this.foods.controls.length) {
      this.foods.removeAt(0);
    }
  }

  addFood() {
    this.foods.push(new FormControl(''));
  }

  removeFood(index: number) {
    this.foods.removeAt(index);
  }
  
  createMeal() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}