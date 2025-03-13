export const PLACES = ['Central Park', 'City Hall', 'Beach Club', 'Art Gallery'] as const;
export const MOODS = ['party', 'cultural', 'family', 'romantic', 'adventure'] as const;

export type Place = typeof PLACES[number];
export type Mood = typeof MOODS[number]; 