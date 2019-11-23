import { AuthService } from './../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    return this.authService.authState.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      }));
  }
}