import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() date: Moment;

  dayOfWeekClass: string;

  constructor() { }

  ngOnInit() {
    this.dayOfWeekClass = ((this.date.weekday() === 5 || this.date.weekday() === 6) ?
        'day day--weekend' : 'day day--weekday');
  }

}
