# Security Guru - Playwright Test Plan

## Overview

This is a **single-page application** with scroll-based navigation to sections (`#services`,
`#about`, `#contact`). The existing Playwright config points to
`https://securityguru-dev.namutv.uk/` as the base URL.

---

## 1. Visual Regression Tests

| Test Name                 | Viewport      | Target Element        | Priority |
| ------------------------- | ------------- | --------------------- | -------- |
| `homepage-full-page`      | 1920×1080     | Full page capture     | Critical |
| `header-desktop`          | 1920×1080     | Navigation header     | Critical |
| `header-mobile-menu-open` | 375×667       | Mobile dialog overlay | High     |
| `hero-section`            | Full viewport | Hero with animations  | Critical |
| `services-section`        | Full viewport | Service cards grid    | Critical |
| `about-section`           | Full viewport | About content layout  | Critical |
| `contact-section`         | Full viewport | Contact form layout   | Critical |
| `footer`                  | Full viewport | Footer with links     | High     |

### Recommended Viewports for Visual Testing

| Viewport      | Width | Height | Use Case               |
| ------------- | ----- | ------ | ---------------------- |
| Mobile        | 375   | 667    | Standard mobile layout |
| Tablet        | 768   | 1024   | Tablet layout          |
| Desktop       | 1920  | 1080   | Primary desktop        |
| Large Desktop | 2560  | 1440   | Large screens          |

---

## 2. Navigation Tests

Excludes form submit button as requested.

### 2.1 Desktop Navigation

| Test             | Action                     | Expected Result             |
| ---------------- | -------------------------- | --------------------------- |
| `paslaugos-link` | Click "Paslaugos" nav link | URL changes to `/#services` |
| `apie-mus-link`  | Click "Apie mus" nav link  | URL changes to `/#about`    |
| `susisiekti-cta` | Click peach CTA button     | URL changes to `/#contact`  |

### 2.2 Mobile Navigation

| Test                  | Action                   | Expected Result                   |
| --------------------- | ------------------------ | --------------------------------- |
| `mobile-menu-opens`   | Click hamburger menu     | Dialog becomes visible            |
| `mobile-menu-closes`  | Click close button       | Dialog becomes hidden             |
| `mobile-link-scrolls` | Click nav link in dialog | Dialog closes, scrolls to section |

### 2.3 Footer Navigation

| Test                   | Action                      | Expected Result        |
| ---------------------- | --------------------------- | ---------------------- |
| `footer-services-link` | Click "Paslaugos" in footer | Scrolls to `#services` |
| `footer-about-link`    | Click "Apie mus" in footer  | Scrolls to `#about`    |
| `footer-contact-link`  | Click "Kontaktai" in footer | Scrolls to `#contact`  |

### 2.4 Hero CTAs

| Test                | Action                  | Expected Result        |
| ------------------- | ----------------------- | ---------------------- |
| `hero-services-cta` | Click "Mūsų Paslaugos"  | Scrolls to `#services` |
| `hero-offer-cta`    | Click "Gauti Pasiūlymą" | Scrolls to `#contact`  |

### 2.5 Social Links

| Test                      | Action               | Expected Result       |
| ------------------------- | -------------------- | --------------------- |
| `facebook-opens-new-tab`  | Check Facebook link  | Has `target="_blank"` |
| `instagram-opens-new-tab` | Check Instagram link | Has `target="_blank"` |

---

## 3. Responsive Tests

### 3.1 Header Layout

| Viewport          | Expected Nav | Expected Hamburger |
| ----------------- | ------------ | ------------------ |
| Mobile (< 768px)  | Hidden       | Visible            |
| Desktop (≥ 768px) | Visible      | Hidden             |

### 3.2 Services Grid

| Viewport            | Columns |
| ------------------- | ------- |
| Mobile (< 768px)    | 1       |
| Tablet (768-1024px) | 2       |
| Desktop (≥ 1024px)  | 3       |

---

## 4. Scroll State Tests

| Test                  | Action            | Expected Result                                |
| --------------------- | ----------------- | ---------------------------------------------- |
| `header-scroll-state` | Scroll down >50px | Header gets dark background with backdrop-blur |

---

## 5. Components & Interactive Elements

### 5.1 Header Component

**File:** [`src/components/Header.tsx`](src/components/Header.tsx:1)

| Element            | Type        | Target        |
| ------------------ | ----------- | ------------- |
| Logo               | Image       | -             |
| "Paslaugos"        | Link        | `#services`   |
| "Apie mus"         | Link        | `#about`      |
| "Susisiekti"       | Button/Link | `#contact`    |
| Mobile Menu Toggle | Button      | Toggle dialog |

