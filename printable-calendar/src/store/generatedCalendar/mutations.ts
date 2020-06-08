import { MutationTree } from 'vuex';
import { CalendarState } from '../types';
import { CalendarCreatorService } from '@/services/calendarCreator.service';
import { CalendarEvent } from '@/models/calendar';

export const mutations: MutationTree<CalendarState> = {
    makeCalendar(state, year: number) {
        state.calendar = CalendarCreatorService.GenerateCalendar(year);
    },

    addCustomEvent(state, event: CalendarEvent) {
        if (state.calendar) {
            // find index to insert an event
            let i = 0;
            for (; i < state.calendar.customEvents.length; i++) {
                const e = state.calendar.customEvents[i];
                if (e.date.isAfter(event.date)) {
                    break;
                }
            }

            state.calendar.customEvents.splice(i, 0, event);
        }
    },

    deleteCustomEvents(state, events: CalendarEvent[]) {
        events.forEach(e => {
            for (let i = (state.calendar?.customEvents.length ?? 0) - 1; i >= 0; i--) {
                if (state.calendar?.customEvents[i] === e) {
                    state.calendar.customEvents.splice(i, 1);
                }
            }
        });
    },
    deleteNonHolidays(state, events: CalendarEvent[]) {
        events.forEach(e => {
            for (let i = (state.calendar?.customEvents.length ?? 0) - 1; i >= 0; i--) {
                if (state.calendar?.nonHolidayEvents[i] === e) {
                    state.calendar.nonHolidayEvents.splice(i, 1);
                }
            }
        });
    },
    deleteHolidays(state, events: CalendarEvent[]) {
        events.forEach(e => {
            for (let i = (state.calendar?.holidays.length ?? 0) - 1; i >= 0; i--) {
                if (state.calendar?.holidays[i] === e) {
                    state.calendar.holidays.splice(i, 1);
                }
            }
        });
    }
}