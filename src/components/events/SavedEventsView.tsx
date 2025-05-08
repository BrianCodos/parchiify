import React from 'react';
import type { Event } from '../../types';
import EventCard from './EventCard';

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
        <section className="rounded-lg p-6 sm:p-8 border border-gray-700">
            <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Mis Eventos Guardados</h1>
            </header>
            {sortedFavoriteEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="text-center text-gray-400 py-12 border border-gray-700 border-dashed rounded-lg">
                    <i className="fas fa-star fa-2x mb-3 text-gray-500"></i>
                    <h2 className="text-xl font-semibold text-gray-300 mb-1">No hay eventos guardados</h2>
                    <p className="text-gray-500">Cuando guardes un evento, aparecerá aquí.</p>
                </div>
            )}
        </section>
    );
};

export default SavedEventsView; 