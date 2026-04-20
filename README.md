# 🧊 The Digital Fridge

A beautiful, interactive dashboard for long-distance relationships built with React and Vite. Create daily memories together with songs, photos, reflections, and special event tracking.

## ✨ Features

### 📅 Interactive Calendar
- Beautiful 7-column month view with glassmorphic design
- Visual indicator dots for each entry type
- Special event labels for Mondays, Thursdays, and Fridays
- Today's date highlighted with gradient and glow effect
- Click any date to create or edit an entry

### 💾 Daily Entry System
Complete entries with:
- **🎵 Song of the Day** - Add titles and album art URLs with preview
- **✨ Daily Reflection** - Track highlights, lowlights, and surprising moments
- **📸 Picture of the Day** - Upload images or paste URLs
- **🧠 Trivia Thursday** - Add quiz questions (Thursday-only feature)

### 🎨 Glassmorphic Design
- Semi-transparent backgrounds with backdrop blur
- Soft, warm color palette (pastels and sunset gradients)
- Full dark mode support
- Smooth transitions and hover effects
- Responsive layout

### 🗂️ Navigation
- **Today** (Coming Soon) - Quick view of today's entry
- **Calendar** (Active) - Full month view with all entries
- **Archive** (Coming Soon) - Browse past months

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.5 | UI Framework |
| Vite | 8.0.9 | Build tool & dev server |
| Tailwind CSS | 4.2.2 | Styling |
| Lucide-React | 1.8.0 | Icons |
| date-fns | 4.1.0 | Date manipulation |
| clsx | 2.1.1 | Conditional classes |
| tailwind-merge | 3.5.0 | Smart class merging |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd /Users/lfinn/VSCodeProjects/ldr-calendar
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The app auto-refreshes as you edit files (HMR enabled).

### Production Build

```bash
npm run build
```

Outputs to `dist/` directory.

### Preview Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
ldr-calendar/
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Sidebar navigation & main layout
│   │   ├── CalendarGrid.jsx     # Calendar display with date grid
│   │   └── DailyEntryModal.jsx  # Entry form modal
│   ├── App.jsx                  # Main app with state management
│   ├── App.css                  # App-specific styles
│   ├── index.css                # Global styles & Tailwind
│   ├── main.jsx                 # React entry point
│   └── assets/                  # Images and other assets
├── public/                       # Static files
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint rules
├── package.json                # Dependencies
└── README.md                   # This file
```

## 💾 Data Structure

Entries are stored in an object keyed by ISO date strings:

```javascript
{
  "2026-04-20": {
    song: {
      title: "Song Name",
      art: "https://image-url.jpg"
    },
    reflection: {
      h: "Best part of the day",      // Highlight
      l: "Challenging part",          // Lowlight
      s: "Something unexpected"       // Surprising
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

**Note**: Data currently persists only during the session. To save between sessions, implement:
- LocalStorage (simple, browser-only)
- Backend API + Database
- Cloud storage (Firebase, etc.)

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Pink → Purple → Blue
- **Background**: Soft pastels with backdrop blur
- **Indicators**: 
  - 🟣 Pink for songs
  - 🔵 Blue for photos
  - 🟡 Amber for reflections

### Special Events
| Day | Event | Icon | Color |
|---|---|---|---|
| Monday | Movie Monday | 🎬 | Red/Pink |
| Thursday | Trivia Thursday | 🧠 | Blue/Cyan |
| Friday | FaceTime Friday | 📞 | Purple/Pink |

### Glassmorphism Pattern
```css
bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
```

All major containers use this pattern for a cohesive look.

### Dark Mode
Automatic dark mode support with `dark:` Tailwind variants throughout.

## 📖 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Interactive guide to using the app
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Full feature documentation
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design tokens and styling reference
- **[COMPONENTS.md](./COMPONENTS.md)** - Component architecture and patterns

## 🎯 How to Use

### Create an Entry
1. Click any date in the calendar
2. A slide-over modal appears from the right
3. Fill in the form sections:
   - Song title & album art URL
   - Reflection text (highlight, lowlight, surprise)
   - Photo (upload or paste URL)
   - Trivia (if Thursday)
4. Click "Save Entry"

### View Entries
- **Indicator dots** appear on dates with entries
- **Legend at bottom** explains what each dot means
- **Click date again** to edit an existing entry

### Special Days
- Trivia questions only appear on Thursdays
- Special event icons show on Mondays, Thursdays, Fridays
- Modal header uses different color for each event type

## 🔮 Future Enhancements

- [ ] Persist data to LocalStorage
- [ ] Backend integration for multi-device sync
- [ ] Implement "Today" view with countdown to next special event
- [ ] Archive view for browsing past months
- [ ] Photo gallery with filtering
- [ ] Share/collaboration features
- [ ] Export entries as PDF or images
- [ ] Mobile app (React Native)
- [ ] Notifications and reminders
- [ ] Partner response feature for trivia

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Images not loading?**
- Check URL is public and accessible
- Verify HTTPS where required
- Try a different image URL to test

**Entries disappearing?**
- This is normal with in-memory state
- Add LocalStorage or backend to persist
- See [QUICK_START.md](./QUICK_START.md#next-steps) for guidance

**Dark mode not working?**
- Ensure your system dark mode is enabled
- Or add `dark` class to `<html>` in `index.html` to force it

## 📝 Component Overview

### App.jsx
Root component managing all state for entries and current view.

### Layout.jsx
Main wrapper with sidebar navigation and view routing.

### CalendarGrid.jsx
Displays the current month as a 7×6 grid with special event handling and entry indicators.

### DailyEntryModal.jsx
Slide-over modal for creating/editing daily entries with conditional Trivia Thursday section.

See [COMPONENTS.md](./COMPONENTS.md) for detailed documentation.

## 🎨 Customization

### Change Colors
Edit gradient classes in components:
```jsx
// In Layout.jsx
className="bg-gradient-to-r from-pink-400 to-purple-400"
// Change to:
className="bg-gradient-to-r from-rose-400 to-violet-400"
```

### Add Special Events
Modify `getSpecialEvent()` in `CalendarGrid.jsx` and `DailyEntryModal.jsx`:
```javascript
if (dayOfWeek === 3) return { label: '💝 Hump Day', icon: '💝' }
```

### Extend Entry Form
Add new fields to `DailyEntryModal.jsx`:
```jsx
<input
  placeholder="New field"
  value={formData.newField}
  onChange={(e) => setFormData({...formData, newField: e.target.value})}
/>
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

Private project - all rights reserved.

## 💜 About

The Digital Fridge is a celebration of long-distance love. Built to help couples document their connection, no matter the distance.

**Made with 💜 for long-distance relationships**

---

## Quick Links

- **Live App**: [http://localhost:5173](http://localhost:5173) (dev server)
- **Docs**: [QUICK_START.md](./QUICK_START.md)
- **Design**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Code**: [COMPONENTS.md](./COMPONENTS.md)

## Support

For issues or questions, check the documentation files or review the component code comments.

Happy creating! 💜

