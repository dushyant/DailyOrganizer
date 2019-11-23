import { TasksModule } from './../dayorganizer/tasks/tasks.module';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { Store } from 'store';

// feature modules
import { AuthModule } from "./../auth/auth.module";
import { ExercisesModule } from './../dayorganizer/exercises/exercises.module';
import { MyDayModule } from './../dayorganizer/myday/myday.module';
import { DayOrganizerModule } from './../dayorganizer/dayorganizer.module';

import { AppRoutingModule } from "./app-routing.module";

//containers
import { AppComponent } from "./containers/app/app.component";
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    AuthModule,
    DayOrganizerModule,
    ExercisesModule,
    MyDayModule,
    TasksModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
