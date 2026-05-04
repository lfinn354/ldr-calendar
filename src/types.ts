export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover?: string;
  quote: string;
}

export interface Reflection {
    id: string;
    h: string;
}

export interface Entry {
  song?: Song
  reflection?: Reflection
  color? : string
  photoURL?: string
  trivia?: string
}

export type Entries = Record<string, Entry[]>

export type View = 'today' | 'calendar' | 'archive' 

export interface CalendarCardProps {
  month: string;
  day: number;
  dayOfWeek: string;
  entryArray?: Entry[];
  status: 'past' | 'today' | 'future';
  progress?: number; // 0 to 1, only relevant for 'today'
}

export interface CalendarGridProps {
  entries: Entries
  setEntries: React.Dispatch<React.SetStateAction<Entries>>; // Changed from updateEntry
}