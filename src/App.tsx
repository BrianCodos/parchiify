import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-dark-primary">
      {!showDashboard && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Button */}
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="px-6 py-2 bg-accent-primary hover:bg-accent-hover text-white rounded-lg
                     transition-colors duration-200 font-medium"
          >
            {showDashboard ? 'Back to Search' : 'Dashboard'}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {showDashboard ? <DashboardLayout /> : <MainContent />}
        </div>
      </div>
    </div>
  );
}

export default App; 