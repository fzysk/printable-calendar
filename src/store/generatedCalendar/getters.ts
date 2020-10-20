import { GetterTree } from 'vuex';
import { CalendarState, State } from '../types';
import { CalendarEvent, EventImportance } from '@/models/calendar';
import { ColorSettings } from '@/models/colors';

export const getters: GetterTree<CalendarState, State> = {
    // calendar year
    getYear(state): number {
        if (state.calendar) {
            return state.calendar.year;
        }
        return new Date().getFullYear();
    },

    // calendar events 
    getCustomEvents(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.events.filter(x => x.importance === EventImportance.UserEvent);
        }
        return [];
    },
    getNonHolidayEvents(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.events.filter(x => x.importance === EventImportance.NonHoliday);
        }
        return [];
    },
    getHolidays(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.events.filter(x => x.importance === EventImportance.Holiday);
        }
        return [];
    },

    /**
     * Returns array of events from calendar day-by-day 
     */
    getMonthEvents: (state) => (month: number): CalendarEvent[][] => {
        if (state.calendar) {
            return state.calendar.getMonth(month);
        }
        return [];
    },

    getColorSettings(state): ColorSettings | undefined {
        if (state.calendar) {
            return state.calendar.colorSettings;
        }

        return undefined;
    }
}