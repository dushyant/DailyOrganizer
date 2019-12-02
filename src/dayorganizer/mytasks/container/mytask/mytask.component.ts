import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { faTasks } from "@fortawesome/free-solid-svg-icons"

import { Task, MyTaskService } from '../../../shared/services/mytasks/mytasks.service';

@Component({
  selector: 'mytask',
  styleUrls: ['mytask.component.scss'],
  template: `
    <div class="mytask">
      <div class="mytask__title">
        <h1>
          <span *ngIf="task$ | async as task; else title">
            <fa-icon class="text-dark mr-1" [icon]="faTasks"></fa-icon>
            {{ task.name ? 'Edit' : 'Create'}} task
          </span>
          <ng-template #title>
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </ng-template>
        </h1>
      </div>
      <div *ngIf="task$ | async as task; else loading;">
        <mytask-form
          [task]="task"
          (create)="addTask($event)"
          (update)="updateTask($event)"
          (remove)="removeTask($event)">
        </mytask-form>
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
export class MyTaskComponent implements OnInit, OnDestroy {

  faTasks = faTasks;

  task$: Observable<any>;
  subscription: Subscription;

  constructor(
    private myTaskService: MyTaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.myTaskService.tasks$.subscribe();
    this.task$ = this.route.params.pipe(
      switchMap(param => this.myTaskService.getTasks(param.id))
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addTask(exercise: Task) {
    await this.myTaskService.addTask(exercise);
    this.backToTask();
  }

  async updateTask(exercise: Task) {
    const key = this.route.snapshot.params.id;
    await this.myTaskService.updateTask(key, exercise);
    this.backToTask();
  }

  async removeTask(exercise: Task) {
    const key = this.route.snapshot.params.id;
    await this.myTaskService.removeTask(key);
    this.backToTask();
  }

  backToTask() {
    this.router.navigate(['tasks']);
  }

}