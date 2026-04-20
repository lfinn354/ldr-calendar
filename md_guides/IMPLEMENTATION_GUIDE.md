# 🧊 The Digital Fridge

A private, long-distance relationship dashboard built with React and Vite. Celebrate your relationship with daily entries, special event reminders, and a beautiful glassmorphic interface.

## ✨ Features

### 📅 Calendar Grid
- Beautiful 7-column month view with glassmorphic design
- Indicator dots for entries (songs 🎵, photos 📸, reflections ✨)
- Special event days with unique icons:
  - **Monday**: 🎬 Movie Monday
  - **Thursday**: 🧠 Trivia Thursday
  - **Friday**: 📞 FaceTime Friday

### 📝 Daily Entry Modal
- **Song of the Day**: Add song titles and album art URLs
- **Daily Reflection**: Three text areas for:
  - Highlight (best part of your day)
  - Lowlight (challenges)
  - Surprising Thing (unexpected moments)
- **Picture of the Day**: Upload or paste image URLs
- **Trivia Thursday**: Special trivia section on Thursdays with 3 questions

### 🎨 Design
- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur effects
- **Color Palette**: Warm, soft tones (pastels and sunset gradients)
- **Responsive Sidebar**: Navigation for Today, Calendar, and Archive views
- **Dark Mode Support**: Full dark mode compatibility

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Beautiful icons
- **date-fns 4** - Date manipulation and formatting
- **clsx** - Conditional class handling
- **tailwind-merge** - Smart Tailwind class merging

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── App.jsx                 # Main app component with state management
├── components/
│   ├── Layout.jsx         # Main wrapper with sidebar navigation
│   ├── CalendarGrid.jsx   # 7-column calendar view with entry indicators
│   └── DailyEntryModal.jsx # Slide-over modal for daily entries
├── App.css                # App-specific styles
├── index.css              # Global styles with Tailwind
└── main.jsx               # React entry point
```

## 💾 State Management

The app uses React's `useState` hook for state management. Entries are stored in an object structure:

```javascript
{
  "2026-04-20": {
    song: {
      title: "Song Name",
      art: "https://image-url.jpg"
    },
    reflection: {
      h: "Highlight text",
      l: "Lowlight text", 
      s: "Surprising thing text"
    },
    photoUrl: "https://photo-url.jpg",
    trivia: [
      { question: "Q1?", answer: "A1" },
      { question: "Q2?", answer: "A2" },
      { question: "Q3?", answer: "A3" }
    ]
  }
}
```

## 🎯 Component Details

### Layout.jsx
Main wrapper component with:
- Sidebar navigation (Today, Calendar, Archive)
- Gradient branding with 🧊 emoji
- Main content area that switches views
- Responsive design with glassmorphism

### CalendarGrid.jsx
Calendar display with:
- Dynamic calendar grid generation using date-fns
- Entry indicators (dots) for quick visual reference
- Special event labels and icons
- Legend explaining indicator meanings
- Modal triggering on date click
- Visual highlighting for today's date

### DailyEntryModal.jsx
Slide-over modal (from the right) with:
- Header showing date and special event (if applicable)
- Song input with album art preview
- Three reflection text areas
- Photo upload/URL paste functionality
- Conditional Trivia Thursday section
- Save/Cancel actions with gradient buttons

## 🎨 Styling Highlights

### Glassmorphism Effects
```css
bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
```

### Color Scheme
- **Background Gradient**: Pink 50 → Purple 50 → Blue 50
- **Accent Colors**: Pink, Purple, Blue gradients
- **Text**: Warm grays with dark mode support
- **Indicators**: 
  - Pink for songs
  - Blue for photos
  - Amber for reflections

### Dark Mode
Seamless dark mode support using Tailwind's `dark:` prefix throughout.

## 🔮 Future Enhancements

- [ ] Today's view showing current day's entry and countdown to next special event
- [ ] Archive view for browsing past entries
- [ ] Data persistence (LocalStorage or backend)
- [ ] Photo gallery view
- [ ] Shared link for partner feedback
- [ ] Notification reminders for special events
- [ ] Export/backup functionality
- [ ] Mobile app version

## 📝 Notes

- All data is currently stored in React state and will reset on page refresh
- Image URLs must be publicly accessible
- Trivia Thursday only appears on Thursdays (by date)
- Special events are displayed in calendar cells and modal headers

## 💜 Made with Love

Built for long-distance relationships. Celebrate every moment together, even when apart.

---

**Getting Started Tips:**
1. Click on any date in the calendar to add an entry
2. Add songs by pasting album art URLs
3. Write reflections for highlights, lowlights, and surprising moments
4. Upload or paste photos using the image drop zone
5. On Thursdays, add trivia questions for your partner
6. Watch the indicator dots appear as you add content

Happy creating! 💜
