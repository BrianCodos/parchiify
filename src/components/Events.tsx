import React, { useState, useMemo } from 'react';
import { useNotification } from '../context/NotificationContext';
import { PLACES, MOODS } from '../constants/events';
import { Table, Column } from './common/Table';
import { PageHeader } from './common/PageHeader';
import EventDetails from './EventDetails';

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  date: string;
  hour: string;
  contact: string;
  moods: string[];
  isFree: boolean;
  price?: number;
  imageUrl?: string;
}

interface EventFormData {
  title: string;
  description: string;
  venue: string;
  address: string;
  date: string;
  hour: string;
  contact: string;
  moods: string[];
  isFree: boolean;
  price: string;
  imageUrl?: string;
}

const Events = () => {
  const { showNotification } = useNotification();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Summer Music Festival',
      description: 'Join us for an **unforgettable evening** of live music and entertainment at our Summer Music Festival! Experience the magic as *talented artists* take the stage, performing a diverse mix of genres from indie rock to electronic beats. The festival features multiple stages, food vendors, art installations, and interactive experiences that will create memories to last a lifetime. Bring your friends and immerse yourself in the vibrant atmosphere of music, culture, and community.',
      venue: 'Central Park',
      address: '59th to 110th Street, New York, NY 10022',
      date: '2024-07-15',
      hour: '14:00',
      contact: 'https://twitter.com/summerfest',
      moods: ['party', 'cultural'],
      isFree: false,
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1080&h=1350&fit=crop',
    },
  ]);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    venue: '',
    address: '',
    date: '',
    hour: '',
    contact: '',
    moods: [],
    isFree: false,
    price: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData,
      price: formData.isFree ? undefined : parseFloat(formData.price),
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      venue: '',
      address: '',
      date: '',
      hour: '',
      contact: '',
      moods: [],
      isFree: false,
      price: '',
      imageUrl: '',
    });
    showNotification('success', 'Event created successfully!');
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setShowDeleteConfirm(null);
    showNotification('error', 'Event deleted successfully');
  };

  const formatDescription = (description: string) => {
    // First apply markdown formatting
    const formattedText = description
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Then truncate to 30 words for display
    const words = formattedText.split(/\s+/);
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + ' ...';
    }
    return formattedText;
  };

  const columns = useMemo<Column<Event>[]>(() => [
    {
      header: 'Image',
      key: 'imageUrl',
      className: 'w-24',
      render: (event) => (
        <div className="w-20 h-20 rounded-lg overflow-hidden">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-dark-primary flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Title',
      key: 'title',
      className: 'text-dark-text'
    },
    {
      header: 'Description',
      key: 'description',
      className: 'text-dark-text-secondary',
      render: (event) => (
        <div dangerouslySetInnerHTML={{ __html: formatDescription(event.description) }} />
      )
    },
    {
      header: 'Place',
      key: 'venue',
      className: 'text-dark-text'
    },
    {
      header: 'Address',
      key: 'address',
      className: 'text-dark-text-secondary text-sm',
      render: (event) => (
        <div className="flex items-center gap-1">
          <span>📍</span>
          <span>{event.address}</span>
        </div>
      )
    },
    {
      header: 'Date & Time',
      key: 'date',
      className: 'text-dark-text',
      render: (event) => (
        <div className="space-y-1">
          <div>{new Date(event.date).toLocaleDateString()}</div>
          <div className="text-dark-text-secondary text-sm">{event.hour}</div>
        </div>
      )
    },
    {
      header: 'Contact',
      key: 'contact',
      className: 'text-dark-text',
      render: (event) => (
        <a 
          href={event.contact}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-green-500 hover:text-green-400 hover:underline"
        >
          Contact Link
        </a>
      )
    },
    {
      header: 'Moods',
      key: 'moods',
      render: (event) => (
        <div className="flex flex-wrap gap-1">
          {event.moods.map((mood) => (
            <span
              key={mood}
              className="px-2 py-1 bg-dashboard-primary text-white text-xs rounded-full"
            >
              {mood}
            </span>
          ))}
        </div>
      )
    },
    {
      header: 'Price',
      key: 'price',
      className: 'text-dark-text',
      render: (event) => event.isFree ? 'Free' : `$${event.price?.toFixed(2)}`
    },
    {
      header: 'Actions',
      key: 'id' as keyof Event,
      render: (event) => (
        <div className="flex items-center gap-3 text-dark-text-secondary">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(event);
            }}
            className="hover:text-green-500 transition-colors"
          >
            👁️
          </button>
          <button className="hover:text-green-500 transition-colors">✏️</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(event.id);
            }}
            className="hover:text-red-500 transition-colors"
          >
            🗑️
          </button>
        </div>
      )
    }
  ], []);

  const headerActions = useMemo(() => [
    {
      label: 'Create Event',
      icon: '➕',
      onClick: () => setShowForm(true),
    }
  ], []);

  const handleModalClick = (e: React.MouseEvent, onClose: () => void) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="p-8">
      <PageHeader 
        title="Events"
        actions={headerActions}
      />

      {/* Event Form Modal */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => handleModalClick(e, () => setShowForm(false))}
        >
          <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-text">Create New Event</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowForm(false);
                }}
                className="text-dark-text-secondary hover:text-dark-text"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                  <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden">
                    <img
                      src={formData.imageUrl}
                      alt="Event preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-dark-text-secondary mb-2">
                  Description (use ** for bold and * for italic)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                  required
                />
              </div>

              {/* Place field */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Place</label>
                <select
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select a place</option>
                  {PLACES.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address field */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter the full address"
                  required
                />
              </div>

              {/* Date and Hour fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-text-secondary mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-dark-text-secondary mb-2">Hour</label>
                  <input
                    type="time"
                    value={formData.hour}
                    onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {/* Contact Link */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Contact Link</label>
                <div className="space-y-1">
                  <input
                    type="url"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://twitter.com/youraccount"
                    required
                  />
                  <p className="text-dark-text-secondary text-sm">Add your contact link (social media, website, etc.)</p>
                </div>
              </div>

              {/* Moods */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Moods</label>
                <div className="flex flex-wrap gap-2">
                  {MOODS.map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newMoods = formData.moods.includes(mood)
                          ? formData.moods.filter((m) => m !== mood)
                          : [...formData.moods, mood];
                        setFormData({ ...formData, moods: newMoods });
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                              ${
                                formData.moods.includes(mood)
                                  ? 'bg-dashboard-primary text-white'
                                  : 'bg-dark-primary text-dark-text-secondary hover:bg-dark-accent'
                              }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={formData.isFree}
                    onChange={(e) => {
                      e.stopPropagation();
                      setFormData({
                        ...formData,
                        isFree: e.target.checked,
                        price: e.target.checked ? '' : formData.price
                      });
                    }}
                    className="w-4 h-4 text-green-500 bg-dark-primary border-dark-accent rounded focus:ring-green-500"
                  />
                  <label htmlFor="isFree" className="ml-2 text-dark-text-secondary">
                    This is a free event
                  </label>
                </div>

                {!formData.isFree && (
                  <div>
                    <label className="block text-dark-text-secondary mb-2">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, price: e.target.value });
                      }}
                      className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-green-500"
                      required={!formData.isFree}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowForm(false);
                  }}
                  className="px-6 py-2 text-dark-text-secondary hover:text-dark-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600
                         text-white rounded-lg transition-colors duration-200"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => handleModalClick(e, () => setShowDeleteConfirm(null))}
        >
          <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-dark-text mb-4">Confirm Delete</h2>
            <p className="text-dark-text-secondary mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 text-dark-text-secondary hover:text-dark-text"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(showDeleteConfirm);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <Table
        data={events}
        columns={columns}
        onRowClick={(event) => setSelectedEvent(event)}
      />
    </div>
  );
};

export default Events; 