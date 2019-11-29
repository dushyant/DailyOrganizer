import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// third-party
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Components
import { ListItemComponent } from './components/list-item/list-item.component';


// services
import { MealsService } from './services/meals/meals.service';
import { ExercisesService } from './services/exercises/exercises.service';
import { MyDayService } from './services/myday/myday.service';

// pipes
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule,
    FontAwesomeModule
  ],
  declarations: [
    ListItemComponent,
    JoinPipe
  ],
  exports: [
    ListItemComponent,
    JoinPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        ExercisesService,
        MyDayService
      ]
    }
  }
}