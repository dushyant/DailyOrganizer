import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//components
import { AuthFormComponent } from "./components/auth-form/auth-form.component";
import { DushyantInfoComponent } from "./components/dushyant-info/dushyant-info.component"

//services
import { AuthService } from "./services/auth/auth.service";

//auth guard
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent, DushyantInfoComponent],
  exports: [AuthFormComponent, DushyantInfoComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    };
  }
}
