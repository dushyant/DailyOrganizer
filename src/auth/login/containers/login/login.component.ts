import { AuthService } from "./../../../shared/services/auth/auth.service";
import { FormGroup } from "@angular/forms";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registerd?</a>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
        <div class="alert alert-danger" *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
      <dushyant-info></dushyant-info>
    </div>
  `
})
export class LoginComponent {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: FormGroup) {
    const { email, password } = event.value;

    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(["/"]);
    } catch (err) {
      this.error = err.message;
    }
  }
}
