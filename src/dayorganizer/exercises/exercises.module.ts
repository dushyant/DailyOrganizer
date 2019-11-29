import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Shared Module
import { SharedModule } from './../shared/shared.module';

// Components
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';

// Container
import { ExercisesComponent } from './containers/exercises/exercises.component';
import { ExerciseComponent } from './containers/exercise/exercise.component'

export const ROUTES: Routes = [
  { path: '', component: ExercisesComponent },
  { path: 'new', component: ExerciseComponent },
  { path: ':id', component: ExerciseComponent }
]

@NgModule({
  declarations: [
    ExercisesComponent,
    ExerciseComponent,
    ExerciseFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    FontAwesomeModule
  ]
})
export class ExercisesModule {}