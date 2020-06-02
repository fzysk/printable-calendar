import { MutationTree } from 'vuex';
import { CalendarState } from '../types';
import { CalendarCreatorService } from '@/services/calendarCreator.service';

export const mutations: MutationTree<CalendarState> = {
    makeCalendar(state, year: number) {
        state.calendar = CalendarCreatorService.GenerateCalendar(year);
    }
}