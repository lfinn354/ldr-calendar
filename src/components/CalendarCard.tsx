import React from 'react';
import { CalendarCardProps } from '../types'

const CalendarCard: React.FC<CalendarCardProps> = ({ month, day, dayOfWeek, verticalImages, albumCovers, colorLeft, colorRight }) => {
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
        {/* <img src={verticalImages[0]} alt="Vertical 1" style={{ width: '100px', height: '150px', objectFit: 'cover' }} />
        <img src={verticalImages[1]} alt="Vertical 2" style={{ width: '100px', height: '150px', objectFit: 'cover' }} /> */}
        <div
          style={{
            width: '100px',
            height: '150px',
            backgroundColor: '#e0e0e0', // Light gray color
            border: '1px solid #ccc',   // Optional: adds a slight outline
            display: 'inline-block'     // Keeps it behaving like an image in the layout
          }}
        />
        <div
          style={{
            width: '100px',
            height: '150px',
            backgroundColor: '#e0e0e0', // Light gray color
            border: '1px solid #ccc',   // Optional: adds a slight outline
            display: 'inline-block'     // Keeps it behaving like an image in the layout
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '35px' }}>
        {/* <img src={albumCovers[0]} alt="Album 1" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        <img src={albumCovers[1]} alt="Album 2" style={{ width: '100px', height: '100px', objectFit: 'cover' }} /> */}
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#e0e0e0', // Light gray color
            border: '1px solid #ccc',   // Optional: adds a slight outline
            display: 'inline-block'     // Keeps it behaving like an image in the layout
          }}
        />
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#e0e0e0', // Light gray color
            border: '1px solid #ccc',   // Optional: adds a slight outline
            display: 'inline-block'     // Keeps it behaving like an image in the layout
          }}
        />
      </div>
    </div>
  );
};

export default CalendarCard;