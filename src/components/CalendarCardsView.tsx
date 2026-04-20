import { useState, useEffect, useRef } from 'react';
import { Entry, Entries } from '../types';
import { dummy_card_data } from '../dummy_data';
import CalendarCard from './CalendarCard'

interface CalendarGridProps {
  entries: Entries
  updateEntry: (date: string, entryData: Entry) => void
}

export default function CalendarGrid({ entries, updateEntry }: CalendarGridProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateInputRef = useRef<HTMLInputElement>(null);

  const displayDays = Array.from({ length: 9 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i - 4);
    return d;
  });

  const getDayProgress = () => {
    const now = new Date();
    const totalSecondsInDay = 24 * 60 * 60;
    const secondsPassed = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
    return (secondsPassed / totalSecondsInDay) * 100;
  };

  const handleJumpToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    if (selected) {
      setStartDate(new Date(selected + 'T00:00:00'));
    }
  };

  const animationDistance = 690;
  const animationDuration = 750;
  const shiftDays = (amount: number) => {
    setSlideDirection(amount > 0 ? 'right' : 'left');
    setTimeout(() => {
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + amount);
      setStartDate(newDate);
      setSlideDirection(null);
    }, animationDuration);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', overflow: 'hidden' }}>

      <button onClick={() => shiftDays(-2)} style={navButtonStyle({ left: '50px' })}> ◀ </button>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '32px',
        marginBottom: '32px',
        gap: '50px',
        transition: slideDirection ? `transform ${animationDuration}ms ease-in-out` : 'none',
        transform: slideDirection === 'right'
          ? `translateX(-${animationDistance}px)` // length of card + border + padding + gap * 2
          : slideDirection === 'left'
            ? `translateX(${animationDistance}px)`
            : 'translateX(0)',
      }}>
        {displayDays.map((date) => {
          // 1. Generate the same key format used in your dummy_entries
          const dateKey = date.toISOString().split('T')[0];
          const todayKey = new Date().toISOString().split('T')[0];

          const isToday = dateKey === todayKey;
          const isPast = dateKey < todayKey;
          const status = isToday ? 'today' : isPast ? 'past' : 'future';
          const progress = isToday ? getDayProgress() : 0;

          const dayEntry = entries[dateKey];

          return (
            <div key={dateKey}>
              <CalendarCard
                key={dateKey}
                month={months[date.getMonth()]}
                day={date.getDate()}
                dayOfWeek={dayNames[date.getDay()]}
                entry={dayEntry}
                colorRight={dummy_card_data.colorRight}
                status={status}
                progress={progress}
              />
            </div>
          );
        })}
      </div>

      <button onClick={() => shiftDays(2)} style={navButtonStyle({ right: '50px', cursor: 'pointer' })}> ▶ </button>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
        <button onClick={() => setStartDate(new Date())} style={{ width: '100px', height: '50px', cursor: 'pointer' }}>
          Today
        </button>
        <input
          type="date"
          ref={dateInputRef}
          onChange={handleJumpToDate}
          style={{ visibility: 'hidden', width: 0, height: 0, position: 'absolute' }}
        />
        <button onClick={() => dateInputRef.current?.showPicker()} style={{ width: '120px', height: '50px', cursor: 'pointer' }}>
          Jump To Date
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