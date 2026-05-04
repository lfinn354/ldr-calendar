import { useState } from 'react'
import { Entries, Entry, View } from '../types'
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import CalendarGrid from './CalendarCardsView'
import AuthButton from './AuthButton';

interface LayoutProps {
  currentView: View
  setCurrentView: (view: View) => void
  initialEntries: Entries
}

const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Logged in user:", result.user.uid);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export default function Layout({ currentView, setCurrentView, initialEntries }: LayoutProps) {
  const [entries, setEntries] = useState<Entries>(initialEntries);

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px', // Prevents it from getting too wide
        margin: '0 auto',   // Centers the entire header container
        padding: '0 24px',  // Breathing room on the sides
        height: '80px',
        borderBottom: '1px solid #eee' // Subtle separator
      }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>LTF's LDC</h1>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px', // Increased gap for a more airy feel
        }}>
          {[
            { id: 'today', label: 'Notepad' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'archive', label: 'Archive' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0',
                fontSize: '14px',
                fontWeight: currentView === item.id ? '600' : '400',
                color: currentView === item.id ? '#000' : '#666',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.2s ease',
                // Animated underline for the active link
                borderBottom: currentView === item.id ? '2px solid #FFD700' : '2px solid transparent'
              }}
              onMouseOver={(e) => {
                if (currentView !== item.id) e.currentTarget.style.color = '#000';
              }}
              onMouseOut={(e) => {
                if (currentView !== item.id) e.currentTarget.style.color = '#666';
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <AuthButton />
      </header>
      <main>
        {currentView === 'calendar' && <CalendarGrid entries={entries} setEntries={setEntries} />}
        {currentView === 'today' && <div>Notepad view</div>}
        {currentView === 'archive' && <div>Archive view</div>}
      </main>
    </div>
  )
}