import { useState } from 'react'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay,
  isSameMonth,
  isToday,
  parse
} from 'date-fns'
import { Music, Image, Brain } from 'lucide-react'
import DailyEntryModal from './DailyEntryModal'

export default function CalendarGrid({ entries, updateEntry }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)

  // Get all days in the month with padding
  const startDate = new Date(monthStart)
  startDate.setDate(startDate.getDate() - getDay(monthStart))
  
  const endDate = new Date(monthEnd)
  endDate.setDate(endDate.getDate() + (6 - getDay(monthEnd)))

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

  const getSpecialEvent = (date) => {
    const dayOfWeek = getDay(date)
    const dayName = format(date, 'EEEE')
    
    if (dayOfWeek === 1) return { label: '🎬 Movie Monday', icon: '🎬' }
    if (dayOfWeek === 4) return { label: '🧠 Trivia Thursday', icon: '🧠' }
    if (dayOfWeek === 5) return { label: '📞 FaceTime Friday', icon: '📞' }
    
    return null
  }

  const hasEntry = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return entries[dateStr]
  }

  const getEntryIndicators = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const entry = entries[dateStr]
    if (!entry) return []
    
    const indicators = []
    if (entry.song) indicators.push('song')
    if (entry.photoUrl) indicators.push('photo')
    if (entry.reflection?.h || entry.reflection?.l || entry.reflection?.s) indicators.push('reflection')
    
    return indicators
  }

  const openDateModal = (date) => {
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {format(today, 'MMMM yyyy')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create memories together, one day at a time
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div 
              key={day}
              className="text-center font-semibold text-gray-700 dark:text-gray-300 py-3"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date, idx) => {
            const isCurrentMonth = isSameMonth(date, today)
            const isCurrentDay = isToday(date)
            const specialEvent = getSpecialEvent(date)
            const entry = hasEntry(date)
            const indicators = getEntryIndicators(date)

            return (
              <button
                key={idx}
                onClick={() => openDateModal(date)}
                className={`
                  aspect-square p-3 rounded-2xl transition-all duration-200
                  flex flex-col items-center justify-start
                  border-2 border-transparent
                  ${isCurrentMonth 
                    ? 'cursor-pointer hover:scale-105 hover:border-purple-300/50' 
                    : 'opacity-30 cursor-default'
                  }
                  ${isCurrentDay 
                    ? 'bg-gradient-to-br from-pink-300/40 to-purple-300/40 border-purple-400/70 shadow-lg ring-2 ring-purple-400/30' 
                    : entry
                    ? 'bg-gradient-to-br from-blue-200/30 to-purple-200/30 border-blue-300/40'
                    : 'bg-white/5 hover:bg-white/10'
                  }
                `}
              >
                <span className={`text-lg font-bold ${
                  isCurrentDay 
                    ? 'text-purple-900 dark:text-purple-100' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {format(date, 'd')}
                </span>

                {/* Special Event Label */}
                {specialEvent && (
                  <div className="text-xs mt-1 font-semibold text-purple-600 dark:text-purple-300">
                    {specialEvent.icon}
                  </div>
                )}

                {/* Entry Indicators */}
                {indicators.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap justify-center">
                    {indicators.includes('song') && (
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    )}
                    {indicators.includes('photo') && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    )}
                    {indicators.includes('reflection') && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Song</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Album art added</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Photo</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Picture of day</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Reflection</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Thoughts added</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedDate && (
        <DailyEntryModal 
          date={selectedDate}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedDate(null)
          }}
          onSave={(entryData) => {
            updateEntry(format(selectedDate, 'yyyy-MM-dd'), entryData)
            setIsModalOpen(false)
            setSelectedDate(null)
          }}
          initialEntry={entries[format(selectedDate, 'yyyy-MM-dd')]}
        />
      )}
    </div>
  )
}
