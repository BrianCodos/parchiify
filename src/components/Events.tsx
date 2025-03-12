import React, { useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  moods: string[];
  price: number;
}

interface EventFormData {
  title: string;
  description: string;
  venue: string;
  date: string;
  moods: string[];
  price: string;
}

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Summer Music Festival',
      description: 'A **fantastic** music festival with *amazing* artists',
      venue: 'Central Park',
      date: '2024-07-15',
      moods: ['party', 'cultural'],
      price: 49.99,
    },
  ]);

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    venue: '',
    date: '',
    moods: [],
    price: '',
  });

  // Sample data (in a real app, these would come from your backend)
  const venues = ['Central Park', 'City Hall', 'Beach Club', 'Art Gallery'];
  const availableMoods = ['party', 'cultural', 'family', 'romantic', 'adventure'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
    };
    setEvents([...events, newEvent]);
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      venue: '',
      date: '',
      moods: [],
      price: '',
    });
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const formatDescription = (description: string) => {
    return description
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-dark-text">Events</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-dashboard-primary hover:bg-dashboard-hover text-white
                   rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <span>➕</span>
          Create Event
        </button>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-dark-secondary rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark-text">Create New Event</h2>
              <button
                onClick={() => setShowForm(false)}
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
                         focus:outline-none focus:ring-2 focus:ring-dashboard-primary"
                  required
                />
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
                         focus:outline-none focus:ring-2 focus:ring-dashboard-primary h-32"
                  required
                />
              </div>

              {/* Venue */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Venue</label>
                <select
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-dashboard-primary"
                  required
                >
                  <option value="">Select a venue</option>
                  {venues.map((venue) => (
                    <option key={venue} value={venue}>
                      {venue}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-dashboard-primary"
                  required
                />
              </div>

              {/* Moods */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Moods</label>
                <div className="flex flex-wrap gap-2">
                  {availableMoods.map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => {
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

              {/* Price */}
              <div>
                <label className="block text-dark-text-secondary mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 bg-dark-primary text-dark-text rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-dashboard-primary"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 text-dark-text-secondary hover:text-dark-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-dashboard-primary hover:bg-dashboard-hover
                         text-white rounded-lg transition-colors duration-200"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Events Table */}
      <div className="bg-dark-secondary rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-dashboard-accent text-dark-text text-left">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Venue</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Moods</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-dark-accent">
                <td className="px-6 py-4 text-dark-text">{event.title}</td>
                <td className="px-6 py-4 text-dark-text-secondary">
                  <div dangerouslySetInnerHTML={{ __html: formatDescription(event.description) }} />
                </td>
                <td className="px-6 py-4 text-dark-text">{event.venue}</td>
                <td className="px-6 py-4 text-dark-text">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
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
                </td>
                <td className="px-6 py-4 text-dark-text">
                  ${event.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-dark-text-secondary">
                    <button className="hover:text-dashboard-light transition-colors">👁️</button>
                    <button className="hover:text-dashboard-light transition-colors">✏️</button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="hover:text-red-500 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events; 