import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'day-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['day-controls.component.scss'],
  template: `
    <div class="days">
      
      <button
        type="button"
        class="day"
        *ngFor="let day of days; index as i;"
        (click)="selectDay(i)">
        <span [class.active]="i === selectedDayIndex"> {{ day }} </span>
      </button>
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