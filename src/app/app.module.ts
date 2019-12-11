import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MonthComponent } from './calendar/month/month.component';
import { MonthHeaderComponent } from './calendar/month/month-header/month-header.component';
import { DayComponent } from './calendar/day/day.component';
import { DayHeaderComponent } from './calendar/day/day-header/day-header.component';
import { DayContentComponent } from './calendar/day/day-content/day-content.component';
import { DayMarkComponent } from './calendar/day/day-mark/day-mark.component';
import { MonthSummaryComponent } from './calendar/month/month-summary/month-summary.component';
import { MonthSummaryHeaderComponent } from './calendar/month/month-summary/month-summary-header/month-summary-header.component';
import { MonthSummaryContentComponent } from './calendar/month/month-summary/month-summary-content/month-summary-content.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MonthComponent,
    MonthHeaderComponent,
    DayComponent,
    DayHeaderComponent,
    DayContentComponent,
    DayMarkComponent,
    MonthSummaryComponent,
    MonthSummaryHeaderComponent,
    MonthSummaryContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
