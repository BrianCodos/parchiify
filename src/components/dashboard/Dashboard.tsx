import React, { useState } from 'react';

interface DashboardProps {
    moods: string[];
    onAddMood: (moodName: string) => void;
    onDeleteMood: (moodName: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    moods,
    onAddMood,
    onDeleteMood
}) => {
    const [newMoodName, setNewMoodName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMoodName.trim()) {
            onAddMood(newMoodName.trim());
            setNewMoodName('');
        }
    };

    const baseInputClass = "mt-1 block w-full rounded-md bg-gray-700 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors duration-150 ease-in-out p-3";
    const validInputClass = "border-gray-600";

    const iconButtonBaseClass = "p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-700 hover:bg-gray-600 transition-all duration-150 ease-in-out";

    return (
        <section className="bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <header className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-indigo-400">Dashboard</h1>
            </header>
            <div className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Administrar Moods</h2>
                <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        value={newMoodName}
                        onChange={e => setNewMoodName(e.target.value)}
                        placeholder="Nombre del Mood"
                        required
                        className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-md"
                    >
                        Añadir Mood
                    </button>
                </form>
                <h3 className="text-xl font-semibold text-gray-300 mb-3">Moods Existentes:</h3>
                {moods.length > 0 ? (
                    <div className="space-y-2">
                        {moods.map((mood, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-2 bg-gray-700 rounded-md"
                            >
                                <span className="text-gray-300">{mood}</span>
                                <button
                                    onClick={() => onDeleteMood(mood)}
                                    className="text-red-500 hover:text-red-400 text-sm"
                                >
                                    <i className="fas fa-trash-alt"></i> Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8 border border-dashed border-gray-700 rounded-lg">
                        <i className="fas fa-smile-beam fa-2x mb-3 text-gray-500"></i>
                        <h2 className="text-lg font-semibold text-gray-400 mb-1">No hay moods definidos</h2>
                        <p className="text-sm">Añade moods para categorizar tus eventos.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Dashboard; 