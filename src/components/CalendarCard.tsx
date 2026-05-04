import React from 'react';
import { CalendarCardProps } from '../types';

const CalendarCard: React.FC<CalendarCardProps> = ({ month, day, dayOfWeek, entryArray = [], status, progress = 0 }) => {

  const PlaceholderBox = ({ w, h, type }: { w: string, h: string, type: string }) => (
    <div style={{
      width: w,
      height: h,
      backgroundColor: status === 'future' ? 'transparent' : '#e0e0e0',
      border: status === 'future' ? '2px dashed #ccc' : '1px solid #ccc',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '12px',
      boxSizing: 'border-box'
    }}>
      {status !== 'future' && `No ${type}`}
    </div>
  );

  const person1 = entryArray[0];
  const person2 = entryArray[1];

  console.log('Rendering CalendarCard with first entry:', entryArray[0]);

  const colorLeft = person1?.color || '#e0e0e0'; // Default to light grey if no color provided
  const colorRight = person2?.color || '#e0e0e0'; // Default to light grey if no color provided
  // cant store photos and albums here right now since stored in DB as strings and placeholder box is not a string

  // Styles for consistency
  const imgStyle = (w: string, h: string) => ({
    width: w,
    height: h,
    objectFit: 'cover' as const,
    borderRadius: '6px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.5)'
  });

  let outerBackground = '#000'; // Default Past
  if (status === 'today') {
    outerBackground = `conic-gradient(#FFD700 ${progress}%, #ffffff 0%)`;
  } else if (status === 'future') {
    outerBackground = '#f9f9f9';
  }

  const innerBackground = status === 'future'
    ? '#f9f9f9'
    : `linear-gradient(to right, ${colorLeft} 45%, ${colorRight} 55%)`;

  return (
    <div style={{
      width: '280px',
      height: '405px',
      flexShrink: 0,
      borderRadius: '14px',
      padding: '5px',
      background: outerBackground,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.5s ease',
    }}>

      <div style={{
        width: '275px',
        height: '400px',
        borderRadius: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        background: innerBackground,
        position: 'relative',
        boxSizing: 'border-box'
      }}>

        {/* Date Header */}
        <div style={{ display: 'flex', alignItems: 'start', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', marginTop: '10px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{month}</div>
            <div style={{ fontSize: '22px' }}>{day}</div>
          </div>
        </div>

        <div style={{ fontSize: '24px', margin: '10px 0', marginBottom: '15px' }}>
          {dayOfWeek}
        </div>

        {/* Row 1: Photos */}
        <div style={{ display: 'flex', gap: '35px', marginBottom: '20px' }}>
          {person1?.photoUrl ? (
            <img src={person1.photoUrl} alt="P1" style={imgStyle('100px', '150px')} />
          ) : (
            <PlaceholderBox w="100px" h="150px" type="Photo" />
          )}

          {person2?.photoUrl ? (
            <img src={person2.photoUrl} alt="P2" style={imgStyle('100px', '150px')} />
          ) : (
            <PlaceholderBox w="100px" h="150px" type="Photo" />
          )}
        </div>

        {/* Row 2: Albums */}
        <div style={{ display: 'flex', gap: '35px' }}>
          {person1?.song?.albumCover ? (
            <img src={person1.song.albumCover} alt="Album" style={imgStyle('100px', '100px')} />
          ) : (
            <PlaceholderBox w="100px" h="100px" type="Album" />
          )}

          {person2?.song?.albumCover ? (
            <img src={person2.song.albumCover} alt="Album" style={imgStyle('100px', '100px')} />
          ) : (
            <PlaceholderBox w="100px" h="100px" type="Album" />
          )}
        </div>

      </div>
    </div>
  );
};

export default CalendarCard;