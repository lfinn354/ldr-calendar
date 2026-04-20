import { Heart, Clock, Calendar, Archive } from 'lucide-react'
import { Entry, CalendarCardProps } from '../types'
import CalendarGrid from './CalendarCardsView'

type Entries = Record<string, Entry>
type View = 'today' | 'calendar' | 'archive'

interface LayoutProps {
  currentView: View
  setCurrentView: (view: View) => void
  entries: Entries
  updateEntry: (date: string, entryData: Entry) => void
}

export default function Layout({ currentView, setCurrentView, entries, updateEntry }: LayoutProps) {
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
        <button onClick={() => setCurrentView('today')}>Today</button>
        <button onClick={() => setCurrentView('calendar')}>Calendar</button>
        <button onClick={() => setCurrentView('archive')}>Archive</button>
      </nav>
      <main>
        {currentView === 'calendar' && <CalendarGrid entries={entries} updateEntry={updateEntry} />}
        {currentView === 'today' && <div>Today view</div>}
        {currentView === 'archive' && <div>Archive view</div>}
      </main>
    </div>
  )
}