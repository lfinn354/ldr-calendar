import React from 'react';
import { CalendarCardProps } from '../types';

const CalendarCard: React.FC<CalendarCardProps> = ({ month, day, dayOfWeek, entry, colorLeft, colorRight }) => {
  const photo1 = entry?.photoUrl;
  const album1 = entry?.song?.albumCover;

  // Helper for the gray placeholder box
  const PlaceholderBox = ({ width, height }: { width: string, height: string }) => (
    <div style={{
      width,
      height,
      backgroundColor: '#e0e0e0',
      border: '1px solid #ccc',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontSize: '12px'
    }}>
      Empty
    </div>
  );
  
  return (
    <div style={{
      width: '275px',
      height: '400px',
      flexShrink: 0, // This is the secret sauce! It prevents truncation.
      border: '1px solid black',
      borderRadius: '10px',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      background: `linear-gradient(to right, ${colorLeft} 45%, ${colorRight} 55%)`,
    }}>
      <div style={{display: 'flex', alignItems: 'start', width: '100%'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // This aligns both children to the left
          marginLeft: '10px',
          marginTop: '10px',
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {month}
          </div>
          <div style={{ fontSize: '22px' }}> {/* Adjusted size for the day */}
            {day}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '24px', margin: '10px 0', marginBottom: '20px' }}>
        {dayOfWeek}
      </div>
      
      <div style={{ display: 'flex', gap: '35px', marginBottom: '20px' }}>
        {photo1 ? (
          <img src={photo1} alt="Entry" style={{ width: '100px', height: '150px', objectFit: 'cover' }} />
        ) : (
          <PlaceholderBox width="100px" height="150px" />
        )}
        
        {/* Second slot is currently always a placeholder per your design */}
        <PlaceholderBox width="100px" height="150px" />
      </div>

      {/* Row 2: Album Covers */}
      <div style={{ display: 'flex', gap: '35px' }}>
        {album1 ? (
          <img src={album1} alt="Album" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ) : (
          <PlaceholderBox width="100px" height="100px" />
        )}
        
        <PlaceholderBox width="100px" height="100px" />
      </div>
      
    </div>
  );
};

export default CalendarCard;