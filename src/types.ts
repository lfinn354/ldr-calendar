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
    l: string;
    s: string;
}

export interface Trivia {
    id: string;
    question: string;
    answer: string;
}

export interface Entry {
  song?: Song
  reflection?: Reflection
  photoUrl?: string
  trivia?: Trivia[]
}

export type Entries = Record<string, Entry>

export type View = 'today' | 'calendar' | 'archive' 


export interface CalendarCardProps {
  month: string;
  day: number;
  dayOfWeek: string;
  entry?: Entry;
  colorLeft: string;
  colorRight: string;
}