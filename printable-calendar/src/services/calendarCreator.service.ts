import { Calendar, CalendarEvent } from '../models/calendar';
import moment, { Moment } from 'moment';
import { EasterFinder } from './easterFinder.service';
import { DefaultColorSettings } from '@/models/colors';

class CalendarCreatorService {
    public static GenerateCalendar(year: number) : Calendar {
        return new Calendar(year, this.GenerateHolidays(year), undefined, new DefaultColorSettings);
    }

    private static GenerateHolidays(year: number): CalendarEvent[] {
        const nonMoveableEvents: CalendarEvent[] = [
            { date: moment().year(year).month(1).day(1), text: 'Nowy Rok' },
            { date: moment().year(year).month(1).day(6), text: 'Święto Trzech Króli' },
            { date: moment().year(year).month(5).day(1), text: 'Święto Pracy' },
            { date: moment().year(year).month(5).day(3), text: 'Święto Konstytucji Trzeciego Maja' },
            { date: moment().year(year).month(7).day(15), text: 'Wniebowzięcie Najświętszej Maryi Panny' },
            { date: moment().year(year).month(11).day(1), text: 'Wszystkich Świętych' },
            { date: moment().year(year).month(11).day(11), text: 'Święto Niepodległości' },
            { date: moment().year(year).month(12).day(25), text: 'Boże Narodzenie' },
            { date: moment().year(year).month(12).day(26), text: 'Boże Narodzenie' },
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