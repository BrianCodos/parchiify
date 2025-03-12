import React from 'react';

const Sidebar = () => {
  const primaryMenu = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Library', icon: '📚' },
    { name: 'Playlists', icon: '🎵' },
  ];

  const secondaryMenu = [
    { name: 'Settings', icon: '⚙️' },
    { name: 'Help', icon: '❓' },
    { name: 'Profile', icon: '👤' },
  ];

  const MenuItem = ({ name, icon }: { name: string; icon: string }) => (
    <div className="flex items-center space-x-3 px-4 py-3 text-dark-text-secondary hover:bg-dark-accent hover:text-dark-text rounded-lg cursor-pointer transition-colors duration-200">
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );

  return (
    <div className="w-1/5 max-w-[250px] h-screen bg-dark-secondary flex flex-col">
      {/* Logo */}
      <div className="p-6 flex justify-center">
        <div className="text-2xl font-bold text-dark-text">Parchify</div>
      </div>

      {/* Primary Menu */}
      <div className="px-2 py-4 flex-1">
        <div className="mb-2 px-4 text-sm font-semibold text-dark-text-secondary">MAIN MENU</div>
        {primaryMenu.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </div>

      {/* Secondary Menu */}
      <div className="px-2 py-4 border-t border-dark-accent">
        <div className="mb-2 px-4 text-sm font-semibold text-dark-text-secondary">SETTINGS</div>
        {secondaryMenu.map((item) => (
          <MenuItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 