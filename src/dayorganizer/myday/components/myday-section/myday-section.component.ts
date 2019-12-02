import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Meal } from './../../../shared/services/meals/meals.service';
import { Exercise } from './../../../shared/services/exercises/exercises.service';
import { Task } from './../../../shared/services/mytasks/mytasks.service';

import { DayItem } from './../../../shared/services/myday/myday.service';
import { faDumbbell, faHamburger, faPen, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'myday-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['myday-section.component.scss'],
  template: `
    <div class="myday-section">
      <div class="myday-section__bar">{{name}}</div>
      <div>
        <div 
          class="myday-section__item"
          *ngIf="daySection.meals; else addMeal">
          <fa-icon [icon]="faHamburger"></fa-icon>
          <span>{{ daySection.meals | join }}</span>
          <button
            type="button"
            class="btn btn-outline-dark btn-sm"
            (click)="onSelect('meals', daySection.meals)">
            <fa-icon [icon]="faPen"></fa-icon>
          </button>
        </div>
        <ng-template #addMeal>
          <div 
            class="myday-section__item">
            <fa-icon [icon]="faHamburger"></fa-icon>
            <button
              class="btn btn-outline-dark btn-sm add-btn"
              (click)="onSelect('meals')">
              <fa-icon [icon]="faPlus"></fa-icon>
              Add meal
            </button>
          </div>
        </ng-template>
        <div 
          class="myday-section__item"
          *ngIf="daySection.exercises; else addExercise">
          <fa-icon [icon]="faDumbbell"></fa-icon> 
          <span>{{ daySection.exercises | join }}</span>
          <button
            type="button"
            class="btn btn-outline-dark btn-sm"
            (click)="onSelect('exercises', daySection.exercises)">
            <fa-icon [icon]="faPen"></fa-icon>
          </button>
        </div>
        <ng-template #addExercise>
        <div 
          class="myday-section__item">
          <fa-icon [icon]="faDumbbell"></fa-icon> 
          <button
            class="btn btn-outline-dark btn-sm add-btn"
            (click)="onSelect('exercises')">
            <fa-icon [icon]="faPlus"></fa-icon>
            Add exercise
          </button>
        </div>
        </ng-template>
        <div 
          class="myday-section__item"
          *ngIf="daySection.tasks; else addTask">
          <fa-icon [icon]="faTasks"></fa-icon> 
          <span>{{ daySection.tasks | join }}</span>
          <button
            type="button"
            class="btn btn-outline-dark btn-sm"
            (click)="onSelect('tasks', daySection.tasks)">
            <fa-icon [icon]="faPen"></fa-icon>
          </button>
        </div>
        <ng-template #addTask>
        <div 
          class="myday-section__item">
          <fa-icon [icon]="faTasks"></fa-icon> 
          <button
            class="btn btn-outline-dark btn-sm add-btn"
            (click)="onSelect('tasks')">
            <fa-icon [icon]="faPlus"></fa-icon>
            Add task
          </button>
        </div>
        </ng-template>
      </div>
    </div>
  `
})
export class MyDaySectionComponent {

  faDumbbell = faDumbbell;
  faHamburger = faHamburger;
  faPen = faPen;
  faPlus = faPlus;
  faTasks = faTasks;

  @Input()
  name: string;

  @Input()
  daySection: DayItem;

  @Output()
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: Meal[] | Exercise[] | Task[] = []) {
    const data = this.daySection;
    this.select.emit({
      type,
      assigned,
      data
    })
  }

}