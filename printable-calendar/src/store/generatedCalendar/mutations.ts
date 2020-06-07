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
            state.calendar.customEvents.push(event);
        }
    }
}