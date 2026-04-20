import { useState, useRef } from 'react'
import { format, getDay } from 'date-fns'
import { X, Upload, Music, Image as ImageIcon } from 'lucide-react'

export default function DailyEntryModal({ date, onClose, onSave, initialEntry }) {
  const [formData, setFormData] = useState({
    song: initialEntry?.song || { title: '', art: '' },
    reflection: initialEntry?.reflection || { h: '', l: '', s: '' },
    photoUrl: initialEntry?.photoUrl || '',
    trivia: initialEntry?.trivia || [{}, {}, {}]
  })

  const fileInputRef = useRef(null)
  const isTriviaThursday = getDay(date) === 4

  const handleSongChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      song: { ...prev.song, [field]: value }
    }))
  }

  const handleReflectionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      reflection: { ...prev.reflection, [field]: value }
    }))
  }

  const handleTriviaChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      trivia: prev.trivia.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photoUrl: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePastePhotoUrl = () => {
    const url = prompt('Paste image URL for album art or photo:')
    if (url) {
      setFormData(prev => ({
        ...prev,
        photoUrl: url
      }))
    }
  }

  const handleSave = () => {
    onSave(formData)
  }

  const getSpecialEvent = () => {
    const dayOfWeek = getDay(date)
    if (dayOfWeek === 1) return { label: 'Movie Monday 🎬', color: 'from-red-400 to-pink-400' }
    if (dayOfWeek === 4) return { label: 'Trivia Thursday 🧠', color: 'from-blue-400 to-cyan-400' }
    if (dayOfWeek === 5) return { label: 'FaceTime Friday 📞', color: 'from-purple-400 to-pink-400' }
    return null
  }

  const specialEvent = getSpecialEvent()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      {/* Slide-over modal from the right */}
      <div className="ml-auto h-full w-full max-w-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-r ${specialEvent?.color || 'from-pink-400 to-purple-400'} p-6 flex items-center justify-between`}>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {format(date, 'EEEE, MMMM d')}
            </h2>
            {specialEvent && (
              <p className="text-white/90 text-sm mt-1 font-semibold">{specialEvent.label}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Song Section */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Music size={18} className="text-pink-500" />
              Song of the Day
            </label>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Song title"
                value={formData.song.title}
                onChange={(e) => handleSongChange('title', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <input
                type="text"
                placeholder="Paste album art URL"
                value={formData.song.art}
                onChange={(e) => handleSongChange('art', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {formData.song.art && (
                <div className="mt-3 rounded-xl overflow-hidden border border-white/20">
                  <img 
                    src={formData.song.art} 
                    alt="Album art" 
                    className="w-full h-40 object-cover"
                    onError={() => {
                      alert('Unable to load image. Please check the URL.')
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Reflection Section */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
              ✨ Daily Reflection
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-green-600 dark:text-green-400 block mb-1">
                  Highlight
                </label>
                <textarea
                  placeholder="What was the best part of your day?"
                  value={formData.reflection.h}
                  onChange={(e) => handleReflectionChange('h', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none h-20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-red-600 dark:text-red-400 block mb-1">
                  Lowlight
                </label>
                <textarea
                  placeholder="What was challenging?"
                  value={formData.reflection.l}
                  onChange={(e) => handleReflectionChange('l', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none h-20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                  Surprising Thing
                </label>
                <textarea
                  placeholder="Something unexpected that happened?"
                  value={formData.reflection.s}
                  onChange={(e) => handleReflectionChange('s', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-blue-500" />
              Picture of the Day
            </label>
            
            {formData.photoUrl ? (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden border border-white/20">
                  <img 
                    src={formData.photoUrl} 
                    alt="Photo of the day" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <button
                  onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))}
                  className="w-full px-4 py-2 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400 border border-red-400/50 hover:bg-red-500/30 transition-colors text-sm font-semibold"
                >
                  Remove Photo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-white/50 transition-colors"
                >
                  <Upload size={32} className="mx-auto text-gray-600 dark:text-gray-400 mb-2" />
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Click to upload photo
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    or drag and drop
                  </p>
                </div>
                <button
                  onClick={handlePastePhotoUrl}
                  className="w-full px-4 py-2 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-400/50 hover:bg-blue-500/30 transition-colors text-sm font-semibold"
                >
                  Paste Image URL
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Trivia Section */}
          {isTriviaThursday && (
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                🧠 Trivia Thursday
              </label>
              <div className="space-y-3">
                {formData.trivia.map((q, idx) => (
                  <div key={idx}>
                    <label className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 block mb-1">
                      Question {idx + 1}
                    </label>
                    <input
                      type="text"
                      placeholder={`Question ${idx + 1} (optional)`}
                      value={q.question || ''}
                      onChange={(e) => handleTriviaChange(idx, 'question', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm mb-1"
                    />
                    <input
                      type="text"
                      placeholder={`Your answer ${idx + 1} (optional)`}
                      value={q.answer || ''}
                      onChange={(e) => handleTriviaChange(idx, 'answer', e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-white/20 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white hover:bg-white/20 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-lg transition-shadow font-semibold"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  )
}
