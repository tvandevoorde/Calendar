import { Injectable } from '@angular/core';
import * as Moment from 'moment';
import * as MomentRange from 'moment-range';

@Injectable({
  providedIn: 'root'
})
export class CalendarConstructionService {

  constructor() { }

  getDatesByMonths(year: number) {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const moment = MomentRange.extendMoment(Moment);

    // TODO: timezone *magic*
    const dateRange = moment.range(moment(start), moment(end));
    const dates = Array.from(dateRange.by('day'));
    const datesByMonth: any = {};
    for (const date of dates) {
      const month = date.month();
      if (!datesByMonth[month]) {
        datesByMonth[month] = [];
      }
      datesByMonth[month].push(date);
    }

    return datesByMonth;
  }

  getMonths(): string[] {
    return Moment.months();
  }
}



