import { Calendar, CalendarEvent, EventImportance, Month } from '../models/calendar';
import moment, { Moment } from 'moment';
import { EasterFinder } from './easterFinder.service';
import { DefaultColorSettings } from '@/models/colors';

export class CalendarCreatorService {
    public static MoveCalendarToYear(calendar: Calendar, year: number): CalendarEvent[] {
        const isNewYearLeap = moment([year]).isLeapYear();
        const leapEvents: CalendarEvent[] = [];

        if (!isNewYearLeap && calendar.events.some(e => e.date.isLeapYear())) {
            leapEvents.push(...calendar.events.filter(e => e.date.isLeapYear()));
        }

        if (!isNewYearLeap) {
            calendar.events = calendar.events.filter(e => !e.date.isLeapYear());
        }

        calendar.events.forEach(e => e.date = e.date.add(year - calendar.year, "y"));
        calendar.year = year;

        calendar.events = calendar.events
            .filter(e => !e.isMoveable)
            .concat(this.GenerateNonHolidayEasterEvents(calendar.year))
            .concat(this.GenerateHolidayEasterEvents(calendar.year));

        return leapEvents;
    }

    public static GenerateCalendar(year: number) : Calendar {
        return new Calendar(year, this.GenerateHolidays(year).concat(this.GenerateNonHolidays(year)), new DefaultColorSettings);
    }

