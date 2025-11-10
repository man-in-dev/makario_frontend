# How to Update the Comparison Section

## Quick Access
**File Location:** `src/components/ComparisonSection.tsx`
**Integrated In:** `src/pages/Index.tsx` (Line 11 import, Line 254 usage)

---

## Common Updates

### 1. Update Comparison Categories & Content

**Location:** Lines 60-90 in ComparisonSection.tsx

**Current Structure:**
```typescript
const comparisonData = [
  {
    category: "Quality Grade",
    mereMakhana: "Premium Grade A+ (100% selected)",
    otherMakhana: "Mixed grades with 10-20% defective"
  },
  // ... more items
];
```

**To Add New Category:**
```typescript
{
  category: "New Category Name",
  mereMakhana: "Our advantage",
  otherMakhana: "Other brands disadvantage"
},
```

**To Edit Existing:**
Simply change the text in mereMakhana or otherMakhana properties.

---

### 2. Update Feature Cards (Specialties Tab)

**Location:** Lines 92-112 in ComparisonSection.tsx

**Current Structure:**
```typescript
const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Zero chemicals, pesticides or artificial additives. Pure nature's bounty"
  },
  // ... more features
];
```

**To Add New Feature:**
1. Import the icon from lucide-react (if not already imported)
2. Add to features array:
```typescript
{
  icon: YourIcon,
  title: "Feature Title",
  description: "Feature description text here"
},
```

**Available Icons (Already Imported):**
- Leaf (nature)
- Award (achievement)
- Shield (protection)
- Heart (care)
- Zap (energy)
- Star (quality)

**To Use Different Icon:**
1. Check available icons at lucide-react.com
2. Add import at top: `import { NewIcon } from "lucide-react";`
3. Use in features array

---

### 3. Update Health Benefits

**Location:** Lines 114-127 in ComparisonSection.tsx

**Current Structure:**
```typescript
const benefits = [
  "✓ Rich in Protein - 10g protein per 100g serving",
  "✓ Zero Cholesterol - Heart-healthy snack option",
  // ... more benefits
];
```

**To Update:**
Simply modify the string text. Format is: `"✓ Title - Description"`

**To Add New Benefit:**
```typescript
"✓ New Benefit Title - New benefit description",
```

---

### 4. Update "Why Choose Mere Makhana" Reasons

**Location:** Lines 283-295 (inside benefits tab content)

**Current Structure:**
```javascript
[
  { title: "Direct from Bihar Farmers", desc: "No middlemen, maximum freshness" },
  // ... more items
].map((item, idx) => (
  // ... rendered as cards
))
```

**To Update:**
Change title and desc strings within the array.

**To Add New Reason:**
```typescript
{ 
  title: "New Reason Title", 
  desc: "Reason description" 
},
```

---

### 5. Change Colors/Styling

### Comparison Cards Colors
**Location:** Line 206 (Other Brands styling)

```typescript
// Current: "bg-red-50" for other brands
// Change to any Tailwind color: bg-gray-50, bg-orange-50, etc.
className="bg-red-50 p-3 rounded-lg border border-red-200/30 shadow-sm"
```

**Available Color Options:**
- `bg-gray-50` - Gray background
- `bg-blue-50` - Blue background
- `bg-orange-50` - Orange background
- `bg-yellow-50` - Yellow background

### Feature Card Border Colors
**Location:** Line 232

```typescript
// Current colors for feature cards:
// border-l-golden (golden left border)
// Change to: border-l-nature, border-l-heritage, etc.
className="...border-l-4 border-l-golden bg-gradient-to-br from-white to-golden/5"
```

### Button Colors
**Location:** Lines 311-320

```typescript
// Hero button (primary)
className="group bg-heritage hover:bg-heritage/90 text-white px-8 py-4"

// Outline button (secondary)
className="group border-2 border-golden text-golden hover:bg-golden hover:text-white"
```

---

### 6. Change Tab Button Text

**Location:** Lines 154-172

```typescript
<button onClick={() => setActiveTab("comparison")}>
  <Star className="w-5 h-5" />
  Direct Comparison  {/* ← Change this text */}
</button>
```

---

### 7. Change CTA Text & Buttons

**Location:** Lines 305-325

**Heading:**
```typescript
<h3 className="text-3xl font-bold text-heritage">
  Experience the Difference Today!  {/* ← Change this */}
</h3>
```

**Description:**
```typescript
<p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
  Join thousands of satisfied customers... {/* ← Change this */}
</p>
```

**Button Text:**
```typescript
<Link to="/products">
  Shop Our Collection  {/* ← Change text */}
  <span className="ml-2">→</span>
</Link>
```

---

### 8. Change CTA Button Links

**Location:** Line 316 and 323

```typescript
// Shop button
<Link to="/products">  {/* ← Change to: /shop, /bulk-orders, etc. */}

// Reviews button
<Button>Read Customer Reviews</Button>
{/* ← Update onclick handler or add to={} */}
```

---

### 9. Change Product Image

**Location:** Lines 1-25 (import) and Line 162

**Current Import:**
```typescript
import makariaMakhanaImage from "@/assets/homepage/makhana process.png";
```

