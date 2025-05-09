import React, { useState } from 'react';
import type { Event } from '../../types';
import './EventDetailView.scss';

interface EventDetailViewProps {
    event: Event;
    onClose: () => void;
    onToggleFavorite: (eventId: string) => void;
    isFavorited: boolean;
    onNavigateNext?: () => void;
    onNavigatePrev?: () => void;
}

const EventDetailView: React.FC<EventDetailViewProps> = ({
    event,
    onClose,
    onToggleFavorite,
    isFavorited,
    onNavigateNext,
    onNavigatePrev
}) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareCount, setShareCount] = useState(0);

    // Format date
    const formattedDate = new Date(event.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Split mood tags if present
    const moodTags = event.mood ? event.mood.split(',') : [];

    const handleShare = (platform: string) => {
        // Increment share counter
        setShareCount(prev => prev + 1);

        // Get the current URL 
        const eventUrl = `${window.location.origin}/event/${event.id}`;
        
        // Create share message
        const shareMessage = `¡Mira este evento: ${event.place} en ${event.city} el ${formattedDate}!`;
        
        // Handle different share platforms
        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + eventUrl)}`, '_blank');
                break;
            case 'instagram':
                // Instagram doesn't have a direct share URL, so we'll copy to clipboard
                navigator.clipboard.writeText(shareMessage + ' ' + eventUrl)
                    .then(() => alert('¡Enlace copiado! Puedes pegarlo en Instagram'));
                break;
            case 'email':
                window.open(`mailto:?subject=Evento: ${encodeURIComponent(event.place)}&body=${encodeURIComponent(shareMessage + '\n\n' + eventUrl)}`, '_blank');
                break;
            default:
                navigator.clipboard.writeText(eventUrl)
                    .then(() => alert('Enlace copiado al portapapeles'));
        }
        
        // Close share modal
        setIsShareModalOpen(false);
    };
    
    // Handle navigation with keyboard
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight' && onNavigateNext) {
            onNavigateNext();
        } else if (e.key === 'ArrowLeft' && onNavigatePrev) {
            onNavigatePrev();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="event-detail-overlay" tabIndex={0} onKeyDown={handleKeyDown}>
            <div className="event-detail-modal">
                <button className="event-detail-close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                
                {/* Navigation Arrows */}
                {onNavigatePrev && (
                    <button className="event-detail-nav-btn prev" onClick={onNavigatePrev}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                )}
                
                {onNavigateNext && (
                    <button className="event-detail-nav-btn next" onClick={onNavigateNext}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                )}
                
                <div className="event-detail-two-columns">
                    {/* Left Column: Event Image */}
                    <div className="event-detail-image-container">
                        {event.imageUrl ? (
                            <img src={event.imageUrl} alt={event.place} className="event-detail-image" />
                        ) : (
                            <div className="event-detail-no-image">
                                <i className="fas fa-image"></i>
                            </div>
                        )}
                    </div>
                    
                    {/* Right Column: Event Content */}
                    <div className="event-detail-content">
                        <h2 className="event-detail-title">{event.place}</h2>
                        
                        <div className="event-detail-info">
                            <div className="event-detail-info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{event.city}</span>
                            </div>
                            <div className="event-detail-info-item">
                                <i className="fas fa-calendar-alt"></i>
                                <span>{formattedDate}</span>
                            </div>
                            
                            {/* Entry Fee Information */}
                            <div className="event-detail-info-item">
                                <i className="fas fa-ticket-alt"></i>
                                {(event as any).entryType === 'free' ? (
                                    <span className="event-free-entry">Entrada gratuita</span>
                                ) : (event as any).coverFee ? (
                                    <span className="event-cover-fee">Cover: {(event as any).coverFee}</span>
                                ) : (
                                    <span>Precio no especificado</span>
                                )}
                            </div>
                            
                            {/* Link to event if available */}
                            {event.link && (
                                <a
                                    href={event.link.startsWith('http') ? event.link : `http://${event.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="event-detail-link"
                                >
                                    <i className="fas fa-external-link-alt"></i>
                                    <span>Visitar sitio web</span>
                                </a>
                            )}
                        </div>
                        
                        {/* Mood Tags */}
                        {moodTags.length > 0 && (
                            <div className="event-detail-moods">
                                {moodTags.map((mood, index) => (
                                    <span key={index} className="event-detail-mood-tag">
                                        {mood.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        {/* Event Notes */}
                        {event.notes && (
                            <div className="event-detail-notes">
                                <h3>Descripción</h3>
                                <p>{event.notes}</p>
                            </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="event-detail-actions">
                            <button 
                                className={`event-detail-action-btn favorite ${isFavorited ? 'active' : ''}`}
                                onClick={() => onToggleFavorite(event.id)}
                            >
                                <i className="fas fa-heart"></i>
                                <span>Me gusta</span>
                            </button>
                            
                            <button 
                                className="event-detail-action-btn share"
                                onClick={() => setIsShareModalOpen(true)}
                            >
                                <i className="fas fa-share-alt"></i>
                                <span>Compartir</span>
                                {shareCount > 0 && (
                                    <span className="share-count">{shareCount}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Share Modal */}
            {isShareModalOpen && (
                <div className="share-modal">
                    <div className="share-modal-content">
                        <h3>Compartir evento</h3>
                        <div className="share-options">
                            <button 
                                className="share-option whatsapp"
                                onClick={() => handleShare('whatsapp')}
                            >
                                <i className="fab fa-whatsapp"></i>
                                <span>WhatsApp</span>
                            </button>
                            <button 
                                className="share-option instagram"
                                onClick={() => handleShare('instagram')}
                            >
                                <i className="fab fa-instagram"></i>
                                <span>Instagram</span>
                            </button>
                            <button 
                                className="share-option email"
                                onClick={() => handleShare('email')}
                            >
                                <i className="fas fa-envelope"></i>
                                <span>Email</span>
                            </button>
                        </div>
                        <button 
                            className="close-share-modal"
                            onClick={() => setIsShareModalOpen(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetailView; 