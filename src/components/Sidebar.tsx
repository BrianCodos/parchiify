import React from 'react';

interface MenuItem {
  name: string;
  icon: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SidebarProps {
  logo?: React.ReactNode;
  sections: MenuSection[];
  bottomContent?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ logo, sections, bottomContent }) => {
  const MenuItem = ({ name, icon, onClick, isActive }: MenuItem) => (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200
                ${isActive 
                  ? 'bg-accent-primary text-white' 
                  : 'text-dark-text-secondary hover:bg-dark-accent hover:text-dark-text'}`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );

  return (
    <div className="w-64 h-screen bg-dark-secondary flex flex-col">
      {/* Logo */}
      <div className="p-6 flex justify-center">
        {logo || <div className="text-2xl font-bold text-dark-text">Parchify</div>}
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={section.title} className={`px-2 py-4 ${index > 0 ? 'border-t border-dark-accent' : ''}`}>
            <div className="mb-2 px-4 text-sm font-semibold text-dark-text-secondary">
              {section.title}
            </div>
            {section.items.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Content */}
      {bottomContent && (
        <div className="px-2 py-4 border-t border-dark-accent">
          {bottomContent}
        </div>
      )}
    </div>
  );
};

export default Sidebar; 