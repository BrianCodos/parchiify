import React from 'react';
import type { Event } from '../../types';
import './CalendarEventCard.scss';

interface CalendarEventCardProps {
    event: Event;
    onToggleFavorite: (eventId: string) => void;
    isFavorited: boolean;
    onSelectEvent: (event: Event) => void;
}

const CalendarEventCard: React.FC<CalendarEventCardProps> = ({
    event,
    onToggleFavorite,
    isFavorited,
    onSelectEvent
}) => {
    const handleLinkClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Format date
    const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return (
        <div 
            className="calendar-event-card"
            onClick={() => onSelectEvent(event)}
        >
            <div className="calendar-event-card-content">
                <div className="calendar-event-card-header">
                    <h3 className="calendar-event-card-title">
                        {event.place}
                    </h3>
                    <button
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            onToggleFavorite(event.id); 
                        }}
                        className={`calendar-event-card-favorite ${isFavorited ? 'favorited' : ''}`}
                        aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        <i className="fas fa-star"></i>
                    </button>
                </div>
                
                <div className="calendar-event-card-info">
                    <div className="calendar-event-card-date">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{formattedDate}</span>
                    </div>
                    
                    {event.link && (
                        <a
                            href={event.link.startsWith('http') ? event.link : `http://${event.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="calendar-event-card-link"
                        >
                            <i className="fas fa-external-link-alt"></i>
                            <span>Ver enlace</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarEventCard; 