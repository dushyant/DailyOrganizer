import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__fields">
          <div class="form-group">
            <label for="inputMealName">Meal name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter meal name"
              formControlName="name"
              id="inputMealName">
            <div class="error" *ngIf="required">
              Meal name is required
            </div>
          </div>
        </div>
        <div class="meal-form__fields">
          <div class="form-group">
            <div class="d-flex align-items-center mb-2">
              <label class="flex-grow-1">Food</label>
              <button
                type="button"
                class="btn btn-success btn-sm"
                (click)="addFood()">
                <fa-icon [icon]="faPlus"></fa-icon>
                Add food
              </button>
            </div>
            <div formArrayName="foods">
              <label
                class="d-flex"
                *ngFor="let food of foods.controls; index as i;">
                <input
                  class="form-control"
                  [formControlName]="i" 
                  placeholder="e.g. Oatmeal">
                <button
                  type="button"
                  class="btn btn-danger flex-shrink-1"
                  (click)="removeFood(i)">
                  <fa-icon [icon]="faTrash"></fa-icon>
                </button>
              </label>
            </div>
          </div>
        </div>
        <div class="meal-form__submit p-4 d-flex">
          <div class="flex-grow-1">
            <button
              type="button"
              class="btn btn-primary mr-2"
              *ngIf="!exists"
              (click)="createMeal()">
              Create meal
            </button>
            <button
              type="button"
              class="btn btn-primary mr-2"
              *ngIf="exists"
              (click)="updateMeal()">
              Save
            </button>
            <button
              type="button"
              class="btn btn-light"
              [routerLink]="['../']">
              Cancel
            </button>
          </div>

          <div class=" d-flex flex-shrink-1" *ngIf="exists">
            <div class="d-flex align-items-start item-delete" *ngIf="toggled">
              <p> Delete item?</p>
              <button class="btn btn-danger btn-sm mr-2"  type="button" (click)="removeMeal()">
                Yes
              </button>
              <button class="btn btn-light btn-sm mr-2" type="button" (click)="toggle()">
                No
              </button>
            </div>
            <div  class="flex-shrink-1">
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
export class MealFormComponent implements OnChanges {

  faPlus = faPlus;
  faTrash = faTrash;

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