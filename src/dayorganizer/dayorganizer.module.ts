import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//Shared Module
import { SharedModule } from './shared/shared.module';

// Guards
import { AuthGuard } from './../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'myday', canActivate: [AuthGuard], loadChildren: './myday/myday.module#MyDayModule' },
  { path: 'tasks', canActivate: [AuthGuard], loadChildren: './mytasks/mytasks.module#MyTasksModule' },
  { path: 'meals', canActivate: [AuthGuard], loadChildren: './meals/meals.module#MealsModule' },
  { path: 'exercises', canActivate: [AuthGuard], loadChildren: './exercises/exercises.module#ExercisesModule' }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class DayOrganizerModule {}