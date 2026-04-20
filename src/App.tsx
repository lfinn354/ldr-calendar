import { useState } from 'react'
import { Entry } from './types'
import Layout from './components/Layout'

type Entries = Record<string, Entry>
type View = 'today' | 'calendar' | 'archive'

function App() {
  const [entries, setEntries] = useState<Entries>({})
  const [currentView, setCurrentView] = useState<View>('calendar')

  const updateEntry = (date: string, entryData: Entry) => {
    setEntries(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        ...entryData
      }
    }))
  }

  return (
    <Layout
      currentView={currentView}
      setCurrentView={setCurrentView}
      entries={entries}
      updateEntry={updateEntry}
    />
  )
}

export default App
