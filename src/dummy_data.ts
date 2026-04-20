import { Entry, Entries, CalendarCardProps } from './types';

export const dummy_card_data: CalendarCardProps = {
    month: 'JAN',
    day: 1,
    dayOfWeek: 'Monday',
    verticalImages: [
        'https://via.placeholder.com/100x150?text=Vertical+1',
        'https://via.placeholder.com/100x150?text=Vertical+2'
    ],
    albumCovers: [
        'https://via.placeholder.com/100x100?text=Album+1',
        'https://via.placeholder.com/100x100?text=Album+2'
    ],
    colorLeft: '#ffcccc',
    colorRight: '#ccffcc'
}

export const dummy_entry_data: Entry = {
    song: {
        id: '1',
        title: 'Imagine',
        artist: 'John Lennon',
        albumCover: 'https://via.placeholder.com/100x100?text=Album+Cover',
        quote: 'You may say I\'m a dreamer, but I\'m not the only one.'
    },
    reflection: {
        id: '1',
        h: 'Today was a good day.',
        l: 'I wish I had gone for a walk.',
        s: 'I learned that sometimes it\'s okay to just relax and enjoy the moment.'
    },
    photoUrl: 'https://via.placeholder.com/200x150?text=Photo',
    trivia: [
        {
            id: '1',
            question: 'What is the capital of France?',
            answer: 'Paris'
        },
        {
            id: '2',
            question: 'Who wrote "To Kill a Mockingbird"?',
            answer: 'Harper Lee'
        }
    ]
}

const getDateString = (daysOffset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0]; 
};

export const dummy_entries: Entries = {
    [getDateString(0)]: dummy_entry_data,
    [getDateString(-1)]: {
        ...dummy_entry_data,
        reflection: {
            ...dummy_entry_data.reflection,
            h: "Yesterday was great!"
        }
    } as Entry, // Casting here tells TS "I know this fits the interface"
    [getDateString(1)]: {
        ...dummy_entry_data,
        photoUrl: 'https://via.placeholder.com/200x150?text=Tomorrow'
    }
};