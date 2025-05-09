import React, { useState } from 'react';
import type { MoodHandlers } from '../../types';
import './Dashboard.css';

interface DashboardProps extends MoodHandlers {
    moods: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ moods, onAddMood, onDeleteMood }) => {
    const [newMood, setNewMood] = useState<string>('');

    const handleAddMood = () => {
        if (newMood.trim() && !moods.includes(newMood.trim())) {
            onAddMood(newMood.trim());
            setNewMood('');
        } else if (moods.includes(newMood.trim())) {
            alert('Este mood ya existe.');
        }
    };

    const handleDeleteMood = (mood: string) => {
        onDeleteMood(mood);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddMood();
        }
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            <p className="dashboard-subtitle">Gestiona la configuración de tu aplicación</p>
            
            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <i className="fas fa-sliders-h dashboard-section-icon"></i>
                    <h3 className="dashboard-section-title">Gestionar Moods</h3>
                </div>
                <p className="dashboard-section-description">
                    Añade o elimina moods para clasificar tus eventos.
                </p>
                
                <div className="mood-form">
                    <input 
                        type="text"
                        placeholder="Nuevo mood..."
                        value={newMood}
                        onChange={(e) => setNewMood(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="mood-input"
                    />
                    <button 
                        onClick={handleAddMood}
                        className="mood-add-btn"
                    >
                        <i className="fas fa-plus"></i>
                        Añadir
                    </button>
                </div>
                
                <div className="mood-list">
                    {moods.map((mood) => (
                        <div key={mood} className="mood-item">
                            <span className="mood-name">{mood}</span>
                            <button
                                onClick={() => handleDeleteMood(mood)}
                                className="mood-delete-btn"
                                aria-label="Eliminar mood"
                                title="Eliminar mood"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <i className="fas fa-chart-line dashboard-section-icon"></i>
                    <h3 className="dashboard-section-title">Estadísticas</h3>
                </div>
                <p className="dashboard-section-description">
                    Aquí encontrarás estadísticas sobre tus eventos.
                </p>
                <div className="stats-container">
                    <div className="stats-icon">
                        <i className="fas fa-chart-bar"></i>
                    </div>
                    <p className="stats-text">Las estadísticas estarán disponibles pronto.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 