import React from 'react';
import type { Event } from '../../types';
import './EventCard.css';

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

    // Format date
    const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Split mood tags if present
    const moodTags = event.mood ? event.mood.split(',') : [];

    return (
        <div className={`event-card ${isDraftCard ? 'draft-card' : ''}`}>
            {/* Event Image Section */}
            <div className="event-card-image-container">
                {event.imageUrl ? (
                    <img 
                        src={event.imageUrl} 
                        alt={event.place} 
                        className="event-card-image" 
                    />
                ) : (
                    <div className="event-card-no-image">
                        <i className="fas fa-image"></i>
                    </div>
                )}
                
                {/* Favorite Button (prominently displayed over the image) */}
                {!isDraftCard && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(event.id); }}
                        className={`event-card-favorite-btn ${isFavorited ? 'favorited' : ''}`}
                        aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        <i className="fas fa-star"></i>
                    </button>
                )}
                
                {/* Draft Badge */}
                {isDraftCard && (
                    <span className="event-card-draft-badge">Borrador</span>
                )}
            </div>
            
            {/* Event Content Section */}
            <div className="event-card-content">
                <div className="event-card-header">
                    <h3 className="event-card-title">{event.place}</h3>
                    <div className="event-card-actions">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEditEvent(event); }}
                            className="event-card-action-btn edit"
                            aria-label="Editar evento"
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                            className="event-card-action-btn delete"
                            aria-label="Eliminar evento"
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                
                <div className="event-card-info">
                    <div className="event-info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{event.city}</span>
                    </div>
                    <div className="event-info-item">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{formattedDate}</span>
                    </div>
                    
                    {/* Link to event if available */}
                    {event.link && (
                        <a
                            href={event.link.startsWith('http') ? event.link : `http://${event.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="event-card-link"
                        >
                            <i className="fas fa-external-link-alt"></i>
                            <span>Ver enlace</span>
                        </a>
                    )}
                </div>
                
                {/* Mood Tags */}
                {moodTags.length > 0 && (
                    <div className="event-card-moods">
                        {moodTags.map((mood, index) => (
                            <span key={index} className="event-card-mood-tag">
                                {mood.trim()}
                            </span>
                        ))}
                    </div>
                )}
                
                {/* Event Notes */}
                {event.notes && (
                    <div className="event-card-notes">
                        <p>
                            <i className="fas fa-sticky-note"></i>
                            {event.notes}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCard; 