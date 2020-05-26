import moment, { Moment } from 'moment';
import { ColorSettings, Style } from '@/models/colors';

export interface CalendarEvent {
    date: Moment;
    text: string;
    customStyle?: Style;
}

class Calendar {
    year: number;
    holidays: CalendarEvent[] = [];
    customEvents: CalendarEvent[] = [];
    colorSettings?: ColorSettings = undefined;

    constructor(year: number, holidays?: CalendarEvent[], customEvents?: CalendarEvent[]) {
        this.year = year;
        this.holidays = holidays ? holidays : [];
        this.customEvents = customEvents ? customEvents : [];
    }

    getMonth(month: number) : CalendarEvent[] {
        const m = moment().year(this.year).month(month);
        const daysInMonth = m.daysInMonth();
        const result : CalendarEvent[] = [...Array(daysInMonth).keys()].map((day) => {
            const date = m.clone().day(day + 1);
            
            const bussinessDay: CalendarEvent = {
                date: date,
                text: ''
            };

            if (this.customEvents.length > 0) {
                const customEvent = this.customEvents.find((e) => e.date == date);

                if (customEvent) {
                    return customEvent;
                }
            }
            
            if (this.holidays.length > 0) {
                const holiday = this.holidays.find((e) => e.date == date);

                if (holiday) {
                    return holiday;
                }
            }

            return bussinessDay;
        });

        return result;
    }
}