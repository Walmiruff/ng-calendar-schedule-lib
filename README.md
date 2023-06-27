<h1 align="center">angular 15.0+ calendar</h1>

<h2 align="center">Demo</h2>

<div align="center">

https://github.com/Walmiruff/spa-calendar-schedule-demo

</div>

## Table of contents


<h2 align="center">About</h2>

A calendar component for angular 15.0+ that can display events on a month, week or day view.


<h2 align="center">Getting started</h2>


### Setup ()

First install through npm:

```bash
npm install --save ng-calendar-schedule
```

Next include the CSS file in the global (not component scoped) styles of your app:

```
/* angular-cli file: src/styles.css */
@import "../node_modules/ng-calendar-schedule/assets/style.css";
```

Finally import the calendar module into your apps module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'ng-calendar-schedule';
import { adapterFactory } from 'ng-calendar-schedule/lib/date-adapters/date-fns';

@NgModule({
  imports: [
    BrowserAnimationsModule, // required
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class AppModule {}
```


<h2 align="center">How use</h2>

In app.component.ts

```typescript

import {
  Component,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'ng-calendar-schedule';
import { EventColor } from 'calendar-utils';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
interface ModalData {
  action: string;
  event: CalendarEvent;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: ModalData


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    alert(`action:${action}; event:${JSON.stringify(event)}`)
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  editEvent() {
    
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
```

You can insert the link optional for import icons and style in the index.html between the head tags.


```html
<head>
  ...
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.css"></link>
  
  ...
</head>
```

Finally in app.component.html

```html
   <div class="row text-center mt-4">
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        mwlCalendarPreviousView
        [view]="view"
        [(viewDate)]="viewDate"
        (viewDateChange)="closeOpenMonthViewDay()"
      >
        Previous
      </div>
      <div
        class="btn btn-outline-secondary"
        mwlCalendarToday
        [(viewDate)]="viewDate"
      >
        Today
      </div>
      <div
        class="btn btn-primary"
        mwlCalendarNextView
        [view]="view"
        [(viewDate)]="viewDate"
        (viewDateChange)="closeOpenMonthViewDay()"
      >
        Next
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <h3>{{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}</h3>
  </div>
  <div class="col-md-4">
    <div class="btn-group">
      <div
        class="btn btn-primary"
        (click)="setView(CalendarView.Month)"
        [class.active]="view === CalendarView.Month"
      >
        Month
      </div>
      <div
        class="btn btn-primary"
        (click)="setView(CalendarView.Week)"
        [class.active]="view === CalendarView.Week"
      >
        Week
      </div>
      <div
        class="btn btn-primary"
        (click)="setView(CalendarView.Day)"
        [class.active]="view === CalendarView.Day"
      >
        Day
      </div>
    </div>
  </div>
</div>
<br />
<div class="mb-4" [ngSwitch]="view">
  <mwl-calendar-month-view
    *ngSwitchCase="CalendarView.Month"
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    [activeDayIsOpen]="activeDayIsOpen"
    (dayClicked)="dayClicked($event.day)"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  >
  </mwl-calendar-month-view>
  <mwl-calendar-week-view
    *ngSwitchCase="CalendarView.Week"
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  >
  </mwl-calendar-week-view>
  <mwl-calendar-day-view
    *ngSwitchCase="CalendarView.Day"
    [viewDate]="viewDate"
    [events]="events"
    [refresh]="refresh"
    (eventClicked)="handleEvent('Clicked', $event.event)"
    (eventTimesChanged)="eventTimesChanged($event)"
  >
  </mwl-calendar-day-view>
</div> 
```

### Prepare your environment

- Install [Node.js (>=14.19.0 or >=16.9.0)](http://nodejs.org/)