import React, { useState, useMemo } from 'react';
import { PageHeader } from './common/PageHeader';
import { Table, Column } from './common/Table';

interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
  type: string;
  isActive: boolean;
}

const Venues = () => {
  const [venues] = useState<Venue[]>([
    {
      id: '1',
      name: 'Central Park',
      address: '123 Park Ave, New York',
      capacity: 5000,
      type: 'Outdoor',
      isActive: true,
    }
  ]);

  const headerActions = useMemo(() => [
    {
      label: 'Import Venues',
      icon: '📥',
      onClick: () => console.log('Import venues'),
      variant: 'secondary' as const,
    },
    {
      label: 'Add Venue',
      icon: '➕',
      onClick: () => console.log('Add venue'),
      variant: 'primary' as const,
    }
  ], []);

  const columns = useMemo<Column<Venue>[]>(() => [
    {
      header: 'Name',
      key: 'name',
      className: 'text-dark-text'
    },
    {
      header: 'Address',
      key: 'address',
      className: 'text-dark-text-secondary'
    },
    {
      header: 'Capacity',
      key: 'capacity',
      className: 'text-dark-text',
      render: (venue) => venue.capacity.toLocaleString()
    },
    {
      header: 'Type',
      key: 'type',
      className: 'text-dark-text'
    },
    {
      header: 'Status',
      key: 'isActive',
      render: (venue) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            venue.isActive
              ? 'bg-green-500/20 text-green-500'
              : 'bg-red-500/20 text-red-500'
          }`}
        >
          {venue.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (venue) => (
        <div className="flex items-center gap-3 text-dark-text-secondary">
          <button className="hover:text-dashboard-light transition-colors">✏️</button>
          <button className="hover:text-dashboard-light transition-colors">📊</button>
          {venue.isActive ? (
            <button className="hover:text-red-500 transition-colors">🔒</button>
          ) : (
            <button className="hover:text-green-500 transition-colors">🔓</button>
          )}
        </div>
      )
    }
  ], []);

  return (
    <div className="p-8">
      <PageHeader 
        title="Venues"
        actions={headerActions}
      />

      <Table
        data={venues}
        columns={columns}
        onRowClick={(venue) => console.log('Clicked venue:', venue)}
      />
    </div>
  );
};

export default Venues; 