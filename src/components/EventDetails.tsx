import React from 'react';

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    description: string;
    venue: string;
    date: string;
    moods: string[];
    isFree: boolean;
    price?: number;
    imageUrl?: string;
  };
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
  const formatDescription = (description: string) => {
    return description
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleModalClick}
    >
      <div className="bg-dark-secondary rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header with image */}
        <div className="relative h-64 w-full">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-dark-primary flex items-center justify-center rounded-t-lg">
              <span className="text-6xl">🎉</span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-dark-text">{event.title}</h1>
            <div className="text-2xl font-bold text-dashboard-primary">
              {event.isFree ? 'Free' : `$${event.price?.toFixed(2)}`}
            </div>
          </div>

          {/* Event details grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-dark-text mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-dark-text-secondary text-sm">Date</label>
                  <p className="text-dark-text">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <label className="block text-dark-text-secondary text-sm">Venue</label>
                  <p className="text-dark-text">{event.venue}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-dark-text mb-4">Moods</h2>
              <div className="flex flex-wrap gap-2">
                {event.moods.map((mood) => (
                  <span
                    key={mood}
                    className="px-4 py-2 bg-dashboard-primary text-white rounded-full text-sm"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-dark-text mb-4">About this event</h2>
            <div
              className="prose prose-invert max-w-none text-dark-text-secondary"
              dangerouslySetInnerHTML={{ __html: formatDescription(event.description) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 