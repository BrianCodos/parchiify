import { useState, useMemo } from 'react';

interface UseSidebarNavigationProps {
  area: 'user' | 'dashboard';
  onNavigate?: (route: string) => void;
  currentRoute?: string;
}

export const useSidebarNavigation = ({ area, onNavigate, currentRoute = '' }: UseSidebarNavigationProps) => {
  const [showDashboard, setShowDashboard] = useState(false);

  const sections = useMemo(() => {
    if (area === 'dashboard') {
      return [
        {
          title: 'MAIN MENU',
          items: [
            { 
              name: 'Home',
              icon: '🏠',
              onClick: () => onNavigate?.('home'),
              isActive: currentRoute === 'home'
            },
            { 
              name: 'Events',
              icon: '📅',
              onClick: () => onNavigate?.('events'),
              isActive: currentRoute === 'events'
            },
            { 
              name: 'Mood',
              icon: '😊',
              onClick: () => onNavigate?.('mood'),
              isActive: currentRoute === 'mood'
            },
            { 
              name: 'Promotions',
              icon: '🎯',
              onClick: () => onNavigate?.('promotions'),
              isActive: currentRoute === 'promotions'
            },
            { 
              name: 'Venues',
              icon: '🏢',
              onClick: () => onNavigate?.('venues'),
              isActive: currentRoute === 'venues'
            }
          ]
        },
        {
          title: 'SETTINGS',
          items: [
            { 
              name: 'Profile',
              icon: '👤',
              onClick: () => onNavigate?.('profile'),
              isActive: currentRoute === 'profile'
            },
            { 
              name: 'Settings',
              icon: '⚙️',
              onClick: () => onNavigate?.('settings'),
              isActive: currentRoute === 'settings'
            }
          ]
        }
      ];
    }

    // User area menu
    return [
      {
        title: 'MAIN MENU',
        items: [
          { 
            name: 'Search',
            icon: '🔍',
            onClick: () => onNavigate?.('search'),
            isActive: currentRoute === 'search'
          },
          { 
            name: 'Library',
            icon: '📚',
            onClick: () => onNavigate?.('library'),
            isActive: currentRoute === 'library'
          },
          { 
            name: 'Playlists',
            icon: '🎵',
            onClick: () => onNavigate?.('playlists'),
            isActive: currentRoute === 'playlists'
          }
        ]
      },
      {
        title: 'SETTINGS',
        items: [
          { 
            name: 'Profile',
            icon: '👤',
            onClick: () => onNavigate?.('profile'),
            isActive: currentRoute === 'profile'
          },
          { 
            name: 'Settings',
            icon: '⚙️',
            onClick: () => onNavigate?.('settings'),
            isActive: currentRoute === 'settings'
          },
          { 
            name: 'Help',
            icon: '❓',
            onClick: () => onNavigate?.('help'),
            isActive: currentRoute === 'help'
          }
        ]
      }
    ];
  }, [area, currentRoute, onNavigate]);

  const toggleDashboard = () => setShowDashboard(!showDashboard);

  return {
    sections,
    showDashboard,
    toggleDashboard
  };
}; 