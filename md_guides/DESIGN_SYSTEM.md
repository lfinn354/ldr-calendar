# The Digital Fridge - Design System

## 🎨 Visual Style Guide

### Glassmorphism Core Classes

The entire application uses a consistent glassmorphism pattern:

```jsx
// Base glassmorphic container
className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"

// With elevation/shadow
className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"

// Interactive version
className="... hover:bg-white/20 hover:border-white/30 transition-all"
```

### Color Palette

#### Primary Gradients
- **Pink to Purple**: `from-pink-400 to-purple-400`
- **Purple to Blue**: `from-purple-400 to-blue-400`
- **Blue to Cyan**: `from-blue-400 to-cyan-400`
- **Red to Pink**: `from-red-400 to-pink-400`

#### Background
- Light: `bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50`
- Dark: `dark:from-slate-900 dark:via-slate-800 dark:to-slate-900`

#### Indicator Dots (Entry Types)
- **Song**: Pink 400 - `bg-pink-400`
- **Photo**: Blue 400 - `bg-blue-400`
- **Reflection**: Amber 400 - `bg-amber-400`

#### Special Events
- **Movie Monday**: Red/Pink gradient `from-red-400 to-pink-400`
- **Trivia Thursday**: Blue/Cyan gradient `from-blue-400 to-cyan-400`
- **FaceTime Friday**: Purple/Pink gradient `from-purple-400 to-pink-400`

### Typography

#### Headlines
- Calendar Month: `text-4xl font-bold text-gray-900 dark:text-white`
- Section Headers: `text-sm font-bold text-gray-900 dark:text-white`
- Day Numbers: `text-lg font-bold`

#### Body Text
- Default: `text-gray-700 dark:text-gray-300`
- Subdued: `text-gray-600 dark:text-gray-400`
- Small: `text-xs text-gray-500 dark:text-gray-400`

### Component Borders & Shadows

#### Thin Borders
- `border border-white/20`
- `border-2 border-white/30` (hover states)

#### Shadows
- Subtle: `shadow-md`
- Elevation: `shadow-xl`
- Focus: `ring-2 ring-purple-400/30`

### Interactive States

#### Buttons
```jsx
// Primary action button
className="px-4 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:shadow-lg transition-shadow font-semibold"

// Secondary action button
className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white hover:bg-white/20 transition-colors font-semibold"

// Danger action button
className="px-4 py-2 rounded-xl bg-red-500/20 text-red-600 dark:text-red-400 border border-red-400/50 hover:bg-red-500/30 transition-colors"
```

#### Input Fields
```jsx
className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
```

#### Hover Effects
```jsx
// Scale and border highlight
"hover:scale-105 hover:border-purple-300/50"

// Background brightness
"hover:bg-white/5"

// Combined
"hover:bg-white/20 hover:border-white/30 transition-all"
```

### Calendar Cell States

#### Today's Cell
- Background: `bg-gradient-to-br from-pink-300/40 to-purple-300/40`
- Border: `border-2 border-purple-400/70 shadow-lg ring-2 ring-purple-400/30`
- Text: `text-purple-900 dark:text-purple-100`

#### Has Entry Cell
- Background: `bg-gradient-to-br from-blue-200/30 to-purple-200/30`
- Border: `border-2 border-blue-300/40`

#### Regular Cell
- Background: `bg-white/5 hover:bg-white/10`
- Border: `border-2 border-transparent hover:border-purple-300/50`

#### Inactive Month Cell
- Opacity: `opacity-30 cursor-default`

### Modal Design

#### Modal Header
- Full gradient background with special event colors
- Padding: `p-6`
- Contains close button with hover state

#### Modal Content
- Padding: `p-6 space-y-6`
- Scrollable on small screens: `overflow-auto`
- Max width: `max-w-xl`

#### Modal Footer
- Border top: `border-t border-white/20`
- Padding: `p-6`
- Button layout: `flex gap-3`
- Buttons: `flex-1` for equal width

### Reflection Section Colors

Each reflection area has a unique accent color:

```jsx
// Highlight (Good)
label: "text-xs font-semibold text-green-600 dark:text-green-400"
input: "focus:ring-green-400"

// Lowlight (Challenging)
label: "text-xs font-semibold text-red-600 dark:text-red-400"
input: "focus:ring-red-400"

// Surprising Thing (Neutral)
label: "text-xs font-semibold text-amber-600 dark:text-amber-400"
input: "focus:ring-amber-400"
```

### Sidebar Navigation

#### Active Button
- Background: `bg-gradient-to-r from-pink-400/30 to-purple-400/30`
- Border: `border border-purple-300/50`
- Text: `text-purple-900 dark:text-purple-100`

#### Inactive Button
- Background: Transparent
- Text: `text-gray-700 dark:text-gray-300`
- Hover: `hover:bg-white/5`

## 🎭 Dark Mode

All components use Tailwind's `dark:` prefix for automatic dark mode support:

```jsx
// Light/Dark variants
className="bg-white dark:bg-slate-900"
className="text-gray-900 dark:text-white"
className="border-white/20"  // Works in both modes
```

## 🔄 Transitions & Animations

Consistent timing for all interactive elements:

```jsx
className="transition-all"        // All properties
className="transition-colors"     // Just colors
className="transition-shadow"     // Just shadow
className="transition-transform"  // Just scale/position
className="duration-200"          // Default timing (200ms)
```

## 📐 Spacing & Sizing

- **Gap between elements**: `gap-2`, `gap-3`, `gap-4`
- **Padding**: `p-3`, `p-4`, `p-6`, `p-8`
- **Rounded corners**: `rounded-xl` (0.75rem), `rounded-2xl` (1rem), `rounded-3xl` (1.5rem)
- **Icon sizes**: `size={18}`, `size={20}`, `size={24}`, `size={32}`

## 🎯 Usage Tips

1. **Consistency**: Always use the glassmorphic base classes for containers
2. **Gradients**: Use semantic color pairs that work well together
3. **Accessibility**: Maintain good contrast ratios with dark mode variants
4. **Responsive**: Use Tailwind's responsive prefixes (md:, lg:, etc.)
5. **Performance**: Keep blur effects minimal on slow devices
