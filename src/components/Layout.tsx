import { useState } from 'react'
import { Entries, Entry, View } from '../types'
import CalendarGrid from './CalendarCardsView'

interface LayoutProps {
  currentView: View
  setCurrentView: (view: View) => void
  initialEntries: Entries
}

export default function Layout({ currentView, setCurrentView, initialEntries }: LayoutProps) {
  const [entries, setEntries] = useState<Entries>(initialEntries);
  
  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center',     // Centers vertically
        gap: '8px',
        margin: '16px 0',
        height: '60px'            // Ensure the header has height to see the vertical centering
      }}>
        <h1>heh sus heh</h1>
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