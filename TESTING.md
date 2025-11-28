# Testing Guide

This document describes how to test the portfolio website.

## 🧪 Manual Testing Checklist

### Navigation
- [ ] Navbar is visible on all pages
- [ ] Mobile menu opens and closes correctly
- [ ] All navigation links scroll to correct sections
- [ ] Logo link returns to top
- [ ] Theme toggle works (light/dark mode)
- [ ] Theme preference persists after page reload

### Hero Section
- [ ] Profile image loads correctly
- [ ] All text displays properly
- [ ] Social media links open in new tabs
- [ ] "Get in Touch" button scrolls to contact section
- [ ] "View Projects" button scrolls to projects section
- [ ] Animations play smoothly
- [ ] Scroll indicator appears and functions

### About Section
- [ ] All highlight cards display correctly
- [ ] Text is readable and formatted properly
- [ ] Cards have hover effects
- [ ] Icons display correctly

### Skills Section
- [ ] All skill categories show correctly
- [ ] Skill tags are visible and styled
- [ ] Hover effects work on skill tags
- [ ] Layout is responsive

### Projects Section
- [ ] All 5 projects display correctly
- [ ] Project cards have proper spacing
- [ ] Tags are visible on each project
- [ ] GitHub buttons link correctly
- [ ] Demo buttons link correctly (where applicable)
- [ ] Buttons only show when URLs are provided
- [ ] Cards have hover effects

### Experience Section
- [ ] Experience items display in timeline format
- [ ] Certification list is formatted correctly
- [ ] Icons display properly
- [ ] Timeline connector line is visible

### Contact Section
- [ ] Contact information cards display correctly
- [ ] Email and phone links work (mailto: and tel:)
- [ ] Social media links open in new tabs
- [ ] Form fields accept input
- [ ] Form validation works (required fields)
- [ ] Success toast appears on form submission
- [ ] Form clears after submission

### Footer
- [ ] Copyright year is current
- [ ] Footer text is centered and visible

### Responsive Design
- [ ] Desktop view (1920px+): All elements aligned properly
- [ ] Laptop view (1024px-1920px): Content scales appropriately
- [ ] Tablet view (768px-1024px): Layout adjusts correctly
- [ ] Mobile view (375px-768px): Mobile menu works, content stacks
- [ ] Small mobile (320px-375px): No horizontal scroll, readable text

### Performance
- [ ] Page loads in under 3 seconds
- [ ] Images are optimized and load quickly
- [ ] No console errors in browser DevTools
- [ ] Smooth scrolling and animations
- [ ] No layout shifts during load

### Accessibility
- [ ] All images have alt text
- [ ] Color contrast is sufficient
- [ ] Keyboard navigation works (Tab key)
- [ ] Focus indicators are visible
- [ ] Screen reader friendly (semantic HTML)

### Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers (Chrome, Safari)

### SEO & Meta Tags
- [ ] Page title displays correctly in browser tab
- [ ] Meta description is present
- [ ] Open Graph tags for social sharing
- [ ] Favicon displays correctly
- [ ] Canonical URL is set

## 🔧 Automated Testing

### Build Test
```bash
npm run build
```
Expected: Build completes successfully with no errors

### Lint Test
```bash
npm run lint
```
Expected: Only warnings (no errors), all related to fast-refresh

### Preview Production Build
```bash
npm run build
npm run preview
```
Then manually test in browser at http://localhost:4173

## 🐛 Common Issues & Solutions

### Issue: Images not loading
**Solution**: Check that images are in `src/assets/` and paths are correct

### Issue: Animations not working
**Solution**: Check that Tailwind animations are configured in `tailwind.config.ts`

### Issue: Theme not persisting
**Solution**: Check browser localStorage and ThemeProvider implementation

### Issue: Build fails
**Solution**: 
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Issue: 404 on refresh in production
**Solution**: Ensure redirect rules are configured (netlify.toml, vercel.json)

## 📊 Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### WebPageTest
Test at: https://www.webpagetest.org/
- First Contentful Paint: < 1.5s
- Speed Index: < 2.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

## 🔍 Debug Mode

To enable detailed logging:
1. Open browser DevTools Console
2. Look for any errors or warnings
3. Check Network tab for failed requests
4. Monitor Performance tab for bottlenecks

## ✅ Pre-Deployment Checklist

Before deploying:
- [ ] All tests pass
- [ ] No console errors
- [ ] Build succeeds
- [ ] Preview looks correct
- [ ] All links tested
- [ ] Mobile responsive checked
- [ ] Performance acceptable
- [ ] Personal info updated
- [ ] Project URLs correct
- [ ] Profile image updated

## 📝 Test Report Template

```markdown
## Test Report - [Date]

### Environment
- Browser: 
- OS: 
- Screen Size: 

### Test Results
- Navigation: ✅/❌
- Hero Section: ✅/❌
- About Section: ✅/❌
- Skills Section: ✅/❌
- Projects Section: ✅/❌
- Experience Section: ✅/❌
- Contact Section: ✅/❌
- Responsive Design: ✅/❌
- Performance: ✅/❌

### Issues Found
1. [Issue description]
2. [Issue description]

### Notes
[Additional observations]
```

## 🚀 Continuous Testing

For ongoing development:
1. Test after every major change
2. Run build before committing
3. Check responsive design regularly
4. Monitor performance metrics
5. Review accessibility periodically

---

Remember: Quality > Speed. Take time to test thoroughly!
