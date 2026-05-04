import { useState, useEffect, useRef } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Entry, Entries, CalendarGridProps } from '../types';
import { dummy_card_data } from '../dummy_data';
import CalendarCard from './CalendarCard'

export default function CalendarGrid({ entries, setEntries }: CalendarGridProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [shiftDistance, setShiftDistance] = useState(0);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [selectedEntryArray, setSelectedEntryArray] = useState<Entry[]>([]);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const cardStep = 340;

  const getDateKey = (date: Date) => date.toISOString().split('T')[0];
  const normalizeDate = (date: Date) => {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  const getDayDiff = (base: Date, target: Date) => {
    const baseNorm = normalizeDate(base);
    const targetNorm = normalizeDate(target);
    return Math.round((targetNorm.getTime() - baseNorm.getTime()) / (1000 * 60 * 60 * 24));
  };

  const centerOnDate = (date: Date) => {
    const diff = getDayDiff(startDate, date);
    if (diff !== 0) {
      setSlideDirection(diff > 0 ? 'right' : 'left');
      setShiftDistance(Math.abs(diff) * cardStep);

      setTimeout(() => {
        const newDate = new Date(startDate);
        newDate.setDate(newDate.getDate() + diff);
        setStartDate(newDate);
        setSlideDirection(null);
        setShiftDistance(0);
      }, animationDuration);
    }
  };

  const handleCardClick = (date: Date, dayEntryArray: Entry[]) => {
    centerOnDate(date);
    setSelectedDateKey(getDateKey(date));
    setSelectedEntryArray(dayEntryArray);
  };

  const closeDetails = () => setSelectedDateKey(null);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dateInputRef = useRef<HTMLInputElement>(null);

  const displayDays = Array.from({ length: 9 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i - 4);
    return d;
  });

  // --- FIRESTORE REAL-TIME SYNC ---
  useEffect(() => {
    // Array to store cleanup functions for the listeners
    const unsubscribes: (() => void)[] = [];

    displayDays.forEach((date) => {
      const dateKey = date.toISOString().split('T')[0];

      const entriesRef = collection(db, "calendar-days", dateKey, "entries");
      const q = query(entriesRef);

      const unsub = onSnapshot(q, (snapshot) => {
        const dayEntries: any[] = [];
        snapshot.forEach((doc) => {
          dayEntries.push({ id: doc.id, ...doc.data() });
        });

        setEntries((prev) => ({
          ...prev,
          [dateKey]: dayEntries, // Populate the date with the array of user inputs
        }));
      });

      unsubscribes.push(unsub);
    });

    // Cleanup: Stop listening to these 9 days when we move or unmount
    return () => unsubscribes.forEach((unsub) => unsub());
  }, [startDate]);
  // --------------------------------

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

  const animationDuration = 1000;
  const shiftDays = (amount: number) => {
    if (amount === 0) return;
    setSlideDirection(amount > 0 ? 'right' : 'left');
    setShiftDistance(Math.abs(amount) * cardStep);

    setTimeout(() => {
      const newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + amount);
      setStartDate(newDate);
      setSlideDirection(null);
      setShiftDistance(0);
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
        transition: slideDirection ? `transform ${animationDuration}ms cubic-bezier(.63,.07,.25,1)` : 'none',
        transform: slideDirection === 'right'
          ? `translateX(-${shiftDistance}px)`
          : slideDirection === 'left'
            ? `translateX(${shiftDistance}px)`
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

          const dayEntryArray = entries[dateKey] || [];

          return (
            <div key={dateKey}>
              <CalendarCard
                key={dateKey}
                month={months[date.getMonth()]}
                day={date.getDate()}
                dayOfWeek={dayNames[date.getDay()]}
                entryArray={dayEntryArray}
                status={status}
                progress={progress}
                isSelected={selectedDateKey === dateKey}
                onClick={() => handleCardClick(date, dayEntryArray)}
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

      {selectedDateKey && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: 'min(720px, 100%)',
            background: '#fff',
            borderRadius: '20px',
            padding: '24px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.25)'
          }}>
            <button onClick={closeDetails} style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}>×</button>
            <h2 style={{ marginTop: 0 }}>Day details</h2>
            <p style={{ color: '#555', margin: '8px 0 20px' }}>{new Date(selectedDateKey + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {selectedEntryArray.slice(0, 2).map((entry, index) => (
                entry.photoURL ? (
                  <img key={index} src={entry.photoURL} alt={`Entry photo ${index + 1}`} style={{
                    width: '220px',
                    height: '270px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
                  }} />
                ) : (
                  <div key={index} style={{
                    width: '220px',
                    height: '270px',
                    borderRadius: '16px',
                    background: '#f2f2f2',
                    border: '1px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888'
                  }}>
                    No photo
                  </div>
                )
              ))}
            </div>
            <div style={{ marginTop: '24px', display: 'grid', gap: '18px' }}>
              {selectedEntryArray.length > 0 ? selectedEntryArray.map((entry, index) => (
                <div key={index} style={{
                  padding: '16px',
                  background: '#fafafa',
                  borderRadius: '14px',
                  border: '1px solid #eee'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '8px' }}>Reflection {index + 1}</div>
                  <div style={{ color: '#333' }}>{entry.reflection?.h || 'No reflection yet.'}</div>
                </div>
              )) : (
                <div style={{
                  padding: '16px',
                  background: '#fafafa',
                  borderRadius: '14px',
                  border: '1px solid #eee',
                  color: '#666'
                }}>
                  No details available yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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