# Component Documentation - The Digital Fridge

## Overview

The app is built with three main components organized in a parent-child hierarchy.

```
App.jsx (State Management)
  ↓
Layout.jsx (Sidebar Navigation & View Router)
  ↓
CalendarGrid.jsx (Calendar Display)
  ↓
DailyEntryModal.jsx (Data Entry Form)
```

## App.jsx

**Purpose**: Root component handling all state management and data flow

### State
```javascript
const [entries, setEntries] = useState({})
// Structure: { "2026-04-20": { song, reflection, photoUrl, trivia } }

const [currentView, setCurrentView] = useState('calendar')
// Values: 'today' | 'calendar' | 'archive'
```

### Key Function
```javascript
const updateEntry = (date, entryData) => {
  setEntries(prev => ({
    ...prev,
    [date]: {
      ...prev[date],  // Preserve existing data
      ...entryData    // Merge in new data
    }
  }))
}
```

This merging approach allows partial updates (e.g., add a photo to an existing entry with songs).

### Props Passed Down
```jsx
<Layout 
  currentView={currentView}           // Current active view
  setCurrentView={setCurrentView}     // Function to change view
  entries={entries}                   // All stored entries
  setEntries={setEntries}             // Direct state setter
  updateEntry={updateEntry}           // Smart update function
/>
```

---

## Layout.jsx

**Purpose**: Main layout wrapper with sidebar navigation and view management

### Props Received
```javascript
{
  currentView,      // string: 'today' | 'calendar' | 'archive'
  setCurrentView,   // function(view)
  entries,          // object: { date: entryData }
  updateEntry       // function(date, entryData)
}
```

### Sidebar Features
- 🧊 **Brand Logo**: "Digital Fridge" with gradient text
- 📱 **Navigation Buttons**: Today, Calendar, Archive
- 🎨 **Active State**: Highlighted with gradient background and border
- 💜 **Footer**: Branding text

### Active Button Styling
```jsx
{
  currentView === 'today'
    ? 'bg-gradient-to-r from-pink-400/30 to-purple-400/30 ... border-purple-300/50'
    : 'text-gray-700 dark:text-gray-300 hover:bg-white/5'
}
```

### Content Area
```jsx
{currentView === 'calendar' && <CalendarGrid ... />}
{currentView === 'today' && <div>Today's view coming soon...</div>}
{currentView === 'archive' && <div>Archive view coming soon...</div>}
```

### Key Features
- ✅ Responsive sidebar (fixed width: w-64)
- ✅ Glassmorphic styling on sidebar
- ✅ Main content scrollable
- ✅ Gradient background across full viewport
- ✅ Dark mode support

---

## CalendarGrid.jsx

**Purpose**: Display calendar for the current month with interactive date selection

### Props Received
```javascript
{
  entries,      // object: { "YYYY-MM-DD": entryData }
  updateEntry   // function(date, entryData)
}
```

### Key Logic

#### Get Today's Date
```javascript
const today = new Date()
const monthStart = startOfMonth(today)
const monthEnd = endOfMonth(today)
```

#### Build Calendar Days
```javascript
// Add padding days from previous/next months for grid alignment
const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })
// Creates a full 7×6 grid (42 cells)
```

#### Get Special Events
```javascript
const getSpecialEvent = (date) => {
  const dayOfWeek = getDay(date)
  if (dayOfWeek === 1) return { label: '🎬 Movie Monday', ... }
  if (dayOfWeek === 4) return { label: '🧠 Trivia Thursday', ... }
  if (dayOfWeek === 5) return { label: '📞 FaceTime Friday', ... }
}
```

#### Get Entry Indicators
```javascript
const getEntryIndicators = (date) => {
  const dateStr = format(date, 'yyyy-MM-dd')
  const entry = entries[dateStr]
  if (!entry) return []
  
  const indicators = []
  if (entry.song) indicators.push('song')         // Pink dot
  if (entry.photoUrl) indicators.push('photo')    // Blue dot
  if (entry.reflection?.h || ...) indicators.push('reflection')  // Amber dot
  
  return indicators
}
```

### Calendar Cell States

#### Current Month, Today
```jsx
className={`
  bg-gradient-to-br from-pink-300/40 to-purple-300/40
  border-2 border-purple-400/70
  shadow-lg ring-2 ring-purple-400/30
`}
```

#### Current Month, Has Entry
```jsx
className={`
  bg-gradient-to-br from-blue-200/30 to-purple-200/30
  border-2 border-blue-300/40
  hover:scale-105
`}
```

#### Current Month, Regular
```jsx
className={`
  bg-white/5
  border-2 border-transparent
  hover:bg-white/10 hover:border-purple-300/50
`}
```

#### Outside Current Month
```jsx
className="opacity-30 cursor-default"
```

### Indicator Dots
Displayed as small colored circles (1.5×1.5px) below the date:
```jsx
{indicators.includes('song') && (
  <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
)}
```

### Legend at Bottom
Three cards explaining what each dot means:
- 🎵 **Song**: Album art added
- 📸 **Photo**: Picture of day
- ✨ **Reflection**: Thoughts added

### Modal State
```javascript
const [selectedDate, setSelectedDate] = useState(null)
const [isModalOpen, setIsModalOpen] = useState(false)

const openDateModal = (date) => {
  setSelectedDate(date)
  setIsModalOpen(true)
}
```

---

## DailyEntryModal.jsx

**Purpose**: Slide-over modal for creating/editing daily entries

### Props Received
```javascript
{
  date,             // Date object for selected day
  onClose,          // function() - close modal
  onSave,           // function(entryData) - save and close
  initialEntry      // object (previous entry data or undefined)
}
```

