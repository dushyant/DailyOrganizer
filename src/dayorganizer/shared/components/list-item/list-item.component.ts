import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">
        <p class="item-list__name"> {{item.name}} </p>
        <p class="item-list__items">
          <span *ngIf="item.foods; else showExercises"> 
            {{ item.foods | join }} 
          </span>        
        </p>
        <ng-template #showExercises>
          <span> Duration: {{ item.duration }} minutes </span>
          <span *ngIf="item.notes">| Notes: {{ item.notes }} </span>
        </ng-template>
      </a>
      <div 
        *ngIf="toggled"
        class="list-item__delete">
        <p> Delete item?</p>
        <button
          class="confirm"
          type="button"
          (click)="removeItem()">
          Yes
        </button>
        <button
          class="cancel"
          type="button"
          (click)="toggle()">
          No
        </button>
      </div>

      <button
        class="trash"
        type="button"
        (click)="toggle()">
        X
      </button>
    </div>
  `
})
export class ListItemComponent {

  toggled: boolean = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() {}

  getRoute(item) {
    return [
      `../${ item.foods ? 'meals' : 'exercises' }`, 
      item.$key
    ]
  }

  toggle() {
    this.toggled = !this.toggled
  }

  removeItem() {
    this.remove.emit(this.item);
  }
}