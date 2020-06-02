import { Calendar, CalendarEvent, Month } from '../models/calendar';
import moment, { Moment } from 'moment';
import { EasterFinder } from './easterFinder.service';
import { DefaultColorSettings } from '@/models/colors';

export class CalendarCreatorService {
    public static GenerateCalendar(year: number) : Calendar {
        return new Calendar(year, this.GenerateHolidays(year), undefined, new DefaultColorSettings);
    }

    private static GenerateHolidays(year: number): CalendarEvent[] {
        const nonMoveableEvents: CalendarEvent[] = [
            { date: moment([year, Month.January, 1]), text: 'Nowy Rok' },
            { date: moment([year, Month.January, 6]), text: 'Święto Trzech Króli' },
            { date: moment([year, Month.May, 1]), text: 'Święto Pracy' },
            { date: moment([year, Month.May, 3]), text: 'Święto Konstytucji Trzeciego Maja' },
            { date: moment([year, Month.July, 15]), text: 'Wniebowzięcie Najświętszej Maryi Panny' },
            { date: moment([year, Month.November, 1]), text: 'Wszystkich Świętych' },
            { date: moment([year, Month.November, 11]), text: 'Święto Niepodległości' },
            { date: moment([year, Month.December, 25]), text: 'Boże Narodzenie' },
            { date: moment([year, Month.December, 26]), text: 'Boże Narodzenie' },
        ];

        const easter: Moment = EasterFinder.GetDate(year);
        const moveableEvents: CalendarEvent[] = [
            { date: easter, text: 'Wielkanoc' },
            { date: easter.clone().add(1, "day"), text: 'Poniedziałek Wielkanocny' },
            { date: easter.clone().add(60, "days"), text: 'Boże Ciało' },
            { date: easter.clone().add(7, "weeks"), text: 'Zielone Świątki' },
        ];

        const events: CalendarEvent[] = [];
        events.push(...nonMoveableEvents);
        events.push(...moveableEvents);
        events.sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            else return 0;
        })

        return events;
    }
}