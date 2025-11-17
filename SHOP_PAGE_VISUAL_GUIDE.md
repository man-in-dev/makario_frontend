# Shop Page - Visual Design Guide

## Hero Section - Complete Layout

### Desktop View (1280px+)
```
┌────────────────────────────────────────────────────────────────┐
│ Heritage Gradient Background (with decorative circles)         │
│                                                                 │
│  Content Area (max-w-2xl)                                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ✨ Discover Our Collection                             │  │
│  │  (Golden badge with backdrop blur)                      │  │
│  │                                                          │  │
│  │  Shop Premium Makhana                                   │  │
│  │  (text-6xl bold white, Makhana in golden)              │  │
│  │                                                          │  │
│  │  Discover our carefully curated collection of premium  │  │
│  │  Bihar makhana. Each product is hand-picked...         │  │
│  │  (text-xl gray-100)                                    │  │
│  │                                                          │  │
│  │  ────────────────────────────────────────────────────  │  │
│  │                                                          │  │
│  │  100% Organic │ Fresh Premium Quality │ 50+ Products   │  │
│  │  (3-col grid with golden numbers)                      │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

HEIGHT: min-h-[500px] (500px minimum)
```

### Mobile View (< 640px)
```
┌────────────────────────────────────┐
│ Heritage Gradient BG               │
│ (Decorative circles scaled down)   │
│                                    │
│  ✨ Discover Our Collection        │
│                                    │
│  Shop Premium Makhana              │
│  (text-4xl)                        │
│                                    │
│  Discover our carefully curated    │
│  collection of premium Bihar...    │
│  (text-lg)                         │
│                                    │
│  ────────────────────────────────  │
│                                    │
│  100%     │ Fresh  │ 50+           │
│  Organic  │ Quality│ Products      │
│                                    │
└────────────────────────────────────┘

HEIGHT: min-h-96 (384px minimum)
```

---

## Hero Section - Component Breakdown

### 1. Background Layer
```
Color: gradient-to-br
From: #2d1b0f (heritage)
Via:  #78350f (amber-900/80)
To:   #d4a574 (golden/60)

Decorative Elements:
├─ Circle 1 (Top Right)
│  └─ Width: 384px, Height: 384px
│     Color: golden
│     Filter: blur-3xl
│     Opacity: 20%
│
└─ Circle 2 (Bottom Left)
   └─ Width: 320px, Height: 320px
      Color: orange-400
      Filter: blur-3xl
      Opacity: 20%
```

### 2. Badge Element
```
Style:
├─ Padding: px-4 py-2
├─ Background: golden/20 (with backdrop blur)
├─ Text Color: golden
├─ Border: golden/30
├─ Font Size: text-xs md:text-sm
├─ Font Weight: semibold
├─ Border Radius: rounded-full
└─ Content: ✨ Discover Our Collection

Position: mb-6 (margin-bottom)
Z-Index: z-10 (above background)
```

### 3. Main Heading
```
Size: text-4xl md:text-6xl
Weight: font-bold
Color: text-white
Line Height: leading-tight
Margin: mb-6

Content Structure:
"Shop Premium "
+ "Makhana" (text-golden)

Example:
Shop Premium Makhana
       ↓
   [Golden]
```

### 4. Description Text
```
Size: text-lg md:text-xl
Color: text-gray-100
Line Height: leading-relaxed
Max Width: max-w-xl
Margin: mb-8

Content:
"Discover our carefully curated collection of 
premium Bihar makhana. Each product is 
hand-picked and processed to ensure the 
highest quality and taste."
```

### 5. Stats Section
```
Layout: 3-column grid
Gap: gap-4 md:gap-8
Border Top: border-t border-white/20
Padding: pt-8

Stat 1:          Stat 2:           Stat 3:
┌──────┐        ┌──────┐          ┌──────┐
│100%  │        │Fresh │          │ 50+ │
│Organic│        │Premium│          │Products
│      │        │Quality│          │      │
└──────┘        └──────┘          └──────┘

Number Style:
├─ Size: text-2xl md:text-3xl
├─ Weight: font-bold
├─ Color: text-golden
└─ Margin: mb-1 (below number)

Label Style:
├─ Size: text-sm
├─ Color: text-gray-200
└─ Font Weight: normal
```

---

## Filter Section - Visual Layout

### Desktop Filter Bar
```
┌────────────────────────────────────────────────────────────────┐
│ Search Input │ Category ▼ │ Price ▼ │ Sort ▼ │ Grid │ List │ Clear
└────────────────────────────────────────────────────────────────┘

Layout: lg:grid-cols-5
Gap: gap-4 mb-4
White Background: bg-white
Border: border border-orange-100
Rounded: rounded-xl
Shadow: shadow-lg hover:shadow-xl
```

### Mobile Filter Toggle
```
┌───────────────────────────────────────┐
│ ⋮ Filters & Search (Show)             │
└───────────────────────────────────────┘
        ↓ (When toggled)
┌───────────────────────────────────────┐
│ [Search Input]                        │
│ [Category ▼]    [Price ▼]             │
│ [Sort ▼]   [Grid] [List] [Clear]      │
└───────────────────────────────────────┘
```

