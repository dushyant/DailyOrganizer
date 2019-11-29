import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'week-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['week-controls.component.scss'],
  template: `
    <div class="d-flex justify-content-between week-controls">
      <div>
        <button 
          type="button"
          class="btn btn-light btn-lg"
          (click)="moveWeek(currentWeek - 1)">
          <fa-icon [icon]="faChevronLeft"></fa-icon>
        </button>
      </div>
      <div>
        <p>{{ selectedDay | date:'longDate' }}</p>
      </div>
      <div>
        <button 
          type="button"
          class="btn btn-light btn-lg" 
          (click)="moveWeek(currentWeek + 1)">
          <fa-icon [icon]="faChevronRight"></fa-icon>
        </button>
      </div>
    </div>
  `
})
export class WeekControlsComponent {

  currentWeek = 0;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  @Input()
  selectedDay: Date;

  @Output()
  move = new EventEmitter<any>()

  constructor() {}

  moveWeek(selectedWeek: number) {
    this.currentWeek = selectedWeek
    this.move.emit(selectedWeek);
  }


}