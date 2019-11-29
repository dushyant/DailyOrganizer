import { AuthService } from "./../../../shared/services/auth/auth.service";
import { FormGroup } from "@angular/forms";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "register",
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit" class="btn btn-primary">
          Create account
        </button>
        <div class="alert-danger" *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async registerUser(event: FormGroup) {
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      this.router.navigate(["/"]);
    } catch (err) {
      this.error = err.message;
    }
  }
}
