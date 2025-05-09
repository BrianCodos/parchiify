import React from 'react';
import type { Event } from '../../types';
import EventCard from './EventCard';
import './SavedEventsView.scss';

interface SavedEventsViewProps {
    events: Event[];
    onToggleFavorite: (eventId: string) => void;
    onDeleteEvent: (eventId: string) => void;
    favoriteEvents: string[];
    onEditEvent: (event: Event) => void;
}

const SavedEventsView: React.FC<SavedEventsViewProps> = ({
    events,
    onToggleFavorite,
    onDeleteEvent,
    favoriteEvents,
    onEditEvent
}) => {
    const sortedFavoriteEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <section className="saved-events-container">
            <header className="saved-events-header">
                <h1 className="saved-events-title">Mis Eventos Guardados</h1>
                <p className="saved-events-subtitle">Revisa tus eventos favoritos</p>
            </header>
            {sortedFavoriteEvents.length > 0 ? (
                <div className="saved-events-grid">
                    {sortedFavoriteEvents.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onToggleFavorite={onToggleFavorite}
                            onDeleteEvent={onDeleteEvent}
                            isFavorited={favoriteEvents.includes(event.id)}
                            onEditEvent={onEditEvent}
                        />
                    ))}
                </div>
            ) : (
                <div className="saved-events-empty">
                    <div className="empty-star-icon">
                        <i className="fas fa-star"></i>
                    </div>
                    <h2 className="empty-title">No hay eventos guardados</h2>
                    <p className="empty-message">Cuando guardes un evento como favorito, aparecerá aquí.</p>
                    <p className="empty-tip">Utiliza el botón <i className="fas fa-star example-star"></i> en las tarjetas de eventos para añadirlas a favoritos.</p>
                </div>
            )}
        </section>
    );
};

export default SavedEventsView; 