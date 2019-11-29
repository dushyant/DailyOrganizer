import { Component } from '@angular/core';
import { faTasks, faTools } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'my-tasks',
  styleUrls: ['my-tasks.component.scss'],
  template: `
    <div class="my-tasks">
      <div class="my-tasks__title">
        <h1 class="text-dark">
          <fa-icon class="text-dark mr-2" [icon]="faTasks"></fa-icon>
          My Tasks
        </h1>
      </div>
      <div>
        <div>
          <div class="p-3 d-flex justify-content-center">
            <fa-icon class="icon-tools m-4" [icon]="faTools"></fa-icon>
          </div>
          <h3 class="pb-3 d-flex justify-content-center">Under Construction</h3>
        </div>
      </div>
    </div>
  `
})
export class MyTasksComponent {

  faTasks = faTasks;
  faTools = faTools

  constructor() {}
}