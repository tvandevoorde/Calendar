import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarConstructionService } from '@core/services';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  year: number;
  months: string[];
  datesByMonth: any;

  constructor(private calendarConstructionService: CalendarConstructionService) { }

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.loadCalendar();
  }

  toPreviousYear() {
    this.year--;
    this.loadCalendar();
  }

  toNextYear() {
    this.year++;
    this.loadCalendar();
  }

  private loadCalendar() {
    this.months = this.calendarConstructionService.getMonths();
    if (this.year) {
      this.datesByMonth = this.calendarConstructionService.getDatesByMonths(this.year);
    }
  }
}
