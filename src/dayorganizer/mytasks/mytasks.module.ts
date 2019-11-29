import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MyTasksComponent } from './container/mytasks/my-tasks.component';

export const ROUTES: Routes = [
  { path: '', component:MyTasksComponent}
]

@NgModule({
  declarations: [MyTasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FontAwesomeModule
  ]
})
export class MyTasksModule {}