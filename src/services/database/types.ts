export interface Event {
  id: string;
  title: string;
  description: string;
  venue: string;
  date: string;
  moods: string[];
  price: number;
  createdAt: number;
  updatedAt: number;
}

export interface DatabaseService {
  initialize(): Promise<void>;
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | null>;
  createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event>;
  updateEvent(id: string, event: Partial<Omit<Event, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
} 