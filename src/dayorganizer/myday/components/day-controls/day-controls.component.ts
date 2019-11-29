import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'day-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['day-controls.component.scss'],
  template: `
    <div class="d-flex justify-content-around day-controls">
      <div>
        <button
          type="button"
          [ngClass]="(i === selectedDayIndex) ? 'btn btn-secondary active' : 'btn btn-secondary'"
          *ngFor="let day of days; index as i;"
          (click)="selectDay(i)">
          <span > {{ day }} </span>
        </button>
      </div>
    </div>
  `
})
export class DayControlsComponent {

  days: Array<string> = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input()
  selectedDayIndex: number;

  @Output()
  select = new EventEmitter<number>();

  constructor() {}

  selectDay(index: number) {
    this.select.emit(index);
  }
}