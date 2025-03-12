import React, { useState, useMemo } from 'react';
import { useNotification } from '../context/NotificationContext';
import { PageHeader } from './common/PageHeader';
import { Table, Column } from './common/Table';

interface Mood {
  id: string;
  name: string;
  description: string;
  icon: string;
  eventsCount: number;
  isActive: boolean;
  color: string;
}

interface MoodFormData {
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

const MoodForm: React.FC<{
  onSubmit: (data: MoodFormData) => void;
  onClose: () => void;
}> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<MoodFormData>({
    name: '',
    description: '',
    icon: '🎉',
    color: '#6d28d9',
    isActive: true,
  });

  const icons = [
    '🎉', // party
    '🎭', // cultural/theater
    '👨‍👩‍👧‍👦', // family
    '🎨', // art
    '🎸', // music
    '🎮', // gaming
    '🎬', // cinema
    '📚', // educational
    '⚽️', // sports
    '🍽️', // dining
    '🎪', // circus/carnival
    '🏺', // historical
    '🎤', // concert
    '🧘‍♀️', // wellness
    '🌿', // nature
    '🏃‍♂️', // active/fitness
    '🎯', // competitive
    '🎹', // classical
    '🌙', // night life
    '🤝', // networking
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark-text">Create New Mood</h2>
          <button
            onClick={onClose}
            className="text-dark-text-secondary hover:text-dark-text"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-dark-text mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
              required
            />
          </div>

          <div>
            <label className="block text-dark-text mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-dark-primary text-dark-text rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-dark-text mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`w-10 h-10 text-xl flex items-center justify-center rounded ${
                    formData.icon === icon
                      ? 'bg-dashboard-accent text-white'
                      : 'bg-dark-primary text-dark-text'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-dark-text mb-2">Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-dark-text-secondary">{formData.color}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded border-dark-text-secondary"
            />
            <label className="text-dark-text">Active</label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-dashboard-accent hover:bg-dashboard-light text-white rounded-lg"
            >
              Create Mood
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Moods = () => {
  const { showNotification } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const [moods, setMoods] = useState<Mood[]>([
    {
      id: '1',
      name: 'Party',
      description: 'High-energy events with music and dancing',
      icon: '🎉',
      eventsCount: 15,
      isActive: true,
      color: '#6d28d9', // purple-700
    },
    {
      id: '2',
      name: 'Cultural',
      description: 'Art exhibitions, museums, and cultural experiences',
      icon: '🎭',
      eventsCount: 8,
      isActive: true,
      color: '#4f46e5', // indigo-600
    },
    {
      id: '3',
      name: 'Family',
      description: 'Family-friendly activities and entertainment',
      icon: '👨‍👩‍👧‍👦',
      eventsCount: 12,
      isActive: true,
      color: '#059669', // emerald-600
    }
  ]);

  const handleDelete = (id: string) => {
    const moodToDelete = moods.find(mood => mood.id === id);
    if (moodToDelete && moodToDelete.eventsCount > 0) {
      showNotification('warning', `This mood has ${moodToDelete.eventsCount} associated events. Deleting it will affect these events.`);
    }
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id: string) => {
    const moodToDelete = moods.find(mood => mood.id === id);
    setMoods(moods.filter(mood => mood.id !== id));
    setShowDeleteConfirm(null);
    showNotification('error', `Mood "${moodToDelete?.name}" has been deleted`);
  };

  const handleCreate = (formData: MoodFormData) => {
    const newMood: Mood = {
      id: Date.now().toString(),
      ...formData,
      eventsCount: 0,
    };
    setMoods([...moods, newMood]);
    setShowForm(false);
    showNotification('success', `Mood "${formData.name}" created successfully`);
  };

  const headerActions = useMemo(() => [
    {
      label: 'Create Mood',
      icon: '➕',
      onClick: () => setShowForm(true),
    }
  ], []);

  const columns = useMemo<Column<Mood>[]>(() => [
    {
      header: 'Mood',
      key: 'name',
      render: (mood) => (
        <div className="flex items-center gap-3">
          <span className="text-xl">{mood.icon}</span>
          <span className="text-dark-text font-medium">{mood.name}</span>
        </div>
      )
    },
    {
      header: 'Description',
      key: 'description',
      className: 'text-dark-text-secondary'
    },
    {
      header: 'Events',
      key: 'eventsCount',
      render: (mood) => (
        <span className="px-3 py-1 bg-dashboard-accent text-dark-text rounded-full text-sm">
          {mood.eventsCount}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'isActive',
      render: (mood) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            mood.isActive
              ? 'bg-green-500/20 text-green-500'
              : 'bg-red-500/20 text-red-500'
          }`}
        >
          {mood.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Color',
      key: 'color',
      render: (mood) => (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: mood.color }}
          />
          <span className="text-dark-text-secondary">{mood.color}</span>
        </div>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (mood) => (
        <div className="flex items-center gap-3 text-dark-text-secondary">
          <button className="hover:text-dashboard-light transition-colors">✏️</button>
          <button className="hover:text-dashboard-light transition-colors">📊</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(mood.id);
            }}
            className="hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="p-8">
      <PageHeader 
        title="Moods"
        actions={headerActions}
      />

      {showForm && (
        <MoodForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark-text mb-4">Confirm Delete</h2>
            <p className="text-dark-text-secondary mb-6">
              Are you sure you want to delete this mood? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Table
        data={moods}
        columns={columns}
        onRowClick={(mood) => console.log('Clicked mood:', mood)}
      />
    </div>
  );
};

export default Moods; 