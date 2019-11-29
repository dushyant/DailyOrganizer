import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { User } from './../../../auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-nav.component.scss'],
  template: `
  <div class="navbar-expand">
    <div class="navbar-nav">
      <a routerLink="myday" class="nav-item nav-link" routerLinkActive="active">My Day</a>
      <a routerLink="tasks" class="nav-item nav-link" routerLinkActive="active">Tasks</a>
      <a routerLink="meals" class="nav-item nav-link" routerLinkActive="active">Meals</a>
      <a routerLink="exercises" class="nav-item nav-link" routerLinkActive="active">Exercises</a>
      <a 
        routerLink="myday"
        class="nav-item nav-link" 
        title="Sign out"
        (click)="logoutUser()">
        <fa-icon class="sign-out" [icon]="faSignOutAlt"></fa-icon>
      </a>
    </div>
  </div>
  `
})
export class AppNavComponent {
  faSignOutAlt = faSignOutAlt;

  @Input()
  currentUser: User;

  @Output()
  logout = new EventEmitter<any>();

  logoutUser() {
    this.logout.emit();
  }
}