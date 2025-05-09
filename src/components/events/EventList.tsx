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
    moods?: string[];
}

const EventList: React.FC<EventListProps> = ({
    events,
    onToggleFavorite,
    onDeleteEvent,
    onEditEvent,
    favoriteEvents,
    moods = []
}) => {
    // States for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
    const [timeFilter, setTimeFilter] = useState('');
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    
    // Cities (could be fetched from API in a real app)
    const cities = ['Cali', 'Bogotá', 'Medellín', 'Barranquilla', 'Cartagena'];
    
    // Filter events based on search term, city, moods, and time
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
        
        // Apply city filter
        if (selectedCity) {
            filtered = filtered.filter(event => event.city === selectedCity);
        }
        
        // Apply mood filter
        if (selectedMoods.length > 0) {
            filtered = filtered.filter(event => {
                if (!event.mood) return false;
                const eventMoods = event.mood.split(',').map(m => m.trim());
                return selectedMoods.some(mood => eventMoods.includes(mood));
            });
        }
        
        // Apply time filter
        if (timeFilter) {
            filtered = filtered.filter(event => {
                if (!event.startTime) return false;
                
                // Handle different time filters
                const eventTime = new Date(`2000-01-01T${event.startTime}`).getHours();
                
                switch(timeFilter) {
                    case 'morning':
                        return eventTime >= 6 && eventTime < 12;
                    case 'afternoon':
                        return eventTime >= 12 && eventTime < 18;
                    case 'evening':
                        return eventTime >= 18 && eventTime < 22;
                    case 'night':
                        return eventTime >= 22 || eventTime < 6;
                    default:
                        return true;
                }
            });
        }
        
        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setFilteredEvents(filtered);
    }, [events, searchTerm, selectedCity, selectedMoods, timeFilter]);
    
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
        setSelectedCity('');
        setSelectedMoods([]);
        setTimeFilter('');
    };

// Sección principal de la lista de eventos
return (
    <section className="event-list-container">
        {/* Sección de encabezado */}
        <header className="event-list-header">
            <h1 className="event-list-title">Jamás te volverás a perder de nada</h1>
        </header>
        
        {/* Sección de búsqueda y filtros */}
        <div className="event-search-filters">
            {/* Contenedor de búsqueda */}
            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    placeholder="Buscar eventos por nombre o descripción..."
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
            
            {/* Filtros avanzados: Ciudad y Hora */}
            <div className="advanced-filters">
                <div className="filter-row">
                    <div className="filter-group">
                        <label>Ciudad:</label>
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Todas las ciudades</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label>Hora:</label>
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Cualquier hora</option>
                            <option value="morning">Mañana (6am-12pm)</option>
                            <option value="afternoon">Tarde (12pm-6pm)</option>
                            <option value="evening">Noche (6pm-10pm)</option>
                            <option value="night">Madrugada (10pm-6am)</option>
                        </select>
                    </div>
                    
                    {/* Botón para limpiar filtros */}
                    {(selectedCity || timeFilter || selectedMoods.length > 0) && (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>
            
            {/* Sección de filtro por Mood */}
            <div className="mood-filter-container">
                <div className="mood-filter-header">
                    <h3>Filtrar por Mood:</h3>
                </div>
                
                <div className="mood-filter-options">
                    {moods.map(mood => (
                        <button
                            key={mood}
                            className={`mood-filter-btn ${selectedMoods.includes(mood) ? 'active' : ''}`}
                            onClick={() => toggleMoodFilter(mood)}
                            data-mood={mood}
                        >
                            {mood}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Sección de resultados */}
        <div className="event-list-content">
            {filteredEvents.length > 0 ? (
                <>
                    {/* Cuadrícula de eventos */}
                    <div className="event-grid">
                        {filteredEvents.map((event, index) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onToggleFavorite={onToggleFavorite}
                                onDeleteEvent={onDeleteEvent}
                                onEditEvent={onEditEvent}
                                isFavorited={favoriteEvents.includes(event.id)}
                                allEvents={filteredEvents}
                                currentIndex={index}
                                favoritedEventIds={favoriteEvents}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {/* Estado vacío de eventos */}
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
                                <p className="event-empty-help">
                                    Prueba con otros criterios de búsqueda o{' '}
                                    <button className="reset-search-btn" onClick={clearFilters}>
                                        elimina los filtros
                                    </button>.
                                </p>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    </section>
);
};

export default EventList; 