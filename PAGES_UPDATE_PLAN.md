# Pages Update Plan - SectionHeader Implementation

## Status: IN PROGRESS

### ✅ COMPLETED PAGES (9/17)
1. ✅ Index.tsx (Homepage) - All 9 sections updated
2. ✅ About.tsx - Story, Impact, Journey sections updated
3. ✅ Farmers.tsx - Already updated
4. ✅ Agriculture.tsx - Already updated
5. ✅ QualityAssurance.tsx - Already updated
6. ✅ BlogSection.tsx - Already updated

### ⏳ PENDING PAGES (8/17)

#### Priority 1 - Core Pages
1. **Logistics.tsx** - Sections to update:
   - Logistics Solutions
   - Shipping Network
   - Tracking & Support

2. **CustomPackaging.tsx** - Sections to update:
   - Custom Packaging Solutions
   - Design Process
   - Materials & Sustainability

3. **Contact.tsx** - Sections to update:
   - Get In Touch
   - Contact Information
   - Support Channels

4. **FAQ.tsx** - Sections to update:
   - Frequently Asked Questions
   - Product FAQs
   - Shipping FAQs

#### Priority 2 - Blog & Shop
5. **Blog.tsx** - Sections to update:
   - Latest Blog Posts
   - Blog Categories

6. **BlogPost.tsx** - Sections to update:
   - Article Header
   - Related Posts

7. **Shop.tsx** - Sections to update:
   - Our Products
   - Product Categories

8. **BulkOrder.tsx** - Sections to update:
   - Bulk Order Solutions
   - Pricing & Packages

#### Priority 3 - Policy Pages
9. **Privacy.tsx** - Sections to update:
   - Privacy Policy Header
   - Data Protection

10. **Terms.tsx** - Sections to update:
    - Terms & Conditions Header
    - User Agreement

11. **ShippingPolicy.tsx** - Sections to update:
    - Shipping Policy Header
    - Delivery Information

12. **RefundPolicy.tsx** - Sections to update:
    - Refund Policy Header
    - Return Process

## SectionHeader Implementation Pattern

For each page, replace old heading patterns:

### OLD PATTERN
```tsx
<div className="text-center mb-12">
  <h2 className="text-4xl font-bold mb-6 text-heritage">Section Title</h2>
  <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
    Description text
  </p>
</div>
```

### NEW PATTERN
```tsx
<SectionHeader
  eyebrow="OPTIONAL LABEL"
  icon={IconName}
  title="Section Title"
  highlightWord="Keyword"
  highlightColor="green"
  description="Description text"
  className="mb-12"
/>
```

## Design Features
- Golden uppercase eyebrow with optional icon
- Bold title with green-highlighted keyword
- Muted description below
- Centered alignment and consistent spacing (mb-12)

## Next Steps
1. Update Logistics.tsx
2. Update CustomPackaging.tsx
3. Update Contact.tsx
4. Update FAQ.tsx
5. Update Blog.tsx
6. Update BlogPost.tsx
7. Update Shop.tsx
8. Update BulkOrder.tsx
9. Update policy pages (Privacy, Terms, ShippingPolicy, RefundPolicy)

## Completion Target
All 17 pages with consistent SectionHeader design by end of session.
