import React, { useState, useEffect } from 'react';
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
    // States for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    
    // Extract all unique moods from events
    const allMoods = React.useMemo(() => {
        const moodSet = new Set<string>();
        events.forEach(event => {
            if (event.mood) {
                event.mood.split(',').forEach(mood => {
                    moodSet.add(mood.trim());
                });
            }
        });
        return Array.from(moodSet).sort();
    }, [events]);
    
    // Filter events based on search term and selected moods
    useEffect(() => {
        let filtered = [...events];
        
        // Apply search filter
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(
                event => 
                    event.place.toLowerCase().includes(lowerCaseSearch) || 
                    event.city.toLowerCase().includes(lowerCaseSearch) ||
                    (event.notes && event.notes.toLowerCase().includes(lowerCaseSearch))
            );
        }
        
        // Apply mood filter
        if (selectedMoods.length > 0) {
            filtered = filtered.filter(event => {
                if (!event.mood) return false;
                const eventMoods = event.mood.split(',').map(m => m.trim());
                return selectedMoods.some(mood => eventMoods.includes(mood));
            });
        }
        
        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setFilteredEvents(filtered);
    }, [events, searchTerm, selectedMoods]);
    
    // Toggle mood selection
    const toggleMoodFilter = (mood: string) => {
        if (selectedMoods.includes(mood)) {
            setSelectedMoods(selectedMoods.filter(m => m !== mood));
        } else {
            setSelectedMoods([...selectedMoods, mood]);
        }
    };
    
    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedMoods([]);
    };

    return (
        <section className="event-list-container">
            <header className="event-list-header">
                <h1 className="event-list-title">
                    Describir eventos
                </h1>
                <p className="event-list-subtitle">Gestiona tus eventos de manera eficiente</p>
            </header>
            
            {/* Search and Filter Section */}
            <div className="event-search-filters">
                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input 
                        type="text" 
                        placeholder="Buscar eventos por nombre, ciudad o descripción..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button className="search-clear-btn" onClick={() => setSearchTerm('')}>
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
                
                <div className="mood-filter-container">
                    <div className="mood-filter-header">
                        <h3>Filtrar por Mood:</h3>
                        {selectedMoods.length > 0 && (
                            <button className="clear-filters-btn" onClick={clearFilters}>
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                    
                    <div className="mood-filter-options">
                        {allMoods.map(mood => (
                            <button 
                                key={mood} 
                                className={`mood-filter-btn ${selectedMoods.includes(mood) ? 'active' : ''}`}
                                onClick={() => toggleMoodFilter(mood)}
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Results Section */}
            <div className="event-list-content">
                {filteredEvents.length > 0 ? (
                    <div className="event-grid">
                        {filteredEvents.map(event => (
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
                        {events.length === 0 ? (
                            <>
                                <p className="event-empty-text">No hay eventos registrados.</p>
                                <p className="event-empty-help">Crea tu primer evento utilizando el botón "Nuevo Evento".</p>
                            </>
                        ) : (
                            <>
                                <p className="event-empty-text">No se encontraron eventos con los filtros actuales.</p>
                                <p className="event-empty-help">Prueba con otros criterios de búsqueda o <button className="reset-search-btn" onClick={clearFilters}>elimina los filtros</button>.</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EventList; 