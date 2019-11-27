import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Exercise } from '../../../shared/services/exercises/exercises.service';
import { Meal } from '../../../shared/services/meals/meals.service';

@Component({
  selector: 'add-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['add-items.component.scss'],
  template: `
    <div class="add-items">
      <div class="add-items__modal">
        <div class="add-items__title">
          <h1>Add {{ section.type }} </h1>
          <a 
            class="btn__add"
            [routerLink]="getRoute(section.type)">
            (+) New {{ section.type }}
          </a>
        </div>

        <div class="add-items__list">
          <span 
            class="add-items__empty"
            *ngIf="!list?.length">
            No items to add
          </span>
          <div
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)">
            {{ item.name }}
          </div>
        </div>

        <div class="add-items__submit">
          <button 
            type="button"
            class="button"
            (click)="updateItem()">
            Update
          </button>
          <button 
            type="button"
            class="button button--cancel"
            (click)="cancelItem()">
            Cancel
          </button>
        </div>

      </div>
    </div>
  `
})
export class AddItemsComponent implements OnInit {

  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list: Meal[] | Exercise[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  updateItem() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelItem() {
    this.cancel.emit();
  }

}