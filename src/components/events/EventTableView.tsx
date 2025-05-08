import React from 'react';
import type { Event } from '../../types';

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

    // Base class for action icon buttons in table, similar to EventCard
    const iconButtonBaseClass = "p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 hover:bg-gray-600 transition-all duration-150 ease-in-out";

    return (
        <section className="bg-gray-800 shadow-xl rounded-lg">
            <header className="pt-6 sm:pt-8 px-6 sm:px-8 mb-6 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">Tabla de Eventos</h1>
            </header>
            {sortedEvents.length > 0 ? (
                <div className="overflow-x-auto p-1 sm:p-2"> {/* Added slight padding around the table container */}
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700 bg-opacity-50"> {/* Darker, slightly transparent header */}
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Lugar</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Ciudad</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Mood</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                            {sortedEvents.map(event => (
                                <tr key={event.id} className="hover:bg-gray-700 hover:bg-opacity-75 transition-colors duration-150 ease-in-out group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 group-hover:text-white">{event.place}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-gray-100">{event.city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-gray-100">
                                        {new Date(event.date).toLocaleDateString('es-ES', {
                                            weekday: 'short', /* Shorten weekday for table view */
                                            year: 'numeric',
                                            month: 'short', /* Shorten month */
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-gray-100">
                                        {event.mood ? (
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 group-hover:bg-gray-600 text-gray-300 group-hover:text-gray-100">
                                                {event.mood}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center space-x-2.5">
                                            <button
                                                onClick={() => onEditEvent(event)}
                                                className={`${iconButtonBaseClass} text-blue-400 hover:text-blue-300 focus:ring-blue-500`}
                                                aria-label="Editar evento"
                                            >
                                                <i className="fas fa-edit text-base"></i>
                                            </button>
                                            <button
                                                onClick={() => onDeleteEvent(event.id)}
                                                className={`${iconButtonBaseClass} text-red-500 hover:text-red-400 focus:ring-red-600`}
                                                aria-label="Eliminar evento"
                                            >
                                                <i className="fas fa-trash-alt text-base"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-400 py-12">
                    <i className="fas fa-table fa-2x mb-3 text-gray-500"></i>
                    <p className="text-lg">No hay eventos registrados para mostrar en la tabla.</p>
                </div>
            )}
        </section>
    );
};

export default EventTableView; 