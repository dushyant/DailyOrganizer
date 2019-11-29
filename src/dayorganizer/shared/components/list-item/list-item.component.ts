import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { faPen, faTrashAlt, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item d-flex">
      <div class="flex-grow-1">
        <p class="item-name"> {{item.name}} </p>
        <p class="item-items">
          <span *ngIf="item.foods; else showExercises"> 
            {{ item.foods | join }} 
          </span>        
        </p>
        <ng-template #showExercises>
          <span> Duration: {{ item.duration }} minutes </span>
          <span *ngIf="item.notes">| Notes: {{ item.notes }} </span>
        </ng-template>
      </div>
      <div 
        class="d-flex align-items-start item-delete"
        *ngIf="toggled">
        <p> Delete item?</p>
        <button
          class="btn btn-danger btn-sm"
          type="button"
          (click)="removeItem()">
          Yes
        </button>
        <button
          class="btn btn-light btn-sm"
          type="button"
          (click)="toggle()">
          No
        </button>
        <p><fa-icon class="text-muted" [icon]="faChevronLeft"></fa-icon></p>
      </div>

      <div class="flex-shrink-1">
        <button
          class="btn btn-danger btn-sm"
          type="button"
          (click)="toggle()">
          <fa-icon [icon]="faTrashAlt"></fa-icon>
        </button>
        <button 
          class="btn btn-success btn-sm"
          [routerLink]="getRoute(item)">
          <fa-icon [icon]="faPen"></fa-icon>
        </button>
      </div>
    </div>
  `
})
export class ListItemComponent {

  faTrashAlt = faTrashAlt;
  faPen = faPen;
  faChevronLeft = faChevronLeft;

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