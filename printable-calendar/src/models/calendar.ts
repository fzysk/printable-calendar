import moment, { Moment } from 'moment';
import { ColorSettings, Style } from '@/models/colors';

export interface CalendarEvent {
    date: Moment;
    text: string;
    customStyle?: Style;
}

export class Calendar {
    year: number;
    holidays: CalendarEvent[] = [];
    nonHolidayEvents: CalendarEvent[] = [];
    customEvents: CalendarEvent[] = [];
    colorSettings?: ColorSettings = undefined;

    constructor(year: number, holidays?: CalendarEvent[], nonHolidayEvents?: CalendarEvent[],
            customEvents?: CalendarEvent[], colorSettings?: ColorSettings) {
        this.year = year;
        this.holidays = holidays ? holidays : [];
        this.nonHolidayEvents = nonHolidayEvents ? nonHolidayEvents : [];
        this.customEvents = customEvents ? customEvents : [];
        this.colorSettings = colorSettings;
    }

    getMonth(month: number) : CalendarEvent[][] {
        const m = moment([this.year, month, 1]);
        const daysInMonth = m.daysInMonth();
        const result : CalendarEvent[][] = [...Array(daysInMonth).keys()].map((day) => {
            const date = moment([this.year, month, day + 1]);
            
            const bussinessDay: CalendarEvent = {
                date: date,
                text: ''
            };

            const events: CalendarEvent[] = [];
            
            if (this.holidays.length > 0) {
                const holiday = this.holidays.find((e) => e.date.isSame(date));

                if (holiday) {
                    events.push(holiday);
                }
            }
            if (this.nonHolidayEvents.length > 0) {
                const nonHolidayEvent = this.nonHolidayEvents.find((e) => e.date.isSame(date));

                if (nonHolidayEvent) {
                    events.push(nonHolidayEvent);
                }
            }
            if (this.customEvents.length > 0) {
                const customEvent = this.customEvents.find((e) => e.date.isSame(date));

                if (customEvent) {
                    events.push(customEvent);
                }
            }

            if (events.length == 0) {
                events.push(bussinessDay);
            }

            return events;
        });

        return result;
    }
}

export enum Month {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}