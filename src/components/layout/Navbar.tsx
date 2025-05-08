import React from 'react';
import './Navbar.css';

interface NavbarProps {
    onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-start">
                    <button
                        onClick={onToggleSidebar}
                        className="navbar-toggle"
                        aria-label="Toggle sidebar"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                    <div className="navbar-logo">
                        <h1 className="text-gradient">
                            Parchify
                        </h1>
                    </div>
                </div>
                
                <div className="navbar-end">
                    <div className="navbar-item">
                        <button className="navbar-button">
                            <i className="fas fa-bell text-xl"></i>
                        </button>
                    </div>
                    <div className="navbar-item">
                        <button className="navbar-button">
                            <i className="fas fa-cog text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 