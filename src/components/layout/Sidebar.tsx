import React from 'react';
import type { ViewType } from '../../types';
import './Sidebar.scss';

interface SidebarProps {
    setCurrentView: (view: ViewType) => void;
    currentView: ViewType;
    isOpen: boolean;
    onClose: () => void;
    setEditingEvent: (event: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentView, currentView, isOpen, onClose, setEditingEvent }) => {
    const handleViewChange = (view: ViewType) => {
        setCurrentView(view);
        setEditingEvent(null);
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <div className="sidebar-header-content">
                        <h2>Menú</h2>
                        <button 
                            onClick={onClose}
                            className="sidebar-close-button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div className="sidebar-body styled-scrollbar">
                    <nav className="sidebar-nav">
                        <button
                            onClick={() => handleViewChange('form')}
                            className="sidebar-add-button"
                        >
                            <i className="fas fa-plus sidebar-add-icon"></i>
                            Nuevo Evento
                        </button>

                        <div className="sidebar-divider"></div>

                        {[
                            { view: 'list-cards', label: 'DESPARCHATE', icon: 'fas fa-clipboard-list' },
                            { view: 'list-table', label: 'Vista de Tabla', icon: 'fas fa-table' },
                            { view: 'calendar', label: 'Calendario', icon: 'fas fa-calendar-alt' },
                            { view: 'saved', label: 'Favoritos', icon: 'fas fa-star' },
                            { view: 'drafts', label: 'Borradores', icon: 'fas fa-file-alt' },
                            { view: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-bar' },
                        ].map((item) => (
                            <button
                                key={item.view}
                                onClick={() => handleViewChange(item.view as ViewType)}
                                className={`sidebar-nav-item ${currentView === item.view ? 'active' : ''}`}
                            >
                                <i className={`${item.icon} sidebar-nav-icon ${currentView === item.view ? 'active' : ''}`}></i>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 