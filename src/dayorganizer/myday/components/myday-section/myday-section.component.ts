import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { DayItem } from './../../../shared/services/myday/myday.service';

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
          *ngIf="daySection.meals; else addMeal"
          (click)="onSelect('meals', daySection.meals)">
          <span>{{ daySection.meals | join }}</span>
        </div>
        <ng-template #addMeal>
          <div 
            class="myday-section__item"
            (click)="onSelect('meals')">
            (+) Add meal
          </div>
        </ng-template>
        <div 
          class="myday-section__item"
          *ngIf="daySection.exercises; else addExercise"
          (click)="onSelect('exercises', daySection.exercises)">
          <span>{{ daySection.exercises | join }}</span>
        </div>
        <ng-template #addExercise>
          <div 
            class="myday-section__item"
            (click)="onSelect('exercises')">
            (+) Add exercise
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class MealsSectionComponent {

  @Input()
  name: string;

  @Input()
  daySection: DayItem;

  @Output()
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: string[] = []) {
    const data = this.daySection;
    this.select.emit({
      type,
      assigned,
      data
    })
  }

}