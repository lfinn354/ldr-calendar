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
        <AuthButton />
      </header>
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        margin: '16px 0',
        marginBottom: '30px'
      }}>
        <button onClick={() => setCurrentView('today')}>Notepad</button>
        <button onClick={() => setCurrentView('calendar')}>Calendar</button>
        <button onClick={() => setCurrentView('archive')}>Archive</button>
      </nav>
      <main>
        {currentView === 'calendar' && <CalendarGrid entries={entries} setEntries={setEntries} />}
        {currentView === 'today' && <div>Notepad view</div>}
        {currentView === 'archive' && <div>Archive view</div>}
      </main>
    </div>
  )
}