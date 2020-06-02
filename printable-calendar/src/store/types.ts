import { Calendar } from '@/models/calendar';

export interface State {
    
}

export interface CalendarState {
    calendar?: Calendar,
    import?: ImportInfo
}

export interface ImportInfo {
    error: boolean,
    message: string
}