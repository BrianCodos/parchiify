import React from 'react';

const StatCard = ({ title, value, trend }: { title: string; value: string; trend?: 'up' | 'down' }) => (
  <div className="bg-dark-secondary p-6 rounded-lg border-l-4 border-dashboard-primary">
    <h3 className="text-dark-text-secondary text-sm font-semibold mb-2">{title}</h3>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold text-dark-text">{value}</span>
      {trend && (
        <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? '↑ 12%' : '↓ 8%'}
        </span>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-text mb-2">Dashboard Overview</h1>
        <p className="text-dark-text-secondary">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Places" value="1,234" trend="up" />
        <StatCard title="Active Users" value="856" trend="up" />
        <StatCard title="Reviews" value="4,378" trend="down" />
        <StatCard title="Avg. Rating" value="4.8" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Places */}
        <div className="bg-dark-secondary rounded-lg p-6">
          <h2 className="text-xl font-semibold text-dark-text mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dashboard-light"></span>
            Recent Places
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-dark-accent rounded-lg transition-colors">
                <div className="w-12 h-12 bg-dashboard-accent rounded-lg flex items-center justify-center">
                  <span className="text-lg">🏠</span>
                </div>
                <div>
                  <h3 className="text-dark-text font-medium">Place Name {i}</h3>
                  <p className="text-dark-text-secondary text-sm">Added 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-dark-secondary rounded-lg p-6">
          <h2 className="text-xl font-semibold text-dark-text mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-dashboard-light"></span>
            Recent Reviews
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 p-3 hover:bg-dark-accent rounded-lg transition-colors">
                <div className="w-12 h-12 bg-dashboard-accent rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <h3 className="text-dark-text font-medium">User {i}</h3>
                  <p className="text-dark-text-secondary text-sm">Great place! Would definitely recommend...</p>
                  <div className="flex items-center gap-1 mt-1">
                    {"⭐".repeat(5)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 