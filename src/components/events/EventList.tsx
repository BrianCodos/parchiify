import React from 'react';
import type { Event } from '../../types';
import EventCard from './EventCard';
import './EventList.css';

interface EventListProps {
    events: Event[];
    onToggleFavorite: (eventId: string) => void;
    onDeleteEvent: (eventId: string) => void;
    onEditEvent: (event: Event) => void;
    favoriteEvents: string[];
}

const EventList: React.FC<EventListProps> = ({
    events,
    onToggleFavorite,
    onDeleteEvent,
    onEditEvent,
    favoriteEvents
}) => {
    const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <section className="event-list">
            <header className="event-list-header">
                <h1 className="event-list-title text-gradient">
                    Eventos
                </h1>
                <p className="event-list-subtitle">Gestiona tus eventos de manera eficiente</p>
            </header>
            
            <div className="event-list-content">
                {sortedEvents.length > 0 ? (
                    <div className="event-grid">
                        {sortedEvents.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onToggleFavorite={onToggleFavorite}
                                onDeleteEvent={onDeleteEvent}
                                onEditEvent={onEditEvent}
                                isFavorited={favoriteEvents.includes(event.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="event-empty-state">
                        <div className="event-empty-icon">
                            <i className="fas fa-calendar-day"></i>
                        </div>
                        <p className="event-empty-text">No hay eventos registrados.</p>
                        <p className="event-empty-help">Crea tu primer evento utilizando el botón "Nuevo Evento".</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventList; 