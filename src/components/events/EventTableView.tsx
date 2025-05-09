import React from 'react';
import type { Event } from '../../types';
import './EventTableView.scss';

interface EventTableViewProps {
    events: Event[];
    onEditEvent: (event: Event) => void;
    onDeleteEvent: (eventId: string) => void;
}

const EventTableView: React.FC<EventTableViewProps> = ({
    events,
    onEditEvent,
    onDeleteEvent
}) => {
    const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="dashboard-section">
            <h2 className="dashboard-title">Tabla de Eventos</h2>
            <p className="dashboard-subtitle">Visualiza todos tus eventos en formato de tabla</p>
            
            {sortedEvents.length > 0 ? (
                <div className="event-table-content">
                    <table className="event-table">
                        <thead>
                            <tr>
                                <th>Lugar</th>
                                <th>Ciudad</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEvents.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.place}</td>
                                    <td>{event.city}</td>
                                    <td>
                                        {new Date(event.date).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <div className="event-table-actions">
                                            <button
                                                onClick={() => onEditEvent(event)}
                                                className="event-table-btn edit"
                                                aria-label="Editar evento"
                                                title="Editar evento"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => onDeleteEvent(event.id)}
                                                className="event-table-btn delete"
                                                aria-label="Eliminar evento"
                                                title="Eliminar evento"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="event-table-empty">
                    <div className="event-table-empty-icon">
                        <i className="fas fa-calendar-times"></i>
                    </div>
                    <h3 className="event-table-empty-text">No hay eventos para mostrar</h3>
                    <p className="event-table-empty-subtext">Añade eventos desde la página principal para verlos aquí</p>
                </div>
            )}
        </div>
    );
};

export default EventTableView; 