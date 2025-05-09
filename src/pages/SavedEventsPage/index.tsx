/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import React from 'react';
import type { Event } from '../../types';
import { SavedEventsView } from '../../components/events';
import './styles.scss';

interface SavedEventsPageProps {
    events: Event[];
    onToggleFavorite: (eventId: string) => void;
    onDeleteEvent: (eventId: string) => void;
    favoriteEvents: string[];
    onEditEvent: (event: Event) => void;
}

const SavedEventsPage: React.FC<SavedEventsPageProps> = ({
    events,
    onToggleFavorite,
    onDeleteEvent,
    favoriteEvents,
    onEditEvent
}) => {
    // Filtramos los eventos para mostrar solo los favoritos
    const favoriteEventsList = events.filter(event => favoriteEvents.includes(event.id));
    
    return (
        <div className="saved-events-page">
            <SavedEventsView
                events={favoriteEventsList}
                onToggleFavorite={onToggleFavorite}
                onDeleteEvent={onDeleteEvent}
                favoriteEvents={favoriteEvents}
                onEditEvent={onEditEvent}
            />
        </div>
    );
};

export default SavedEventsPage; 