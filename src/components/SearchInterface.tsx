import React, { useState } from 'react';

interface MoodFilter {
  id: string;
  label: string;
}

const SearchInterface = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const moodFilters: MoodFilter[] = [
    { id: 'eat', label: 'Eat' },
    { id: 'party', label: 'Party' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'family', label: 'Family' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'adventure', label: 'Adventure' },
  ];

  const toggleMood = (moodId: string) => {
    setSelectedMoods(prev =>
      prev.includes(moodId)
        ? prev.filter(id => id !== moodId)
        : [...prev, moodId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 px-4">
      {/* Headlines */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-dark-text mb-4">
          Discover Your Next Experience
        </h1>
        <p className="text-xl text-dark-text-secondary">
          Find the perfect place based on your mood and preferences
        </p>
      </div>

      {/* Search Section */}
      <div className="relative mb-12">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for places..."
          className="w-full px-6 py-4 bg-dark-secondary text-dark-text rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-accent-primary
                   placeholder-dark-text-secondary"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2
                   bg-accent-primary hover:bg-accent-hover rounded-lg
                   transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Mood Filters */}
      <div>
        <h2 className="text-dark-text-secondary font-semibold mb-4 uppercase text-sm">
          Mood
        </h2>
        <div className="flex flex-wrap gap-3">
          {moodFilters.map((mood) => (
            <button
              key={mood.id}
              onClick={() => toggleMood(mood.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${
                  selectedMoods.includes(mood.id)
                    ? 'bg-accent-primary text-white'
                    : 'bg-dark-secondary text-dark-text-secondary hover:bg-dark-accent'
                }`}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface; 