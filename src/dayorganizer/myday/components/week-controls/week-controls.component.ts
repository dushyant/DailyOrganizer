import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'week-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['week-controls.component.scss'],
  template: `
    <div class="week-controls">

      <button type="button" (click)="moveWeek(currentWeek - 1)"> < </button>
      <p>{{ selectedDay | date:'longDate' }}</p>
      <button type="button" (click)="moveWeek(currentWeek + 1)"> > </button>

    </div>
  `
})
export class WeekControlsComponent {

  currentWeek = 0;

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