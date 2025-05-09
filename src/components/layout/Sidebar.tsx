import React, { useState } from 'react';
import type { ViewType } from '../../types';
import './Sidebar.scss';

interface SidebarProps {
    setCurrentView: (view: ViewType) => void;
    currentView: ViewType;
    isOpen: boolean;
    onClose: () => void;
    setEditingEvent: (event: any) => void;
    onNewEvent?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    setCurrentView, 
    currentView, 
    isOpen, 
    onClose, 
    setEditingEvent,
    onNewEvent
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    // URL de imagen aleatoria para el avatar
    const avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg";
    
    const handleViewChange = (view: ViewType) => {
        setCurrentView(view);
        setEditingEvent(null);
        if (window.innerWidth < 768) {
            onClose();
        }
    };
    
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNewEventClick = () => {
        if (onNewEvent) {
            onNewEvent();
        }
    };

    // Manejador para ir al perfil
    const handleProfileClick = () => {
        setCurrentView('profile' as ViewType);
        setEditingEvent(null);
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <div className="sidebar-header-content">
                        <div className="sidebar-logo">
                            <h1 className="text-gradient">Parchify</h1>
                        </div>
                        <div className="sidebar-header-actions">
                            <button 
                                onClick={toggleCollapse}
                                className="sidebar-collapse-button"
                            >
                                <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
                            </button>
                            <button 
                                onClick={onClose}
                                className="sidebar-close-button"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Perfil de usuario */}
                <div className="sidebar-profile">
                    <button 
                        className="sidebar-profile-button"
                        onClick={handleProfileClick}
                    >
                        <img src={avatarUrl} alt="Perfil" className="sidebar-avatar" />
                        <span className="sidebar-profile-text">Mi Perfil</span>
                    </button>
                    
                    <div className="sidebar-profile-actions">
                        <button className="sidebar-profile-action-button" onClick={handleProfileClick}>
                            <i className="fas fa-user-edit"></i>
                            <span className="sidebar-label">Editar Perfil</span>
                        </button>
                        <button className="sidebar-profile-action-button">
                            <i className="fas fa-bell"></i>
                            <span className="sidebar-label">Notificaciones</span>
                        </button>
                        <button className="sidebar-profile-action-button">
                            <i className="fas fa-cog"></i>
                            <span className="sidebar-label">Configuración</span>
                        </button>
                    </div>
                </div>

                <div className="sidebar-divider"></div>

                <div className="sidebar-body styled-scrollbar">
                    <nav className="sidebar-nav">
                        <button
                            onClick={handleNewEventClick}
                            className="sidebar-add-button"
                        >
                            <i className="fas fa-plus sidebar-add-icon"></i>
                            <span className="sidebar-label">Nuevo Evento</span>
                        </button>

                        <div className="sidebar-divider"></div>

                        {[
                            { view: 'list-cards', label: 'Descubrir Eventos', icon: 'fas fa-clipboard-list' },
                            { view: 'list-table', label: 'Mis Eventos', icon: 'fas fa-table' },
                            { view: 'calendar', label: 'Calendario', icon: 'fas fa-calendar-alt' },
                            { view: 'saved', label: 'Favoritos', icon: 'fas fa-star' },
                            { view: 'drafts', label: 'Borradores', icon: 'fas fa-file-alt' },
                            { view: 'dashboard', label: 'Moods', icon: 'fas fa-chart-bar' },
                        ].map((item) => (
                            <button
                                key={item.view}
                                onClick={() => handleViewChange(item.view as ViewType)}
                                className={`sidebar-nav-item ${currentView === item.view ? 'active' : ''}`}
                                title={item.label}
                            >
                                <i className={`${item.icon} sidebar-nav-icon ${currentView === item.view ? 'active' : ''}`}></i>
                                <span className="sidebar-label">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 