### 5.2 Footer Component

**File:** [`src/components/Footer.tsx`](src/components/Footer.tsx:1)

| Element     | Type | Target      |
| ----------- | ---- | ----------- |
| "Paslaugos" | Link | `#services` |
| "Apie mus"  | Link | `#about`    |
| "Kontaktai" | Link | `#contact`  |
| Facebook    | Link | External    |
| Instagram   | Link | External    |

### 5.3 Hero Section

**File:** [`src/components/HeroSection.tsx`](src/components/HeroSection.tsx:1)

| Element           | Type       | Target      |
| ----------------- | ---------- | ----------- |
| "Mūsų Paslaugos"  | CTA Button | `#services` |
| "Gauti Pasiūlymą" | CTA Button | `#contact`  |

### 5.4 Services Section

**File:** [`src/components/ServicesSection.tsx`](src/components/ServicesSection.tsx:1)

Dynamic content from PayloadCMS. Each card contains:

- Service image
- Icon
- Title
- Description
- Price tag

---

## 6. Color Palette (Visual Reference)

| Color Name     | Hex       | Usage                                   |
| -------------- | --------- | --------------------------------------- |
| Peach Fuzz     | `#FFBC85` | Primary CTAs, highlights, sale tags     |
| Midnight Green | `#021614` | Headings, text, footer, strong contrast |
| Sage Mist      | `#C3C9B5` | Backgrounds, secondary buttons, borders |
| Dusty Mauve    | `#9B849A` | Accents, icons, typography highlights   |

---

## 7. Test Coverage Summary

| Category           | Test Count | Priority |
| ------------------ | ---------- | -------- |
| Visual Regression  | 8          | Critical |
| Desktop Navigation | 3          | High     |
| Mobile Navigation  | 3          | High     |
| Footer Navigation  | 3          | Medium   |
| Hero CTAs          | 2          | High     |
| Social Links       | 2          | Low      |
| Responsive Layout  | 5          | High     |
| Scroll States      | 1          | Medium   |
| **Total**          | **~25-30** | -        |

---

## 8. Implementation

### 8.1 Recommended Playwright Config Updates

```typescript
// playwright.config.ts
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 100,
    threshold: 0.2,
  },
},
projects: [
  { name: 'Mobile', use: { viewport: { width: 375, height: 667 } } },
  { name: 'Tablet', use: { viewport: { width: 768, height: 1024 } } },
  { name: 'Desktop', use: { viewport: { width: 1920, height: 1080 } } },
],
```

### 8.2 Test File Structure

```text
e2e/
├── visual.spec.ts        # Visual regression tests
├── navigation.spec.ts    # Navigation tests (excludes form submit)
├── responsive.spec.ts    # Responsive layout tests
└── scroll-states.spec.ts # Scroll behavior tests
```

### 8.3 Running Tests

```bash
# Install browsers
yarn playwright install chromium

# Run all tests
yarn playwright test

# Run specific test file
yarn playwright test e2e/navigation.spec.ts

# Run with visual comparison
yarn playwright test --update-snapshots
```

---

## 9. File References

| File                                                                         | Purpose                |
| ---------------------------------------------------------------------------- | ---------------------- |
| [`playwright.config.ts`](playwright.config.ts:1)                             | Test configuration     |
| [`e2e/example.spec.ts`](e2e/example.spec.ts:1)                               | Existing test patterns |
| [`src/components/Header.tsx`](src/components/Header.tsx:1)                   | Navigation             |
| [`src/components/Footer.tsx`](src/components/Footer.tsx:1)                   | Footer links           |
| [`src/components/HeroSection.tsx`](src/components/HeroSection.tsx:1)         | Hero CTAs              |
| [`src/components/ServicesSection.tsx`](src/components/ServicesSection.tsx:1) | Service cards          |
| [`src/components/AboutSection.tsx`](src/components/AboutSection.tsx:1)       | About content          |
| [`src/components/ContactSection.tsx`](src/components/ContactSection.tsx:1)   | Contact form           |
| [`src/lib/use-disclosure.ts`](src/lib/use-disclosure.ts:1)                   | Mobile menu state      |

---

## 10. CI Integration Recommendations

1. Run visual tests on all PRs to main/develop
2. Store baseline screenshots in the repository
3. Fail builds on visual regressions (configurable threshold)
4. Report visual diffs in PR comments

---

_Last Updated:_ 2026-01-28