**To Change Image:**
1. Find your new image file path in src/assets/
2. Update import:
```typescript
import newImage from "@/assets/path/to/your/image.png";
```
3. Update usage (Line 162):
```typescript
<img 
  src={newImage}  {/* ← Change from makariaMakhanaImage */}
  alt="Your Alt Text"
/>
```

---

### 10. Modify Section Background

**Location:** Line 130

```typescript
// Current gradient
className="py-16 bg-gradient-to-br from-golden/5 via-heritage/3 to-nature/5"

// Options:
// from-golden/5 via-heritage/3 to-nature/5 (current - balanced)
// from-heritage/5 to-golden/5 (minimal)
// from-white to-gray-50 (subtle)
// bg-white (clean white)
// from-nature/3 via-white to-golden/3 (nature focused)
```

---

### 11. Add New Tab

If you want to add a 4th tab (e.g., "Awards" or "Testimonials"):

**Step 1:** Add state variable (Line 34)
```typescript
const [activeTab, setActiveTab] = useState<"comparison" | "features" | "benefits" | "awards">("comparison");
//                                                                                      ↑ Add here
```

**Step 2:** Add button (After Line 172)
```typescript
<button
  onClick={() => setActiveTab("awards")}
  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
    activeTab === "awards"
      ? "bg-heritage text-white shadow-lg"
      : "bg-white text-heritage border-2 border-heritage hover:bg-heritage/5"
  }`}
>
  <Trophy className="w-5 h-5" />
  Awards
</button>
```

**Step 3:** Add content section (After Line 303)
```typescript
{activeTab === "awards" && (
  <div className="...">
    {/* Your awards content here */}
  </div>
)}
```

**Step 4:** Import icon if needed
```typescript
import { Trophy } from "lucide-react";
```

---

## Styling Reference

### Tailwind Classes Used
- `py-16` - Vertical padding (4rem)
- `px-4` - Horizontal padding (1rem)
- `mb-12` - Margin bottom (3rem)
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - Responsive grid
- `rounded-lg` - Rounded corners (8px)
- `shadow-lg` - Box shadow
- `hover:shadow-2xl` - Hover shadow
- `transition-all duration-300` - Smooth animation (300ms)
- `bg-gradient-to-br` - Gradient background (top-left to bottom-right)

---

## Testing After Changes

### Checklist
- [ ] Text changes display correctly
- [ ] Images load properly
- [ ] Colors match brand guidelines
- [ ] Hover effects work smoothly
- [ ] Tabs switch content correctly
- [ ] Buttons are clickable
- [ ] Mobile responsive (check on phone)
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)

### Test Commands
```bash
# Check for TypeScript errors
npm run build

# Start dev server
npm run dev

# Visit http://localhost:8081/
```

---

## Common Issues & Solutions

### Issue: Changes not showing
**Solution:** 
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
- Clear cache: Delete `.next` or `dist` folder
- Restart dev server

### Issue: Type errors in TypeScript
**Solution:**
- Check import statements for icons
- Ensure all strings are quoted properly
- Check parentheses and brackets are balanced

### Issue: Styling looks wrong
**Solution:**
- Check Tailwind class names (typos)
- Ensure gradients use `/` for opacity (e.g., `golden/5`)
- Verify color names exist in theme

### Issue: Build fails
**Solution:**
```bash
npm run build 2>&1 | tail -50  # See error details
npm install  # Reinstall dependencies
npm run dev  # Test locally
```

---

## File Structure Reference

```
src/components/
├── ComparisonSection.tsx    ← MAIN FILE (This section)
├── SectionHeader.tsx         ← Section titles
├── ui/
│   ├── card.tsx             ← Card component
│   └── button.tsx           ← Button component

src/pages/
├── Index.tsx                ← Homepage (uses ComparisonSection)

src/assets/homepage/
└── makhana process.png      ← Product image
```

---

## Quick Copy-Paste Templates

### New Feature Card
```typescript
{
  icon: IconName,
  title: "Feature Title",
  description: "Feature description goes here"
},
```

### New Comparison Item
```typescript
{
  category: "Category Name",
  mereMakhana: "Our advantage statement",
  otherMakhana: "Their disadvantage statement"
},
```

### New Benefit
```typescript
"✓ Benefit Title - Benefit description here",
```

### New Reason Card
```typescript
{ 
  title: "Reason Title", 
  desc: "Reason description" 
},
```

---

## Need Help?

### Component Props Needed
The component doesn't use any props - it's self-contained.

### Data Structure Updates
All data is stored as constants at the top of the component (lines 60-127).

### Styling Systems
- Uses **Tailwind CSS** for styling
- Uses **Shadcn UI** components
- **Lucide React** for icons

### To Add External Data (Database)
Replace the constant arrays with API calls:
```typescript
const [comparisonData, setComparisonData] = useState([]);

useEffect(() => {
  fetch('/api/comparison').then(r => r.json()).then(setComparisonData);
}, []);
```

---

**Last Updated:** Nov 10, 2025
**Maintenance Level:** Easy (mostly text updates)
**Developer Skills Needed:** Basic React + Tailwind CSS
