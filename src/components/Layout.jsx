import { useState } from 'react'
import { Calendar, Archive, Clock } from 'lucide-react'
import CalendarGrid from './CalendarGrid'

export default function Layout({ currentView, setCurrentView, entries, updateEntry }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 p-8 flex flex-col shadow-xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            🧊 Digital Fridge
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Long-distance love</p>
        </div>

        <nav className="space-y-4 flex-1">
          <button
            onClick={() => setCurrentView('today')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              currentView === 'today'
                ? 'bg-gradient-to-r from-pink-400/30 to-purple-400/30 text-purple-900 dark:text-purple-100 border border-purple-300/50'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/5'
            }`}
          >
            <Clock size={20} />
            <span className="font-medium">Today</span>
          </button>

          <button
            onClick={() => setCurrentView('calendar')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              currentView === 'calendar'
                ? 'bg-gradient-to-r from-pink-400/30 to-purple-400/30 text-purple-900 dark:text-purple-100 border border-purple-300/50'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/5'
            }`}
          >
            <Calendar size={20} />
            <span className="font-medium">Calendar</span>
          </button>

          <button
            onClick={() => setCurrentView('archive')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              currentView === 'archive'
                ? 'bg-gradient-to-r from-pink-400/30 to-purple-400/30 text-purple-900 dark:text-purple-100 border border-purple-300/50'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/5'
            }`}
          >
            <Archive size={20} />
            <span className="font-medium">Archive</span>
          </button>
        </nav>

        <div className="pt-8 border-t border-white/20">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Made with 💜 for long-distance love
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-auto">
        {currentView === 'calendar' && <CalendarGrid entries={entries} updateEntry={updateEntry} />}
        {currentView === 'today' && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">Today's view coming soon...</p>
          </div>
        )}
        {currentView === 'archive' && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">Archive view coming soon...</p>
          </div>
        )}
      </main>
    </div>
  )
}
