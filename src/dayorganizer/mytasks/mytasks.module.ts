import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Shared Module
import { SharedModule } from './../shared/shared.module';

// Components
import { MyTaskFormComponent } from './components/mytask-form/mytask-form.component';

// Container
import { MyTasksComponent } from './container/mytasks/mytasks.component';
import { MyTaskComponent } from './container/mytask/mytask.component';

export const ROUTES: Routes = [
  { path: '', component: MyTasksComponent},
  { path: 'new', component: MyTaskComponent },
  { path: ':id', component: MyTaskComponent }
]

@NgModule({
  declarations: [
    MyTasksComponent,
    MyTaskComponent,
    MyTaskFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class MyTasksModule {}