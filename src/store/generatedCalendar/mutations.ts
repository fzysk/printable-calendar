import { MutationTree } from 'vuex';
import { CalendarState } from '../types';
import { CalendarCreatorService } from '@/services/calendarCreator.service';
import { CalendarEvent, EventImportance } from '@/models/calendar';

export const mutations: MutationTree<CalendarState> = {
    makeCalendar(state, year: number) {
        state.calendar = CalendarCreatorService.GenerateCalendar(year);
    },

    addCustomEvent(state, event: CalendarEvent) {
        if (state.calendar) {
            // find index to insert an event
            let i = 0;
            for (; i < state.calendar.events.length; i++) {
                const e = state.calendar.events[i];
                if (e.date.isAfter(event.date)) {
                    break;
                }
            }
            
            event.importance = EventImportance.UserEvent;
            state.calendar.events.splice(i, 0, event);
        }
    },

    deleteCustomEvents(state, events: CalendarEvent[]) {
        if (!state.calendar) {
            return;
        }
        
        events.forEach(e => {
            for (let i = state.calendar!.events.length - 1; i >= 0; i--) {
                const event = state.calendar!.events[i];
                if (event.importance === EventImportance.UserEvent && 
                    event.date.isSame(e.date) && 
                    event.text === e.text) 
                {
                    state.calendar!.events.splice(i, 1);
                }
            }
        });
    },
    deleteNonHolidays(state, events: CalendarEvent[]) {
        if (!state.calendar) {
            return;
        }
        
        events.forEach(e => {
            for (let i = state.calendar!.events.length - 1; i >= 0; i--) {
                const event = state.calendar!.events[i];
                if (event.importance === EventImportance.NonHoliday && 
                    event.date.isSame(e.date) && 
                    event.text === e.text) 
                {
                    state.calendar!.events.splice(i, 1);
                }
            }
        });
    },
    deleteHolidays(state, events: CalendarEvent[]) {
        if (!state.calendar) {
            return;
        }

        events.forEach(e => {
            for (let i = state.calendar!.events.length - 1; i >= 0; i--) {
                const event = state.calendar!.events[i];
                if (event.importance === EventImportance.Holiday && 
                    event.date.isSame(e.date) && 
                    event.text === e.text) 
                {
                    state.calendar!.events.splice(i, 1);
                }
            }
        });
    }
}