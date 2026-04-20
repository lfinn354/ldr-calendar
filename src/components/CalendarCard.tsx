import React from 'react';
import { CalendarCardProps } from '../types';

const CalendarCard: React.FC<CalendarCardProps> = ({ month, day, dayOfWeek, entry, colorLeft, colorRight, status, progress }) => {
  const photo1 = entry?.photoUrl;
  const album1 = entry?.song?.albumCover;

  // 1. Determine the Border (Outer Background)
  let outerBackground = '#000'; // Default Past
  if (status === 'today') {
    outerBackground = `conic-gradient(#FFD700 ${progress}%, #ffffff 0%)`;
  } else if (status === 'future') {
    outerBackground = '#f9f9f9';
  }

  const innerBackground = status === 'future'
    ? '#f9f9f9'
    : `linear-gradient(to right, ${colorLeft} 45%, ${colorRight} 55%)`;

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

  return (
    <div style={{
      width: '280px', // Slightly wider to account for the border padding
      height: '405px',
      flexShrink: 0,
      borderRadius: '14px',
      padding: '5px', // This is the border thickness
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
          {photo1 ? (
            <img src={photo1} alt="Entry" style={{ width: '100px', height: '150px', objectFit: 'cover' }} />
          ) : (
            <PlaceholderBox w="100px" h="150px" type="Photo" />
          )}
          <PlaceholderBox w="100px" h="150px" type="Photo" />
        </div>

        {/* Row 2: Albums */}
        <div style={{ display: 'flex', gap: '35px' }}>
          {album1 ? (
            <img src={album1} alt="Album" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          ) : (
            <PlaceholderBox w="100px" h="100px" type="Album" />
          )}
          <PlaceholderBox w="100px" h="100px" type="Album" />
        </div>

      </div>
    </div>
  );
};

export default CalendarCard;