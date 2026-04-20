import { useState } from 'react';
import { Entry, Entries, CalendarCardProps } from '../types';
import { dummy_card_data, dummy_entry_data, dummy_entries } from '../dummy_data';
import CalendarCard from './CalendarCard'

interface CalendarGridProps {
  entries: Entries
  updateEntry: (date: string, entryData: Entry) => void
}

export default function CalendarGrid({ entries, updateEntry }: CalendarGridProps) {
  const [startDate, setStartDate] = useState(new Date());

  const shiftDays = (amount: number) => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + amount);
    setStartDate(newDate);
  };

  const displayDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div style={{ position: 'relative', width: '100vw', overflow: 'hidden' }}>
      
      <button onClick={() => shiftDays(-2)} style={navButtonStyle({ left: '50px' })}> ◀ </button>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '32px',
        marginBottom: '16px',
        gap: '50px',
      }}>
        {displayDays.map((date, index) => (
          <CalendarCard 
            key={date.toISOString()}
            {...dummy_card_data} // Your existing dummy data
            month={months[date.getMonth()]}
            day={date.getDate()}
            dayOfWeek={dayNames[date.getDay()]}
          />
        ))}
      </div>

      <button onClick={() => shiftDays(2)} style={navButtonStyle({ right: '50px' })}> ▶ </button>

      {/* Today Button */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setStartDate(new Date())} style={{ width: '100px', height: '50px', cursor: 'pointer' }}>
          Today
        </button>
      </div>
    </div>
  );
}

// Helper for button styling
const navButtonStyle = (pos: object) => ({
  position: 'absolute' as 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  padding: '20px',
  backgroundColor: 'rgba(255,255,255,0.8)',
  border: '1px solid black',
  borderRadius: '50%',
  cursor: 'pointer',
  ...pos
});