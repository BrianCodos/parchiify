/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import type { Event } from '../../types';
import EventCard from './EventCard';
import './EventGrid.scss';

interface EventGridProps {
    events: Event[];
    onToggleFavorite: (eventId: string) => void;
    onDeleteEvent: (eventId: string) => void;
    onEditEvent: (event: Event) => void;
    favoriteEvents: string[];
    emptyStateComponent?: React.ReactNode;
    className?: string;
}

const EventGrid: React.FC<EventGridProps> = ({
    events,
    onToggleFavorite,
    onDeleteEvent,
    onEditEvent,
    favoriteEvents,
    emptyStateComponent,
    className = ''
}) => {
    if (events.length === 0 && emptyStateComponent) {
        return <>{emptyStateComponent}</>;
    }

    return (
        <div className={`event-grid ${className}`}>
            {events.map((event, index) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onToggleFavorite={onToggleFavorite}
                    onDeleteEvent={onDeleteEvent}
                    onEditEvent={onEditEvent}
                    isFavorited={favoriteEvents.includes(event.id)}
                    allEvents={events}
                    currentIndex={index}
                    favoritedEventIds={favoriteEvents}
                />
            ))}
        </div>
    );
};

export default EventGrid; 