    private static GenerateNonHolidays(year: number): CalendarEvent[] {
        const nonMoveableEvents: CalendarEvent[] = [
            { date: moment([year, Month.January, 21]), text: 'Dzień Babci' },
            { date: moment([year, Month.January, 22]), text: 'Dzień Dziadka' },
            { date: moment([year, Month.February, 8]), text: 'Święto Służby Więziennej' },
            { date: moment([year, Month.February, 14]), text: 'Walentynki' },
            { date: moment([year, Month.February, 17]), text: 'Dzień Kota' },
            { date: moment([year, Month.February, 19]), text: 'Dzień Nauki Polskiej' },
            { date: moment([year, Month.February, 22]), text: 'Dzień Ofiar Przestępstw' },
            { date: moment([year, Month.March, 1]), text: 'Narodowy Dzień Pamięci "Żołnierzy Wyklętych"'},
            { date: moment([year, Month.March, 8]), text: 'Dzień Kobiet' },
            { date: moment([year, Month.March, 21]), text: 'Dzień Wagarowicza' },
            { date: moment([year, Month.March, 23]), text: 'Dzień Przyjaźni Polsko-Węgierskiej' },
            { date: moment([year, Month.March, 24]), text: 'Narodowy Dzień Życia'},
            { date: moment([year, Month.April, 13]), text: 'Dzień Pamięci Ofiar Zbrodni Katyńskiej' },
            { date: moment([year, Month.April, 14]), text: 'Święto Chrztu Polski' },
            { date: moment([year, Month.April, 18]), text: 'Dzień Pacjenta w Śpiączce' },
            { date: moment([year, Month.April, 19]), text: 'Rocznica Powstania w Gettcie Warszawskim' },
            { date: moment([year, Month.April, 28]), text: 'Dzień Bezpieczeństwa i Ochrony Zdrowia w Pracy' },
            { date: moment([year, Month.May, 2]), text: 'Święto Flagi' },
            { date: moment([year, Month.May, 4]), text: 'Dzień Strażaka' },
            { date: moment([year, Month.May, 16]), text: 'Święto Straży Granicznej' },
            { date: moment([year, Month.May, 26]), text: 'Dzień Matki' },
            { date: moment([year, Month.May, 27]), text: 'Dzień Samorządu Terytorialnego' },
            { date: moment([year, Month.June, 1]), text: 'Dzień Dziecka' },
            { date: moment([year, Month.June, 13]), text: 'Dzień Żandarmerii Wojskowej' },
            { date: moment([year, Month.June, 23]), text: 'Dzień Ojca' },
            { date: moment([year, Month.July, 1]), text: 'Dzień Psa' },
            { date: moment([year, Month.July, 12]), text: 'Dzień Walki i Męczeństwa Wsi Polskiej' },
            { date: moment([year, Month.July, 24]), text: 'Święto Policji' },
            { date: moment([year, Month.July, 31]), text: 'Dzień Skarbowości' },
            { date: moment([year, Month.August, 1]), text: 'Narodowy Dzień Pamięci Powstania Warszawskiego' },
            { date: moment([year, Month.August, 15]), text: 'Dzień Wojska Polskiego' },
            { date: moment([year, Month.August, 29]), text: 'Dzień Straży Gminnej' },
            { date: moment([year, Month.August, 31]), text: 'Dzień Solidarności i Wolności' },
            { date: moment([year, Month.September, 12]), text: 'Święto Wojsk Lądowych' },
            { date: moment([year, Month.September, 17]), text: 'Światowy Dzień Sybiraka' },
            { date: moment([year, Month.September, 22]), text: 'Światowy Dzień bez Samochodu' },
            { date: moment([year, Month.September, 27]), text: 'Dzień Podziemnego Państwa Polskiego' },
            { date: moment([year, Month.October, 4]), text: 'Światowy Dzień Zwierząt' },
            { date: moment([year, Month.October, 14]), text: 'Dzień Edukacji Narodowej' },
            { date: moment([year, Month.October, 19]), text: 'Narodowy Dzień Pamięci Duchownych Niezłomnych' },
            { date: moment([year, Month.October, 31]), text: 'Halloween' },
            { date: moment([year, Month.November, 8]), text: 'Dzień Zdrowego Śniadania' },
            { date: moment([year, Month.November, 14]), text: 'Światowy Dzień Seniora' },
            { date: moment([year, Month.November, 29]), text: 'Andrzejki' },
            { date: moment([year, Month.December, 4]), text: 'Barbórka' },
            { date: moment([year, Month.December, 6]), text: 'Mikołajki' },
            { date: moment([year, Month.December, 13]), text: 'Dzień Pamięci Ofiar Stanu Wojennego' },
            { date: moment([year, Month.December, 31]), text: 'Sylwester' },
        ];
        nonMoveableEvents.forEach(e => e.importance == EventImportance.NonHoliday);

        const events: CalendarEvent[] = [];
        events.push(...nonMoveableEvents);
        events.push(...this.GenerateNonHolidayEasterEvents(year));
        events.sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            else return 0;
        })

        return events;
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
        nonMoveableEvents.forEach(e => e.importance == EventImportance.Holiday);

        const events: CalendarEvent[] = [];
        events.push(...nonMoveableEvents);
        events.push(...this.GenerateHolidayEasterEvents(year));
        events.sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            else return 0;
        })

        return events;
    }

    private static GenerateNonHolidayEasterEvents(year: number): CalendarEvent[] {
        const easter: Moment = EasterFinder.GetDate(year);
        const events: CalendarEvent[] = [
            { date: easter.clone().add(-52, "days"), text: 'Tłusty Czwartek' },
            { date: easter.clone().add(-46, "days"), text: 'Środa Popielcowa' },
            { date: easter.clone().add(-3, "days"), text: 'Wielki Czwartek' },
            { date: easter.clone().add(-2, "days"), text: 'Wielki Piątek' },
            { date: easter.clone().add(-1, "days"), text: 'Wielka Sobota' },
        ];

        events.forEach(e => {
            e.importance = EventImportance.NonHoliday;
            e.isMoveable = true;
        });

        return events;
    }

    private static GenerateHolidayEasterEvents(year: number): CalendarEvent[] {
        const easter: Moment = EasterFinder.GetDate(year);
        const events: CalendarEvent[] = [
            { date: easter, text: 'Wielkanoc' },
            { date: easter.clone().add(1, "day"), text: 'Poniedziałek Wielkanocny' },
            { date: easter.clone().add(60, "days"), text: 'Boże Ciało' },
            { date: easter.clone().add(7, "weeks"), text: 'Zielone Świątki' },
        ];

        events.forEach(e => {
            e.importance = EventImportance.Holiday;
            e.isMoveable = true;
        });

        return events;
    }
}