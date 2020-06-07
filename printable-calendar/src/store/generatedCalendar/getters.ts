import { GetterTree } from 'vuex';
import { CalendarState, State } from '../types';
import { CalendarEvent } from '@/models/calendar';

export const getters: GetterTree<CalendarState, State> = {
    getYear(state): number {
        if (state.calendar) {
            return state.calendar.year;
        }

        return new Date().getFullYear();
    },
    getCustomEvents(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.customEvents;
        }

        return [];
    },
    getHolidays(state): CalendarEvent[] {
        if (state.calendar) {
            return state.calendar.holidays;
        }

        return [];
    }
}