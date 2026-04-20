import { useState } from 'react'
import Layout from './components/Layout'
import './App.css'

function App() {
  const [entries, setEntries] = useState({})
  const [currentView, setCurrentView] = useState('calendar')

  const updateEntry = (date, entryData) => {
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
      setEntries={setEntries}
      updateEntry={updateEntry}
    />
  )
}

export default App
