import React from 'react';

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

interface PageHeaderProps {
  title: string;
  actions?: ActionButton[];
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  actions = [],
  className = '',
}) => {
  const getButtonStyles = (variant: ActionButton['variant'] = 'primary') => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2";
    
    switch (variant) {
      case 'secondary':
        return `${baseStyles} bg-dark-accent hover:bg-dark-accent/80 text-dark-text`;
      case 'danger':
        return `${baseStyles} bg-red-500 hover:bg-red-600 text-white`;
      case 'primary':
      default:
        return `${baseStyles} bg-dashboard-primary hover:bg-dashboard-hover text-white`;
    }
  };

  return (
    <div className={`flex justify-between items-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-dark-text">{title}</h1>
      {actions.length > 0 && (
        <div className="flex items-center gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${getButtonStyles(action.variant)} ${action.className || ''}`}
            >
              {action.icon && <span>{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 