### Form State Structure
```javascript
const [formData, setFormData] = useState({
  song: { title: '', art: '' },
  reflection: { h: '', l: '', s: '' },
  photoUrl: '',
  trivia: [{}, {}, {}]
})
```

### Key Features

#### 1. Modal Header
```jsx
<div className={`bg-gradient-to-r ${specialEvent?.color || '...'} p-6`}>
  <h2>{format(date, 'EEEE, MMMM d')}</h2>
  {specialEvent && <p>{specialEvent.label}</p>}
</div>
```

**Special Event Colors**:
- Monday: `from-red-400 to-pink-400`
- Thursday: `from-blue-400 to-cyan-400`
- Friday: `from-purple-400 to-pink-400`
- Default: `from-pink-400 to-purple-400`

#### 2. Song Section
- Text input for title
- Text input for album art URL
- Image preview on successful load
- Error handling for invalid URLs

#### 3. Reflection Section
Three labeled text areas with distinct colors:

```javascript
{
  field: 'h',        // Highlight
  label: 'Highlight',
  color: 'green'
},
{
  field: 'l',        // Lowlight
  label: 'Lowlight',
  color: 'red'
},
{
  field: 's',        // Surprising Thing
  label: 'Surprising Thing',
  color: 'amber'
}
```

#### 4. Photo Section
Two modes:

**No Photo Selected**:
- Drag-and-drop area with upload icon
- "Paste Image URL" button
- Hidden file input

**Photo Selected**:
- Image preview
- "Remove Photo" button

**File Upload Handler**:
```javascript
const handlePhotoUpload = (e) => {
  const file = e.target.files?.[0]
  const reader = new FileReader()
  reader.onloadend = () => {
    setFormData(prev => ({
      ...prev,
      photoUrl: reader.result  // Data URL
    }))
  }
  reader.readAsDataURL(file)
}
```

#### 5. Trivia Section (Thursday Only)
Renders only if `getDay(date) === 4`:

```jsx
{isTriviaThursday && (
  <div>
    {formData.trivia.map((q, idx) => (
      // Question + Answer inputs
    ))}
  </div>
)}
```

Three question-answer pairs with independent state.

### Update Handlers

```javascript
// Song updates
const handleSongChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    song: { ...prev.song, [field]: value }
  }))
}

// Reflection updates
const handleReflectionChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    reflection: { ...prev.reflection, [field]: value }
  }))
}

// Trivia updates (with index)
const handleTriviaChange = (index, field, value) => {
  setFormData(prev => ({
    ...prev,
    trivia: prev.trivia.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    )
  }))
}
```

### Save Function
```javascript
const handleSave = () => {
  onSave(formData)  // Pass entire form data to parent
  // Parent's updateEntry() merges it with existing data
}
```

### Modal Layout
```
[Header with close button]
[Scrollable Content]
  - Song section
  - Reflection section
  - Photo section
  - Trivia section (conditional)
[Footer with Cancel & Save buttons]
```

### Button Styling

**Save Button** (Primary):
```jsx
className="... bg-gradient-to-r from-pink-400 to-purple-400 ... text-white ..."
```

**Cancel Button** (Secondary):
```jsx
className="... bg-white/10 border border-white/20 ... dark:text-white ..."
```

---

## Data Flow Diagram

```
User clicks date
    ↓
CalendarGrid.openDateModal(date)
    ↓
DailyEntryModal renders with selectedDate
    ↓
User fills form (formData state)
    ↓
User clicks "Save Entry"
    ↓
DailyEntryModal.handleSave() calls onSave(formData)
    ↓
CalendarGrid.onSave() calls updateEntry(dateStr, formData)
    ↓
App.updateEntry() merges into entries state
    ↓
Layout re-renders with updated entries
    ↓
CalendarGrid shows new indicator dots
```

---

## Key Design Patterns

### 1. State Lifting
All state lives in `App.jsx`, with props passed down to children.

### 2. Controlled Components
All inputs are controlled with state:
```jsx
<input value={formData.song.title} onChange={...} />
```

### 3. Conditional Rendering
Features shown based on date:
```jsx
{isTriviaThursday && <TriviaSection />}
```

### 4. Merge Pattern
Updates merge with existing data:
```javascript
[date]: {
  ...prev[date],      // Keep existing
  ...entryData        // Add/override with new
}
```

### 5. Array Mapping
For lists of similar items (trivia questions):
```jsx
{formData.trivia.map((q, idx) => (
  // Use idx as key
))}
```

---

## Styling System

All components use:
- **Tailwind CSS**: Utility classes for styling
- **Glassmorphism**: `bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl`
- **Gradients**: `bg-gradient-to-r from-* to-*`
- **Dark Mode**: `dark:` prefix variants
- **Responsive**: `md:`, `lg:` prefixes for breakpoints

---

## Performance Considerations

1. **Memoization** (Optional): Could wrap `DailyEntryModal` with `memo()` if it receives same props
2. **Large Calendars** (Future): If filtering past years, consider pagination
3. **Image Loading** (Future): Could add loading states for image previews
4. **Persistence** (Future): Consider debouncing saves if adding real-time sync

---

## Extension Points

### Add New Sections
Edit `DailyEntryModal.jsx` to add new fields:
```jsx
<div>
  <label>New Section</label>
  <input value={formData.newField} onChange={...} />
</div>
```

### Add New Special Events
Edit the `getSpecialEvent()` function in `CalendarGrid.jsx`:
```javascript
if (dayOfWeek === 3) return { label: '💝 Wednesday Wishes', ... }
```

### Add New Views
In `Layout.jsx`, add a new view:
```jsx
{currentView === 'new' && <NewView entries={entries} />}
```

### Styling Tweaks
Modify color classes directly in JSX or extract to CSS modules for larger projects.
