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
    }
}