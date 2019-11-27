import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TasksComponent } from './container/tasks/tasks.component';

export const ROUTES: Routes = [
  { path: '', component:TasksComponent}
]


@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class TasksModule {}