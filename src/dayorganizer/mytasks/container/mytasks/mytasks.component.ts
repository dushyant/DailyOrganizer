import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { faTasks, faTools, faPlus } from "@fortawesome/free-solid-svg-icons"

import { Store } from 'store';

import { Task, MyTaskService } from './../../../shared/services/mytasks/mytasks.service';

@Component({
  selector: 'mytasks',
  styleUrls: ['mytasks.component.scss'],
  template: `
    <div class="mytasks">
      <div class="mytasks__title">
        <h1 class="text-dark">
          <fa-icon class="text-dark mr-2" [icon]="faTasks"></fa-icon>
          My Tasks
        </h1>
        <button
          type="button"
          class="btn btn-success btn-sm rounded-lg"
          [routerLink]="['../tasks/new']">
          <fa-icon [icon]="faPlus"></fa-icon>
          New Task
        </button>
      </div>
      <div *ngIf="tasks$ | async as tasks; else loading;">
        <div class="message p-4" *ngIf="!tasks.length">
          No tasks. Add a new tasks.
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" *ngFor="let task of tasks">
            <list-item 
              [itemType]="itemType"
              [item]="task"
              (remove)="removeTask($event)">
            </list-item>
          </li>
        </ul>
      </div>
      <ng-template #loading>
        <div class="p-3 d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class MyTasksComponent implements OnInit, OnDestroy {

  faTasks = faTasks;
  faTools = faTools;
  faPlus = faPlus;
  itemType: string = 'tasks'

  tasks$: Observable<Task[]>;
  subscription: Subscription

  constructor(
    private myTaskService: MyTaskService,
    private store: Store
  ) {}

    ngOnInit() {
      this.tasks$ = this.store.select<Task[]>('tasks');
      this.subscription = this.myTaskService.tasks$.subscribe();
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    removeTask(task: Task) {
      this.myTaskService.removeTask(task.$key);
    }

}