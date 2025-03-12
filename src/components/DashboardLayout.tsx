import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Events from './Events';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
}

const DashboardLayout = () => {
  const [activeView, setActiveView] = useState('home');

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'mood', label: 'Mood', icon: '😊' },
    { id: 'promotions', label: 'Promotions', icon: '🎯' },
    { id: 'venues', label: 'Venues', icon: '🏢' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <Dashboard />;
      case 'events':
        return <Events />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-dark-text mb-4">
              {menuItems.find(item => item.id === activeView)?.label}
            </h1>
            <p className="text-dark-text-secondary">
              This section is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full">
      {/* Dashboard Side Menu */}
      <div className="w-64 bg-dashboard-accent min-h-full flex flex-col">
        {/* Create Event Button */}
        <div className="p-4">
          <button
            onClick={() => setActiveView('events')}
            className="w-full px-4 py-3 bg-dashboard-primary hover:bg-dashboard-hover
                     text-white rounded-lg font-medium transition-colors duration-200
                     flex items-center justify-center gap-2"
          >
            <span>➕</span>
            Create Event
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                        transition-colors duration-200 font-medium
                        ${
                          activeView === item.id
                            ? 'bg-dashboard-primary text-white'
                            : 'text-dark-text-secondary hover:bg-dashboard-secondary hover:text-white'
                        }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Preview */}
        <div className="p-4 border-t border-dashboard-secondary">
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg
                        text-dark-text-secondary hover:bg-dashboard-secondary hover:text-white
                        transition-colors duration-200 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-dashboard-primary flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
            <div className="flex-1">
              <div className="font-medium">Admin User</div>
              <div className="text-xs opacity-75">admin@parchify.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardLayout; 