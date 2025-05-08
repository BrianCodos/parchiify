import React from 'react';
import type { Event } from '../../types';

interface EventCardProps {
    event: Event;
    onToggleFavorite: (eventId: string) => void;
    onDeleteEvent: (eventId: string) => void;
    onEditEvent: (event: Event) => void;
    isFavorited?: boolean;
    isDraftCard?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
    event,
    onToggleFavorite,
    onDeleteEvent,
    onEditEvent,
    isFavorited = false,
    isDraftCard = false
}) => {
    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Define base button class for consistency
    const iconButtonBaseClass = "p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out";

    return (
        <div className={`bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out ${isDraftCard ? 'border-l-4 border-yellow-500' : ''}`}>
            <div> {/* Content Wrapper */}
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white break-words">{event.place}</h3>
                    <div className="flex space-x-1.5 flex-shrink-0 ml-2">
                        {!isDraftCard && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleFavorite(event.id); }}
                                className={`${iconButtonBaseClass} ${isFavorited ? 'text-yellow-400 hover:text-yellow-300 focus:ring-yellow-500' : 'text-gray-400 hover:text-yellow-400 focus:ring-yellow-500'}`}
                                aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
                            >
                                <i className={`fas fa-star text-lg ${isFavorited ? 'fill-current' : ''}`}></i>
                            </button>
                        )}
                        <button
                            onClick={(e) => { e.stopPropagation(); onEditEvent(event); }}
                            className={`${iconButtonBaseClass} text-blue-400 hover:text-blue-300 focus:ring-blue-500`}
                            aria-label="Editar evento"
                        >
                            <i className="fas fa-edit text-lg"></i>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                            className={`${iconButtonBaseClass} text-red-500 hover:text-red-400 focus:ring-red-600`}
                            aria-label="Eliminar evento"
                        >
                            <i className="fas fa-trash-alt text-lg"></i>
                        </button>
                    </div>
                </div>
                <div className="space-y-2.5 text-sm">
                    <p className="text-gray-400 flex items-center">
                        <i className="fas fa-map-marker-alt mr-2.5 text-gray-500 w-4 text-center"></i>
                        {event.city}
                    </p>
                    <p className="text-gray-400 flex items-center">
                        <i className="fas fa-calendar-alt mr-2.5 text-gray-500 w-4 text-center"></i>
                        {new Date(event.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    {event.link && (
                        <a
                            href={event.link.startsWith('http') ? event.link : `http://${event.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center transition-colors duration-150 ease-in-out group"
                        >
                            <i className="fas fa-external-link-alt mr-2 text-indigo-500 group-hover:text-indigo-400 w-4 text-center"></i>
                            Ver enlace
                        </a>
                    )}
                    {event.mood && (
                        <p className="text-gray-400 flex items-center">
                            <i className="fas fa-smile mr-2.5 text-gray-500 w-4 text-center"></i>
                            <span className="bg-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-300">{event.mood}</span>
                        </p>
                    )}
                </div>
            </div>
            {event.notes && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                    <p className="text-gray-400 text-sm break-words">
                        <i className="fas fa-sticky-note mr-2.5 text-gray-500 align-top"></i>
                        {event.notes}
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventCard; 