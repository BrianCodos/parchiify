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

    // Base class for table header cells
    const tableHeaderClass = "text-left py-3 px-4 text-gray-400 text-sm font-medium border-b border-gray-700 first:rounded-tl-lg last:rounded-tr-lg";
    
    // Base class for table cells
    const tableCellClass = "py-4 px-4 text-gray-300";
    
    // Base class for action icon buttons in table, similar to EventCard
    const iconButtonBaseClass = "p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 hover:bg-gray-700 transition-all duration-150 ease-in-out";

    return (
        <section className="rounded-lg">
            <header className="pt-6 sm:pt-8 px-6 sm:px-8 mb-6 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Tabla de Eventos</h1>
            </header>
            {sortedEvents.length > 0 ? (
                <div className="px-6 sm:px-8 pb-6 sm:pb-8 overflow-x-auto styled-scrollbar">
                    <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 rounded-t-lg">
                            <tr>
                                <th className={tableHeaderClass}>Lugar</th>
                                <th className={tableHeaderClass}>Ciudad</th>
                                <th className={tableHeaderClass}>Fecha</th>
                                <th className={`${tableHeaderClass} text-center`}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEvents.map((event, index) => (
                                <tr 
                                    key={event.id} 
                                    className={`border-b border-gray-700 hover:bg-gray-700 transition-colors duration-150 ${index === sortedEvents.length - 1 ? 'last:border-b-0' : ''}`}
                                >
                                    <td className={`${tableCellClass} font-medium text-white`}>{event.place}</td>
                                    <td className={tableCellClass}>{event.city}</td>
                                    <td className={tableCellClass}>
                                        {new Date(event.date).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className={`${tableCellClass} text-center`}>
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => onEditEvent(event)}
                                                className={`${iconButtonBaseClass} text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 focus:ring-blue-500`}
                                                aria-label="Editar evento"
                                                title="Editar evento"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => onDeleteEvent(event.id)}
                                                className={`${iconButtonBaseClass} text-red-500 hover:text-red-400 hover:bg-red-900/30 focus:ring-red-600`}
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
                <div className="text-center text-gray-400 py-12">
                    <i className="fas fa-table fa-2x mb-3 text-gray-500"></i>
                    <h2 className="text-xl font-semibold text-gray-300 mb-1">No hay eventos registrados</h2>
                    <p className="text-gray-500">Crea tu primer evento para verlo en la tabla.</p>
                </div>
            )}
        </section>
    );
};

export default EventTableView; 