import { Entry, Entries, CalendarCardProps } from './types';

export const dummy_entry_data: Entry = {
    song: {
        id: '1',
        title: 'Imagine',
        artist: 'John Lennon',
        albumCover: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Malcolm_Todd_cover.png',
        quote: 'You may say I\'m a dreamer, but I\'m not the only one.'
    },
    reflection: {
        id: '1',
        h: 'Today was a good day.'
    },
    color: '#FFD700',
    photoURL: 'https://pbs.twimg.com/media/Fpi4gncaIAA2kIv.jpg',
    trivia: 'Did you know? "Imagine" was inspired by Yoko Ono\'s book of the same name.'
}

export const dummy_card_data: CalendarCardProps = {
    month: 'JAN',
    day: 1,
    dayOfWeek: 'Monday',
    entryArray: [dummy_entry_data], 
    status: 'today'
}

const getDateString = (daysOffset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0]; 
};

export const dummy_entries: Entries = {
    // Today: Just your entry
    [getDateString(0)]: [dummy_entry_data],

    // Yesterday: Both you and a partner (shows how the array version works)
    [getDateString(-1)]: [
        {
            ...dummy_entry_data,
            reflection: { ...dummy_entry_data.reflection, id: '0', h: "Yesterday was great!" },
            color: '#d679b1',
        },
        {
            ...dummy_entry_data,
            color: '#ccffcc',
            reflection: { ...dummy_entry_data.reflection, id: '1', h: "I loved yesterday too!" }
        }
    ],

    // Two days ago: Just your entry
    [getDateString(-2)]: [{
        ...dummy_entry_data,
        color: '#79b1d6',
        photoURL: 'https://i.redd.it/8slfcoxlzsg81.jpg'
    }]
};