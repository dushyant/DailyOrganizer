import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// shared module
import { SharedModule } from './../shared/shared.module';

// Container
import { MyDayComponent } from './container/myday/myday.component';

// Components
import { DayControlsComponent } from './components/day-controls/day-controls.component';
import { WeekControlsComponent } from './components/week-controls/week-controls.component';
import { CalendarControlsComponent } from './components/calendar-controls/calendar-controls.component';
import { MyDaySectionComponent } from './components/myday-section/myday-section.component';
import { AddItemsComponent } from './components/add-items/add-items.component';

export const ROUTES: Routes = [
  { path: '', component: MyDayComponent}
]

@NgModule({
  declarations: [
    MyDayComponent,
    CalendarControlsComponent,
    WeekControlsComponent,
    DayControlsComponent,
    MyDaySectionComponent,
    AddItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  providers: []
})
export class MyDayModule {}