# Blog System Testing Guide

## Quick Reference

### Blog Section on Homepage
- **Location:** After "Why Choose Us" section
- **Display:** 4 featured blog cards in a responsive grid
- **Features:** 
  - Blog image with hover effect (scale-up)
  - Category badge
  - Blog title
  - Excerpt text
  - Author and date info
  - Read time estimate
  - "Read More" link button

### Blog Pages Available

#### 1. Blog Listing Page
- **URL:** `/blog`
- **What It Shows:** All 22 blog posts organized by category
- **Features:**
  - Hero section with blog intro
  - Category filter buttons (All, Katihar Region, Purnea Region, Bihar Statewide)
  - Grid of blog post cards (3 columns on desktop, 1 on mobile)
  - Each card shows: image, date, author, category, tags, excerpt
  - Newsletter signup section
  - Load more button (placeholder)

#### 2. Individual Blog Posts
- **URL Pattern:** `/blog/{slug}`
- **Available Posts:**

**Katihar Region Posts:**
1. `/blog/katihar-premium-makhana-production-hub`
2. `/blog/makario-katihar-bihar-handpicked-makhana`
3. `/blog/katihar-farmers-makhana-revolution-bihar`
4. `/blog/katihar-makhana-bulk-buyers-top-reasons`
5. `/blog/makario-sourcing-raw-makhana-katihar`
6. `/blog/katihar-bihar-makhana-journey-nation`
7. `/blog/katihar-raw-handpicked-makhana-quality`

**Purnea Region Posts:**
8. `/blog/purnea-bihar-makhana-trade-growth`
9. `/blog/purnea-makhana-wholesalers-india-supply`
10. `/blog/makario-purnea-bihar-makhana-network`
11. `/blog/purnea-makhana-distribution-hub`
12. `/blog/purnea-farmers-makhana-supply-chain`

**Bihar Statewide Posts:**
13. `/blog/bihar-birthplace-india-best-makhana`
14. `/blog/bihar-makhana-global-popularity-2025`
15. `/blog/bihar-makhana-producing-districts-guide`
16. `/blog/bihar-makhana-tradition-modern-trade`
17. `/blog/bihar-climate-makhana-quality-taste`
18. `/blog/bihar-top-makhana-wholesalers-exporters`
19. `/blog/bihar-farmers-makhana-heritage-alive`
20. `/blog/bihar-raw-roasted-makhana-export`
21. `/blog/bihar-makhana-economic-impact-farming`
22. `/blog/makario-ars-bihar-makhana-identity`

## Features to Test

### On Homepage
- [ ] Blog section displays 4 featured blogs
- [ ] Blog images load correctly
- [ ] Hover effects work (image scale-up, color change)
- [ ] "View All Posts" button navigates to `/blog`
- [ ] Links navigate to correct blog post
- [ ] Responsive design on mobile (1 column)

### On Blog Listing Page (`/blog`)
- [ ] Page loads without errors
- [ ] Hero section displays properly
- [ ] All 22 blog posts display in grid
- [ ] Category badges show correctly
- [ ] Category filter buttons are interactive (visual feedback)
- [ ] Blog cards are clickable
- [ ] Images load properly
- [ ] Newsletter signup form displays
- [ ] Page is responsive on mobile, tablet, desktop

### On Individual Blog Post
- [ ] URL matches blog slug format
- [ ] Hero image displays properly
- [ ] Blog title displays in hero
- [ ] Author, date, category, read time show in hero
- [ ] Blog content renders with proper formatting
- [ ] Headers are styled correctly
- [ ] Paragraphs have proper spacing
- [ ] Social share buttons work (Facebook, Twitter, WhatsApp)
- [ ] Related posts section shows 3 other posts
- [ ] Related post links work correctly
- [ ] Navigation back to blog list works

## Performance Considerations

- Blog images are cached at build time
- BlogPost component uses lazy loading
- Related posts are filtered and limited to 3
- Grid layout uses CSS Grid for optimal performance

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (Windows)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers (Chrome on Android, Safari on iOS)

## Responsive Design Breakpoints

- Mobile: < 768px (1 column grid)
- Tablet: 768px - 1024px (2 column grid)
- Desktop: > 1024px (3-4 column grid)

## Navigation Flow

1. User visits homepage → Sees blog section with featured posts
2. User clicks blog card → Navigates to individual blog post
3. User clicks "View All Posts" → Goes to blog listing page
4. User on blog listing → Can filter by category or click posts
5. User on blog post → Can see related posts and share on social

## Known Limitations

- Blog comments not yet implemented (can be added later)
- Category filtering is visual only (needs logic to filter)
- Search functionality placeholder only
- Newsletter signup doesn't save email (needs backend)

## Debugging Tips

If a blog post doesn't load:
1. Check the URL slug matches the key in blogPosts object in BlogPost.tsx
2. Check that the blog image exists in /src/assets/blog/
3. Check browser console for any errors
4. Verify the route is correct in App.tsx

If images don't load:
1. Verify image path is correct
2. Check file exists in /src/assets/blog/
3. Try hard refresh (Ctrl+Shift+R)
4. Check image file format (.jpg, .webp, .png)

---

**Test Date:** November 10, 2025
**Last Updated:** November 10, 2025
