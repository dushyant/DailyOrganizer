import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


// Shared Module
import { SharedModule } from './../shared/shared.module';

// Components
import { MealFormComponent } from './components/meal-form/meal-form.component';

// Container
import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component'

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
  { path: ':id', component: MealComponent }
]

@NgModule({
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule.forChild(ROUTES),
    SharedModule,
    FontAwesomeModule
  ]
})
export class MealsModule {}