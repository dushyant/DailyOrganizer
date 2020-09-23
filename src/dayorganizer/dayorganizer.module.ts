import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//Shared Module
import { SharedModule } from './shared/shared.module';

// Guards
import { AuthGuard } from './../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  { 
    path: 'myday',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./myday/myday.module').then(m => m.MyDayModule)
  },
  { 
    path: 'tasks',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./mytasks/mytasks.module').then(m => m.MyTasksModule)
  },
  { 
    path: 'meals',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
  },
  { 
    path: 'exercises',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./exercises/exercises.module').then(m => m.ExercisesModule)
   }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class DayOrganizerModule {}