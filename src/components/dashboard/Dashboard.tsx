import React, { useState } from 'react';
import type { MoodHandlers } from '../../types';

interface DashboardProps extends MoodHandlers {}

const Dashboard: React.FC<DashboardProps> = ({ onAddMood, onDeleteMood }) => {
    const [newMood, setNewMood] = useState<string>('');
    const [moods, setMoods] = useState<string[]>(() => {
        const savedMoods = localStorage.getItem('moods');
        return savedMoods ? JSON.parse(savedMoods) : [
            'Feliz', 'Triste', 'Enojado', 'Sorprendido', 'Emocionado'
        ];
    });

    const handleAddMood = () => {
        if (newMood.trim() && !moods.includes(newMood.trim())) {
            const updatedMoods = [...moods, newMood.trim()];
            setMoods(updatedMoods);
            onAddMood(newMood.trim());
            setNewMood('');
        }
    };

    const handleDeleteMood = (mood: string) => {
        const updatedMoods = moods.filter(m => m !== mood);
        setMoods(updatedMoods);
        onDeleteMood(mood);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddMood();
        }
    };

    return (
        <section className="rounded-lg p-6 sm:p-8 border border-gray-700">
            <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Dashboard</h1>
                <p className="text-gray-400 mt-2">Gestiona la configuración de tu aplicación</p>
            </header>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <i className="fas fa-sliders-h mr-3 text-indigo-400"></i>
                    Gestionar Moods
                </h2>
                <p className="text-gray-400 mb-4">
                    Añade o elimina moods para clasificar tus eventos.
                </p>

                <div className="flex gap-2 mb-6">
                    <input 
                        type="text"
                        placeholder="Nuevo mood..."
                        value={newMood}
                        onChange={(e) => setNewMood(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow p-3 rounded-lg bg-gray-800 text-white border-0 shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    />
                    <button 
                        onClick={handleAddMood}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Añadir
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {moods.map((mood) => (
                        <div 
                            key={mood}
                            className="flex justify-between items-center p-3 rounded-lg border border-gray-700 text-white"
                        >
                            <span>{mood}</span>
                            <button
                                onClick={() => handleDeleteMood(mood)}
                                className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-all duration-200"
                                aria-label="Eliminar mood"
                                title="Eliminar mood"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <i className="fas fa-chart-line mr-3 text-indigo-400"></i>
                    Estadísticas
                </h2>
                <p className="text-gray-400 mb-4">
                    Aquí encontrarás estadísticas sobre tus eventos.
                </p>
                <div className="text-center py-12 text-gray-400 border border-gray-700 border-dashed rounded-lg">
                    <i className="fas fa-chart-bar fa-3x mb-4 text-gray-500"></i>
                    <p>Las estadísticas estarán disponibles pronto.</p>
                </div>
            </div>
        </section>
    );
};

export default Dashboard; 