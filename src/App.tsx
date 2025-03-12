import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import DashboardLayout from './components/DashboardLayout';
import { NotificationProvider } from './context/NotificationContext';
import { useSidebarNavigation } from './hooks/useSidebarNavigation';

function App() {
  const [isInDashboard, setIsInDashboard] = useState(false);
  const [currentDashboardView, setCurrentDashboardView] = useState('home');

  const { sections, showDashboard, toggleDashboard } = useSidebarNavigation({
    area: isInDashboard ? 'dashboard' : 'user',
    currentRoute: isInDashboard ? currentDashboardView : 'search',
    onNavigate: (route) => {
      if (isInDashboard) {
        setCurrentDashboardView(route);
      }
    }
  });

  const dashboardButton = (
    <button
      onClick={() => {
        toggleDashboard();
        setIsInDashboard(!isInDashboard);
        if (!isInDashboard) {
          setCurrentDashboardView('home');
        }
      }}
      className="w-full px-6 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg
               transition-colors duration-200 font-medium"
    >
      {isInDashboard ? 'Back to Search' : 'Dashboard'}
    </button>
  );

  return (
    <NotificationProvider>
      <div className="flex w-screen h-screen overflow-hidden bg-dark-primary">
        <Sidebar 
          sections={sections}
          bottomContent={
            <div className="px-2">
              {dashboardButton}
            </div>
          }
        />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            {isInDashboard ? (
              <DashboardLayout activeView={currentDashboardView} />
            ) : (
              <MainContent />
            )}
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}

export default App; 