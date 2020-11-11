import moment, { Moment } from 'moment';
import { ColorSettings, Style } from '@/models/colors';

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

export enum EventImportance {
    Holiday = 4,
    NonHoliday = 3,
    UserEvent = 2,
    Normal = 1
}

export interface CalendarEvent {
    date: Moment;
    text: string;
    customStyle?: Style;
    importance?: EventImportance;
    isMoveable?: boolean;
}

export class Calendar {
    year: number;
    events: CalendarEvent[] = [];
    colorSettings?: ColorSettings = undefined;

    constructor(year: number, holidays?: CalendarEvent[], nonHoliday?: CalendarEvent[],
            customEvents?: CalendarEvent[], colorSettings?: ColorSettings) {
        this.year = year;
        this.colorSettings = colorSettings;

        holidays?.forEach((e) => e.importance = EventImportance.Holiday);
        nonHoliday?.forEach((e) => e.importance = EventImportance.NonHoliday);
        customEvents?.forEach((e) => e.importance = EventImportance.UserEvent);
        
        if (holidays) {
            this.events.push(...holidays);
        }
        if (nonHoliday) {
            this.events.push(...nonHoliday);
        }
        if (customEvents) {
            this.events.push(...customEvents);
        }
    }

    getMonth(month: number) : CalendarEvent[][] {
        const m = moment([this.year, month, 1]);
        const daysInMonth = m.daysInMonth();
        const result : CalendarEvent[][] = [...Array(daysInMonth).keys()].map((day) => {
            const date = moment([this.year, month, day + 1]);
            
            const bussinessDay: CalendarEvent = {
                date: date,
                text: '',
                importance: EventImportance.Normal
            };

            let events: CalendarEvent[] = this.events.filter((e) => e.date.isSame(date));

            if (events.length == 0) {
                events.push(bussinessDay);
            }

            events = events.sort((a, b) => {
                if (a.importance) {
                    if (b.importance) {
                        return b.importance - a.importance;
                    }
                    else {
                        return -1;
                    }
                }
                else {
                    return 1;
                }
            });

            return events;
        });

        return result;
    }
}
