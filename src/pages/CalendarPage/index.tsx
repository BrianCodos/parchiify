/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import type { Event } from '../../types';
import { CalendarView } from '../../components/calendar';
import './styles.scss';

interface CalendarPageProps {
    events: Event[];
    calendarDate: Date;
    setCalendarDate: (date: Date) => void;
    onToggleFavorite: (eventId: string) => void;
    onEditEvent: (event: Event) => void;
    favoriteEvents: string[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({
    events,
    calendarDate,
    setCalendarDate,
    onToggleFavorite,
    onEditEvent,
    favoriteEvents
}) => {
    return (
        <div className="calendar-page">
            <CalendarView
                events={events}
                calendarDate={calendarDate}
                setCalendarDate={setCalendarDate}
                onToggleFavorite={onToggleFavorite}
                onEditEvent={onEditEvent}
                favoriteEvents={favoriteEvents}
            />
        </div>
    );
};

export default CalendarPage; 