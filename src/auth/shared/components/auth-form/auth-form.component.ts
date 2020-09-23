import { Component, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "auth-form",
  styleUrls: ["auth-form.component.scss"],
  template: `
    <div class="auth-form card border-primary">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="card-header text-primary">
          <ng-content select="h1"></ng-content>
        </div>

        <div class="form-wrapper">
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input
              id="inputEmail"
              type="email"
              class="form-control"
              placeholder="Email address"
              formControlName="email"
            />
            <div class="alert alert-danger" *ngIf="emailFormatInvalid">
              Invalid email format
            </div>
          </div>

          <div class="form-group">
            <label for="inputPassword">Passwod</label>
              <input
                type="password"
                class="form-control"
                placeholder="Enter password"
                formControlName="password"
              />
              <div class="alert alert-danger" *ngIf="passwordInvalid">
                Password is required
              </div>
          </div>

          <ng-content select=".alert-danger"></ng-content>

          <div class="auth-form__action">
            <ng-content select="button"></ng-content>
          </div>

        </div>

          <div class="auth-form__toggle">
            <div class="card-footer bg-transparent border-primary">
              <ng-content select="a"></ng-content>
            </div>
          </div>
      </form>
    </div>
  `
})
export class AuthFormComponent {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.formBuilder.group({
    email: ["", Validators.email],
    password: ["", Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  get passwordInvalid() {
    const control = this.form.get("password");
    return control.hasError("required") && control.touched;
  }

  get emailFormatInvalid() {
    const control = this.form.get("email");
    return control.hasError("email") && control.touched;
  }
}
