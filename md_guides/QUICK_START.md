# 🚀 Quick Start Guide - The Digital Fridge

## What You Just Built

A beautiful, interactive dashboard for long-distance couples to record daily moments together. The app features a calendar view with daily entry capabilities, special event tracking, and a gorgeous glassmorphic design.

## Starting the App

```bash
cd /Users/lfinn/VSCodeProjects/ldr-calendar
npm run dev
```

Then open: **http://localhost:5173/**

## Interactive Features to Try

### 1. 📅 Browse the Calendar
- The calendar shows the current month (April 2026 in your case)
- **Today's date** is highlighted with a pink/purple gradient and glow effect
- Each day shows:
  - The date number
  - Special event icon (if applicable)
  - Colored indicator dots (if you've added entries)

### 2. 🎬 Special Event Days
- **Mondays**: 🎬 Movie Monday (for watching movies together)
- **Thursdays**: 🧠 Trivia Thursday (with quiz questions!)
- **Fridays**: 📞 FaceTime Friday (for video calls)

These appear in the calendar grid and are highlighted in the modal header.

### 3. ➕ Add a Daily Entry

1. **Click any date** in the calendar
2. A slide-over modal appears from the right
3. Fill in the form:

#### Song of the Day 🎵
- Enter a song title
- Paste an album art image URL (try a Spotify or Apple Music artwork link)
- The image will display in a preview box

#### Daily Reflection ✨
Three text areas for your feelings:
- **Highlight**: The best part of your day
- **Lowlight**: Something challenging
- **Surprising Thing**: Something unexpected

#### Picture of the Day 📸
- Click the upload area to select a file, OR
- Click "Paste Image URL" to paste a link
- The image displays in a preview

#### Trivia Thursday 🧠 (Only on Thursdays!)
- If you click a Thursday, you'll see a special "Trivia Thursday" section
- Add 3 questions with your answers
- Save them for your partner to answer later

### 4. 💾 Save Your Entry
- Click the **"Save Entry"** button (pink/purple gradient)
- The modal closes
- A colored indicator dot appears on that calendar date

### 5. 🎨 Indicator Dots Legend
Look at the bottom of the calendar for the legend:
- 🟣 **Pink dot**: Song added
- 🔵 **Blue dot**: Photo added
- 🟡 **Amber dot**: Reflection added

## Data Structure (What's Being Stored)

When you save an entry on, say, April 20, 2026, it's stored as:

```javascript
{
  "2026-04-20": {
    song: {
      title: "Your Song",
      art: "https://image-url.jpg"
    },
    reflection: {
      h: "Had a great day with family",
      l: "Work was stressful",
      s: "Unexpected call from a friend"
    },
    photoUrl: "https://photo-url.jpg",
    trivia: [
      { question: "What's my fav food?", answer: "Pizza" },
      { question: "What city?", answer: "NYC" },
      { question: "Best memory?", answer: "Our first trip" }
    ]
  }
}
```

## Navigation (Future Enhancements)

The sidebar has three views planned (Today and Archive coming soon):
- **Today**: Quick view of today's entry and countdown to next special event
- **Calendar**: Current month view (what you see now)
- **Archive**: Browse through past months

## 🎨 Design Features

### Glassmorphism
Every container uses:
- Semi-transparent white background (`bg-white/10`)
- Backdrop blur effect (`backdrop-blur-md`)
- Soft borders with transparency (`border-white/20`)

### Color Palette
- **Warm pastels**: Pink, purple, blue tones
- **Sunset gradients**: On buttons and headers
- **Dark mode**: Works seamlessly with your system settings

### Responsive
Works on different screen sizes (sidebar width adjusts)

## 📝 Example Data to Test

### Try this Song URL:
```
https://is1-ssl.mzstatic.com/image/thumb/Music/v4/45/b4/5f/45b45fcd-6c1f-e3ca-43b5-d36ff8c3c3ca/00602547857369.rgb.jpg/226x226bb.webp
```

### Try this Photo URL:
```
https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop
```

## 🔄 Current State Management

All data is stored in React state:
```javascript
const [entries, setEntries] = useState({})
```

**Important**: Data will reset when you refresh the page. To persist data, you'd need to:
- Connect to a backend API
- Use LocalStorage for browser storage
- Use a database like Firebase

## 📱 File Structure

```
src/
├── App.jsx                    # Main component
├── components/
│   ├── Layout.jsx            # Sidebar + content wrapper
│   ├── CalendarGrid.jsx      # Calendar display
│   └── DailyEntryModal.jsx   # Entry form modal
├── App.css                   # App styles (can expand here)
└── index.css                 # Global + Tailwind styles
```

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for lint errors
npm run lint
```

## 🎯 Things to Customize

### Colors
Edit gradients in component classes:
- Change `from-pink-400` to `from-rose-400`
- Change `to-purple-400` to `to-violet-400`

### Branding
Update the header in `Layout.jsx`:
```jsx
<h1 className="...">
  🧊 Digital Fridge  // Change this emoji or text!
</h1>
```

### Special Events
Modify in `CalendarGrid.jsx` and `DailyEntryModal.jsx`:
```javascript
if (dayOfWeek === 1) return { label: '🎬 Movie Monday', ... }
```

## ⚡ Pro Tips

1. **Image URLs must be public** - The image upload uses preview URLs
2. **Paste full URLs** - Make sure URLs start with `https://`
3. **Trivia Thursday only** - Trivia fields only show on Thursdays
4. **Multiple entries** - You can add/edit the same date multiple times
5. **Dark mode** - Toggle in your system settings to see it switch

## 🐛 Troubleshooting

**Image not showing?**
- Check the URL is correct and publicly accessible
- Try a different image URL

**Modal won't open?**
- Make sure you're clicking on a date in the calendar grid
- Check browser console for errors (F12)

**Entries disappearing?**
- This is normal! Data is in React state and resets on refresh
- Add backend integration to persist data

## 🚀 Next Steps

Ready to extend the app? Consider:
1. Add LocalStorage to persist data between sessions
2. Implement the "Today" view
3. Create an "Archive" view for past months
4. Add photo gallery functionality
5. Create a partner sharing feature
6. Add notifications/reminders
7. Export entries as PDF or image

## 💜 Have Fun!

This is your canvas to celebrate your long-distance relationship. Customize colors, add more special events, and make it unique to your relationship!

**Happy creating!** 💜

---

Need help? Check:
- `IMPLEMENTATION_GUIDE.md` - Full documentation
- `DESIGN_SYSTEM.md` - Styling reference
- Component files for code examples
