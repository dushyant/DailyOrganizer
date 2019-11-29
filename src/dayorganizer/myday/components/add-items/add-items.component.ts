import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Exercise } from '../../../shared/services/exercises/exercises.service';
import { Meal } from '../../../shared/services/meals/meals.service';
import { faDumbbell, faHamburger, faPlus } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'add-items',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['add-items.component.scss'],
  template: `
    <div class="add-items">
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">

                <fa-icon *ngIf="section.type === 'meals'" [icon]="faHamburger"></fa-icon> 
                <fa-icon *ngIf="section.type === 'exercises'" [icon]="faDumbbell"></fa-icon> 
                
                Add {{ section.type }}
              </h5>
              <button 
                type="button" 
                  class="close" 
                  data-dismiss="modal" 
                  aria-label="Close"
                  (click)="cancelItem()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                <button
                  type="button"
                  class="btn btn-success btn-sm rounded-lg"
                  [routerLink]="getRoute(section.type)">
                  <fa-icon [icon]="faPlus"></fa-icon>
                  New {{ section.type }}
                </button>
              </p>
              <div class="add-items__list">
                <span 
                  class="add-items__empty"
                  *ngIf="!list?.length">
                  No items to add
                </span>
                <div class="list-group">
                  <button 
                    type="button" 
                    class="list-group-item list-group-item-action"
                    [class.list-group-item-success]="exists(item.name)"
                    *ngFor="let item of list"
                    (click)="toggleItem(item.name)">
                    {{ item.name }}
                  </button>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button 
                type="button"
                class="btn btn-light"
                data-dismiss="modal"
                (click)="cancelItem()">
                Cancel
              </button>
              <button 
                type="button" 
                class="btn btn-primary"
                (click)="updateItem()">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AddItemsComponent implements OnInit {

  faDumbbell = faDumbbell;
  faHamburger = faHamburger;
  faPlus = faPlus;

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