### Active Filter Badges
```
Once filters are applied:
┌─────────────────────────────────────┐
│ [Search: keyword] ×                 │
│ [Category: Flavored] × [Price: 200-500] × │
└─────────────────────────────────────┘

Style:
├─ Background: badge secondary color
├─ Text: filter label and value
├─ Close button: × (click to remove)
└─ Margin: flex gap-2
```

---

## Product Grid - Below Filters

### Desktop Grid
```
┌─────┬─────┬─────┬─────┬─────┐
│ Prod│ Prod│ Prod│ Prod│ Prod│  5 columns (lg:grid-cols-5)
├─────┼─────┼─────┼─────┼─────┤
│ Prod│ Prod│ Prod│ Prod│ Prod│
└─────┴─────┴─────┴─────┴─────┘

Gap: md:gap-6
Animation: fade-in with stagger (50ms delay)
```

### Mobile Grid
```
┌───┬───┐
│ P │ P │  2 columns (grid-cols-2)
├───┼───┤
│ P │ P │
└───┴───┘

Gap: gap-3
```

### List View (Mobile/Desktop Toggle)
```
┌──────────────────────────────────────┐
│ [Image] Product Name                 │
│         Description...               │
│         ₹Price [Original] ⭐ Rating  │
├──────────────────────────────────────┤
│ [Image] Product Name                 │
│         Description...               │
│         ₹Price [Original] ⭐ Rating  │
└──────────────────────────────────────┘
```

---

## Color Palette

### Primary Colors
```
Heritage (#2d1b0f)
├─ Used for: Main background
├─ Hex: #2d1b0f
├─ Tailwind: heritage
└─ Contrast: High on white text ✓

Golden (#d4a574)
├─ Used for: Accents, highlights
├─ Hex: #d4a574
├─ Tailwind: golden
└─ Contrast: High on dark backgrounds ✓

White (#ffffff)
├─ Used for: Primary text
├─ Hex: #ffffff
└─ Contrast: Excellent on dark ✓

Gray-100 (#f3f4f6)
├─ Used for: Secondary text
└─ Contrast: Good on dark ✓
```

### Background Gradients
```
Hero Section Gradient:
from-heritage (2d1b0f)
→ via-amber-900/80 (78350f at 80% opacity)
→ to-golden/60 (d4a574 at 60% opacity)

Direction: gradient-to-br (top-left to bottom-right)
Angle: 135 degrees
```

---

## Responsive Breakpoints

### Tailwind Breakpoints Used
```
Mobile (default)
├─ min-h-96 (384px)
├─ text-4xl
├─ text-lg
├─ grid-cols-2 (products)
└─ gap-4

Tablet (md: prefix)
├─ min-h-[500px] (becomes active)
├─ text-6xl (becomes active)
├─ text-xl (becomes active)
├─ gap-8 (becomes active)
├─ md:hidden (hide mobile elements)
└─ md:block (show desktop elements)

Desktop (lg: prefix)
├─ lg:grid-cols-5 (products)
├─ lg:grid-cols-4 (sometimes 4)
└─ Full filter visibility
```

---

## Animation & Interactions

### Hero Section
- No animation (static, impressive)
- Hover effects: None (background is decorative)

### Filter Elements
- Dropdown: Smooth open/close
- Search: Instant results update
- Buttons: Hover scale effect
- Badge close: Smooth removal

### Product Cards
- Load: Fade-in animation (animated-fade-in)
- Stagger: 50ms delay between items
- Hover: Scale up slightly (hover:scale-105)
- Image: Zoom on hover (hover:scale-110)

---

## Accessibility Features

✅ High color contrast (white on dark heritage)
✅ Large readable text (min 16px on mobile)
✅ Clear visual hierarchy
✅ Touch-friendly buttons (min 44px height)
✅ Semantic HTML structure
✅ ARIA labels for filters
✅ Keyboard navigation support
✅ Mobile-first responsive design

---

## Performance Metrics

- Hero section: Zero additional requests
- Decorative elements: CSS only (no images)
- Grid animations: GPU-accelerated
- Lazy loading: Product images optimized
- Bundle impact: ~0KB (uses existing Tailwind)

---

## Browser Support

✅ Chrome/Edge (88+)
✅ Firefox (87+)
✅ Safari (14+)
✅ Mobile Safari (14+)
✅ Android Chrome (88+)
✅ Firefox Mobile (87+)

---

## Print View

When printing:
- Hero section: Displays but not optimized
- Filters: Hidden
- Products: Full-width list format
- Colors: Simplified for B&W printing

---

## Accessibility Checklist

- [x] Text has sufficient contrast
- [x] Font sizes are readable
- [x] Interactive elements are keyboard accessible
- [x] Touch targets are min 44x44px
- [x] No color-only information encoding
- [x] Form labels are associated
- [x] Images have alt text
- [x] Semantic HTML used correctly
