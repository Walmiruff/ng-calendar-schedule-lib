import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CalendarMonthModule } from './month/calendar-month.module';
import { CalendarWeekModule } from './week/calendar-week.module';
import { CalendarDayModule } from './day/calendar-day.module';
import { 
  CalendarCommonModule,
  CalendarModuleConfig,
  CalendarEventTitleFormatter,
  CalendarDateFormatter,
  CalendarA11y,
 } from './common/calendar-common.module';
 import { CalendarUtils } from './common/calendar-utils/calendar-utils.provider';


@NgModule({
  declarations: [
  ],
  imports: [
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    CalendarCommonModule
  ],
  exports: [
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    CalendarCommonModule
  ]
})
export class CalendarModule {
  static forRoot(
    dateAdapter: Provider,
    config: CalendarModuleConfig = {}
  ): ModuleWithProviders<CalendarModule> {
    return {
      ngModule: CalendarModule,
      providers: [
        dateAdapter,
        config.eventTitleFormatter || CalendarEventTitleFormatter,
        config.dateFormatter || CalendarDateFormatter,
        config.utils || CalendarUtils,
        config.a11y || CalendarA11y,
      ],
    };
  }
}
