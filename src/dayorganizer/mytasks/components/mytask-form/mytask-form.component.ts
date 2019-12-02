import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Task } from './../../../shared/services/mytasks/mytasks.service';

@Component({
  selector: 'mytask-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['mytask-form.component.scss'],
  template: `
    <div class="mytask-form">
      <form [formGroup]="form">
        <div class="mytask-form__fields">
          <div class="form-group">
            <label for="inputTaskName">Task name</label>
            <input
              type="text"
              class="form-control"
              placeholder="e.g. Buy Milk"
              formControlName="name"
              id="inputTaskName">
            <div class="alert alert-danger mt-1" role="alert" *ngIf="required">
              Task name is required
            </div>
          </div>
          <div class="form-group">
            <label for="inputTaskPriority">Priority</label>
            <select 
              class="form-control" 
              formControlName="priority"
              id="inputTaskPriority">
              <option>Select Priority</option>
              <option value="High" [selected]="task.priority">High</option>
              <option value="Medium" [selected]="task.priority">Medium</option>
              <option value="Low" [selected]="task.priority">Low</option>
            </select>
          </div>
        </div>
        <div class="p-4 d-flex">
          <div class="flex-grow-1">
            <button
              type="button"
              class="btn btn-primary mr-2"
              *ngIf="!exists"
              (click)="createTask()">
              Create exercise
            </button>
            <button
              type="button"
              class="btn btn-primary mr-2"
              *ngIf="exists"
              (click)="updateTask()">
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
              <p class="mr-2"> Delete task?</p>
              <button class="btn btn-danger btn-sm mr-2"  type="button" (click)="removeTask()">
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
export class MyTaskFormComponent implements OnChanges {

  exists: Boolean = false;
  toggled: Boolean = false;

  @Input()
  task: Task

  @Output()
  create = new EventEmitter<Task>();

  @Output()
  update = new EventEmitter<Task>();

  @Output()
  remove =new EventEmitter<Task>();

  form = this.formBuilder.group({
    name: ['', Validators.required],
    priority: ['Medium', Validators.required]
  });
  
  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.task && this.task.name) {
      this.exists = true;

      const value = this.task;
      this.form.patchValue(value);
    }
  }

  get required() {
    return(
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  createTask() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  updateTask() {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  removeTask() {
    this.remove.emit(this.form.value);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

}