# SectionHeader Component - Quick Reference Guide

## 📌 What is SectionHeader?

A reusable React component that standardizes all section titles across the Makario website with a professional, consistent design.

---

## 🚀 Quick Start

### Import
```tsx
import SectionHeader from "@/components/SectionHeader";
```

### Basic Usage
```tsx
<SectionHeader
  title="Your Section Title"
  description="Optional description text"
  className="mb-12"
/>
```

---

## 📋 All Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | string | ✅ Yes | - | Main section title |
| `subtitle` | string | ❌ No | - | Optional subtitle |
| `description` | string | ❌ No | - | Optional description |
| `icon` | LucideIcon | ❌ No | - | Icon for eyebrow label |
| `eyebrow` | string | ❌ No | - | Label above title |
| `align` | 'left' \| 'center' \| 'right' | ❌ No | 'center' | Text alignment |
| `className` | string | ❌ No | '' | Additional CSS classes |
| `titleClassName` | string | ❌ No | '' | Title-specific CSS |
| `highlightWord` | string | ❌ No | - | Word to highlight in title |
| `highlightColor` | 'golden' \| 'nature' \| 'green' \| 'heritage' | ❌ No | 'golden' | Highlight color |

---

## 💡 Usage Examples

### Example 1: Simple Title
```tsx
<SectionHeader
  title="Our Products"
  className="mb-12"
/>
```

### Example 2: With Description
```tsx
<SectionHeader
  title="Why Choose Us"
  description="Discover the exceptional quality that makes our makhana the preferred choice worldwide"
  className="mb-12"
/>
```

### Example 3: With Eyebrow and Icon
```tsx
import { Award } from "lucide-react";

<SectionHeader
  eyebrow="FEATURED COLLECTION"
  icon={Award}
  title="Season's Top Picks"
  description="Handpicked premium products for you"
  className="mb-12"
/>
```

### Example 4: With Highlighted Word
```tsx
<SectionHeader
  title="Why Choose Bihar Makhana?"
  highlightWord="Bihar"
  highlightColor="golden"
  description="Discover the exceptional quality"
  className="mb-12"
/>
```

### Example 5: Left Aligned
```tsx
<SectionHeader
  title="Our Story"
  description="From Bihar's heritage to your table"
  align="left"
  className="mb-12"
/>
```

### Example 6: With Subtitle
```tsx
<SectionHeader
  title="Quality Assurance"
  subtitle="Our Commitment to Excellence"
  description="We maintain the highest standards"
  className="mb-12"
/>
```

---

## 🎨 Color Options

### Highlight Colors
- `'golden'` - Warm gold accent (default)
- `'nature'` - Green accent
- `'green'` - Bright green accent
- `'heritage'` - Dark brown accent

### Example
```tsx
<SectionHeader
  title="Organic Farming"
  highlightWord="Organic"
  highlightColor="nature"
  className="mb-12"
/>
```

---

## 📐 Alignment Options

### Center (Default)
```tsx
<SectionHeader
  title="Centered Title"
  align="center"
  className="mb-12"
/>
```

### Left
```tsx
<SectionHeader
  title="Left Aligned Title"
  align="left"
  className="mb-12"
/>
```

### Right
```tsx
<SectionHeader
  title="Right Aligned Title"
  align="right"
  className="mb-12"
/>
```

---

## 🎯 Common Patterns

### Pattern 1: Homepage Section
```tsx
<section className="py-16">
  <div className="container mx-auto px-4">
    <SectionHeader
      eyebrow="OUR BLOG"
      title="Latest from Our Blog"
      description="Stay updated with the latest news and stories"
      className="mb-12"
    />
    {/* Content here */}
  </div>
</section>
```

### Pattern 2: Feature Section
```tsx
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <SectionHeader
      title="Why Choose Us"
      description="Discover what makes us different"
      className="mb-12"
    />
    {/* Feature cards here */}
  </div>
</section>
```

### Pattern 3: With Icon
```tsx
import { Shield } from "lucide-react";

<SectionHeader
  eyebrow="QUALITY ASSURANCE"
  icon={Shield}
  title="Our Quality Standards"
  description="Rigorous testing and certification"
  className="mb-12"
/>
```

---

## 🔧 Customization

### Add Custom CSS
```tsx
<SectionHeader
  title="Custom Styled Title"
  className="mb-12 custom-class"
  titleClassName="text-red-600"
  description="Custom styling applied"
/>
```

### Responsive Spacing
```tsx
<SectionHeader
  title="Responsive Title"
  className="mb-8 md:mb-12 lg:mb-16"
  description="Spacing adjusts on different screens"
/>
```

---

## 📱 Responsive Behavior

The component automatically adjusts for different screen sizes:

| Screen | Title Size | Spacing |
|--------|-----------|---------|
| Mobile | 3xl | Compact |
| Tablet | 4xl | Medium |
| Desktop | 5xl | Full |

---

## ✨ Visual Features

1. **Eyebrow Label**: Small uppercase text with optional icon
2. **Main Title**: Bold, large, heritage color
3. **Subtitle**: Optional secondary heading
4. **Description**: Muted text with optimal line height
5. **Underline**: Subtle gradient accent line

---

## 🎓 Best Practices

1. **Always include a title** - It's required
2. **Use eyebrow for categories** - Helps organize content
3. **Keep descriptions concise** - 1-2 sentences max
4. **Use icons with eyebrow** - Improves visual hierarchy
5. **Highlight key words** - Use highlightWord for emphasis
6. **Maintain consistency** - Use same alignment throughout page
7. **Add proper spacing** - Use className for mb-12 or similar

---

## 🐛 Troubleshooting

### Title not showing?
- Check that `title` prop is provided
- Verify text is not empty

### Underline not visible?
- Only shows when `align="center"`
- Check if custom CSS is overriding it

### Icon not showing?
- Import icon from lucide-react
- Pass icon to `icon` prop
- Ensure `eyebrow` prop is also set

### Colors not applying?
- Use valid highlightColor values
- Check if custom CSS is overriding
- Verify color names are correct

---

## �� Related Files

- **Component**: `src/components/SectionHeader.tsx`
- **Examples**: 
  - `src/pages/Index.tsx`
  - `src/pages/About.tsx`
  - `src/pages/Farmers.tsx`
  - `src/pages/Agriculture.tsx`
  - `src/pages/QualityAssurance.tsx`

---

## 🎯 Implementation Checklist

When adding SectionHeader to a new page:

- [ ] Import SectionHeader component
- [ ] Identify all section titles
- [ ] Replace old title markup with SectionHeader
- [ ] Add appropriate eyebrow labels
- [ ] Add icons if needed
- [ ] Add descriptions
- [ ] Test responsive design
- [ ] Verify colors and spacing
- [ ] Check alignment

---

## 💬 Questions?

Refer to the component file for more details:
`src/components/SectionHeader.tsx`

---

**Version**: 1.0
**Last Updated**: 2025
**Status**: ✅ Active
