import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { DayItem, DayItemList } from './../../../shared/services/myday/myday.service';

@Component({
  selector: 'calendar-controls',
  styleUrls: ['calendar-controls.component.scss'],
  template: `
    <div class="calendar-controls">
      <week-controls
        [selectedDay]="selectedDay"
        (move)="onWeekChange($event)">
      </week-controls>
      <day-controls
        [selectedDayIndex]="selectedDayIndex"
        (select)="selectDay($event)">
      </day-controls>
      <myday-section
        *ngFor="let daySection of daySections"
        [name]="daySection.name"
        [daySection]="getSection(daySection.key)"
        (select)="selectSection($event, daySection.key)">
      </myday-section>
    </div>
  `
})
export class CalendarControlsComponent implements OnChanges {

  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

  daySections = [
    { key: 'morning', name: 'Morning' },
    { key: 'noon', name: 'Noon' },
    { key: 'evening', name: 'Evening' }
  ];

  @Input()
  set date(date: Date) {
    this.selectedDay = new Date(date.getTime());
  }

  @Input()
  dayItems: DayItemList;

  @Output()
  change = new EventEmitter<Date>();

  @Output()
  select = new EventEmitter<any>();

  constructor() {}

  ngOnChanges() {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getFirstDayOfWeek(new Date(this.selectedDay));
  }

  getSection(name: string): DayItem {  
    return this.dayItems && this.dayItems[name] || {};
  }

  selectSection({type, assigned, data} : any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      data,
      day
    })
  }

  onWeekChange(selectedWeek: number) {
    const firstDayOfWeek = this.getFirstDayOfWeek(new Date());
    const firstDate = (
      new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate())
    );
    firstDate.setDate(firstDate.getDate() + (selectedWeek * 7));
    this.change.emit(firstDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getFirstDayOfWeek(date: Date) {
    const day = date.getDay();
    const diffDate = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diffDate));
  }

}