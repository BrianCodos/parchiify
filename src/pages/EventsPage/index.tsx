/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import type { Event, ViewType } from '../../types';
import { EventList, EventTableView } from '../../components/events';
import './styles.scss';

interface EventsPageProps {
    events: Event[];
    onToggleFavorite: (eventId: string) => void;
    onDeleteEvent: (eventId: string) => void;
    onEditEvent: (event: Event) => void;
    favoriteEvents: string[];
    moods: string[];
    viewType?: ViewType;
}

const EventsPage: React.FC<EventsPageProps> = ({
    events,
    onToggleFavorite,
    onDeleteEvent,
    onEditEvent,
    favoriteEvents,
    moods,
    viewType = 'list-cards'
}) => {
    // Determinar qué vista mostrar según el viewType
    const renderView = () => {
        switch (viewType) {
            case 'list-table':
                return (
                    <EventTableView
                        events={events}
                        onEditEvent={onEditEvent}
                        onDeleteEvent={onDeleteEvent}
                    />
                );
            case 'list-cards':
            default:
                return (
                    <EventList
                        events={events}
                        onToggleFavorite={onToggleFavorite}
                        onDeleteEvent={onDeleteEvent}
                        onEditEvent={onEditEvent}
                        favoriteEvents={favoriteEvents}
                        moods={moods}
                    />
                );
        }
    };

    return (
        <div className="events-page">
            {renderView()}
        </div>
    );
};

export default EventsPage; 