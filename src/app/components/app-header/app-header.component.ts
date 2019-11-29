import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from './../../../auth/shared/services/auth/auth.service';

import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'


@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-header.component.scss'],
  template: `
    <div class="app-header">
      <nav class="navbar navbar-dark bg-primary">
        <a class="navbar-brand" routerLink="myday">
          <fa-icon [icon]="faCalendarCheck"></fa-icon>
          Daily Organizer
        </a>
        <app-nav *ngIf="user"
          [currentUser]="user"
          (logout)="onLogout()">
        </app-nav>
      </nav>
    </div>
  `
})
export class AppHeaderComponent {

  faCalendarCheck = faCalendarCheck;

  @Input()
  user: User;

  @Output()
  currentUser: User = this.user;

  @Output()
  logout = new EventEmitter<any>();

  onLogout() {
    this.logout.emit();
  }

}