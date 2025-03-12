import React from 'react';
import Dashboard from './Dashboard';
import Events from './Events';
import Moods from './Moods';

interface DashboardLayoutProps {
  activeView: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ activeView }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <Dashboard />;
      case 'events':
        return <Events />;
      case 'mood':
        return <Moods />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-dark-text mb-4">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h1>
            <p className="text-dark-text-secondary">
              This section is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1">
      {renderContent()}
    </div>
  );
};

export default DashboardLayout; 