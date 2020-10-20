import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CalendarState, State } from '../types';

export const state: CalendarState = {
    calendar: undefined,
    import: undefined
}

const namespaced = true;

export const generatedCalendar: Module<CalendarState, State> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
}