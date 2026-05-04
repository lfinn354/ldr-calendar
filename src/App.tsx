import { useState } from 'react'
import { Entry, Entries, View } from './types'
import Layout from './components/Layout'

function App() {
  const [currentView, setCurrentView] = useState<View>('calendar')

  return (
    <Layout
      currentView={currentView}
      setCurrentView={setCurrentView}
      initialEntries={{} as Entries}
    />
  )
}

export default App
