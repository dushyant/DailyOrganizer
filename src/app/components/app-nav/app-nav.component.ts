import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['app-nav.component.scss'],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="myday" routerLinkActive="active">My Day</a>
        <a routerLink="tasks" routerLinkActive="active">Tasks</a>
        <a routerLink="meals" routerLinkActive="active">Meals</a>
        <a routerLink="exercises" routerLinkActive="active">Exercises</a>
      </div>
    </div>
  `
})
export class AppNavComponent {
  constructor() {}
}