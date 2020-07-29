import { GetterTree } from 'vuex';
import { CalendarState, State } from '../types';
import { CalendarEvent } from '@/models/calendar';

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
            return state.calendar.customEvents;
        }
        return [];
    },
    getNonHolidayEvents(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.nonHolidayEvents;
        }
        return [];
    },
    getHolidays(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.holidays;
        }
        return [];
    },

    /**
     * Returns array of events from calendar day-by-day 
     */
    getMonthEvents(state, month: number): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.getMonth(month);
        }
        return [];
    }
}