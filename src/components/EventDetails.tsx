import React from 'react';

interface EventDetailsProps {
  event: {
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
  };
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onClose }) => {
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
      <div className="bg-dark-secondary rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
        {/* Image Section */}
        <div className="w-1/2 relative">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-dark-primary flex items-center justify-center">
              <span className="text-4xl">🎉</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-1/2 p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              {/* Price */}
              <div className={`
                inline-block px-6 py-1 rounded-full font-bold text-2xl
                ${event.isFree 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                  : 'bg-dashboard-accent text-white shadow-lg shadow-dashboard-accent/50'}
                border-2 border-white/20 backdrop-blur-sm 
              `}>
                {event.isFree ? '✨ Free' : `Cover: $${event.price?.toFixed(2)}`}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-dark-text">{event.title}</h1>

              {/* Date and Time */}
              <div className="flex items-center gap-0">
                <span className="text-dashboard-primary text-lg"></span>
                <time className="text-base text-dark-text font-medium tracking-wide px-4 py-1 rounded-full bg-dark-primary border border-dark-accent">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  {' '}at{' '}
                  {event.hour}
                </time>
              </div>
  
              {/* Description */}
              <div>
                <div 
                  className="prose prose-invert max-w-none text-dark-text-secondary text-base mt-10"
                  dangerouslySetInnerHTML={{ 
                    __html: event.description
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }} 
                />
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-dark-text-secondary hover:text-dark-text text-lg"
            >
              ✕
            </button>
          </div>

          <div className="space-y-8">
            {/* Place Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-dark-text">
                <span className="text-base">{event.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-dark-text-secondary">
                <span className="text-lg">📍</span>
                <span className="text-sm">{event.address}</span>
              </div>
            </div>

            {/* Moods Section */}
            <div>
              <h2 className="text-sm font-medium text-dark-text-secondary uppercase tracking-wider mb-3">Moods</h2>
              <div className="flex flex-wrap gap-2">
                {event.moods.map((mood) => (
                  <span
                    key={mood}
                    className="px-3 py-1.5 bg-dashboard-primary text-white rounded-full text-sm shadow-md shadow-dashboard-primary/20"
                  >
                    {mood}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <a 
              href={event.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-base bg-green-500 text-white 
                hover:bg-green-600 transition-all duration-200 shadow-lg shadow-green-500/30
                transform hover:scale-105 float-right"
            >
              <span>🔗</span>
              <span>Contact Link</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails; 