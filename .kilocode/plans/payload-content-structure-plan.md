# PayloadCMS Content Structure Plan for Security Guru Website

## Overview

This plan outlines the structuring of website content into PayloadCMS Collections and Globals to
make text content, images, and Material Symbols icons editable by the site owner. The Services
collection is already implemented and working well. Contact form content is excluded as per user
requirements.

**Critical Requirement:** Ensure visual fidelity - the website must look exactly the same after
migration. All styling, colors, and layouts must be preserved.

## Current Content Analysis

Based on component analysis, the following content needs to be made editable:

### Hero Section

- Badge text: "Saugumas Pirmiausia"
- Main heading: "Kokybė, Profesionalumas ir Inovatyvumas" (with "Kokybė" in peach color)
- Description paragraph
- Primary button: "Mūsų Paslaugos"
- Secondary button: "Gauti Pasiūlymą"
- Scroll indicator icon: "keyboard_arrow_down"

### About Section

- Subtitle: "Kodėl rinktis mus?"
- Main heading: "Saugumas reikalauja Ekspertų Dėmesio" (with "Ekspertų Dėmesio" in peach color)
- Description paragraph
- Three features with:
  - Title, description, icon ("check" for each)
- Overlay: "Garantuota Kokybė" text, description, icon ("verified_user")

### Footer

- Description paragraph
- Navigation links: "Paslaugos", "Apie mus", "Kontaktai"
- Company details: Company name, code, location
- Copyright text
- Social media links (hardcoded URLs remain static)

### Header/Navigation

- Navigation links: "Paslaugos", "Apie mus"
- Contact button text: "Susisiekti"
- Mobile menu icons: "menu", "close"

### Site Metadata

- Page title: "Security Guru"
- Meta description

### Icons Management

- Default Material Symbols list in layout
- Dynamic loading based on used icons

## Proposed Structure

### Globals

Globals are appropriate for site-wide, single-instance content:

1. **Hero** - Hero section content
2. **About** - About section content
3. **Footer** - Footer content
4. **Navigation** - Header/navigation content
5. **SiteMetadata** - Site-wide metadata

### Collections

- **Services** (already implemented) - Service offerings
- **Media** (already implemented) - Image uploads

### Custom Components for Rich Content

To enable rich text editing with colors and button types in the admin panel:

1. **RichTextWithColors** - Extended rich text editor with color selection (peach, midnight green,
   sage, mauve), plus standard formatting (bold, italic)
2. **ButtonSelector** - Component with dropdown for button type (primary/secondary) and text input
   for label

## Implementation Plan

### Phase 0: Automated Testing Setup

**Subtasks for Orchestrator:**

1. **Install Playwright**
   - Add Playwright to project dependencies
   - Configure for visual regression testing and functional tests
   - Run linting and formatting checks

2. **Create Visual Regression Tests**
   - Set up baseline screenshots of all components
   - Create tests to compare visual appearance after changes
   - Include tests for different screen sizes (responsive design)
   - Run linting and formatting checks

3. **Create Functional Tests**
   - Test button click actions and navigation
   - Verify links work correctly
   - Test form submissions (when contact form is implemented)
   - Ensure Material Symbols icons load properly
   - Run linting and formatting checks

4. **Integrate Tests into CI/CD**
   - Add test commands to package.json scripts
   - Configure tests to run on code changes
   - Set up visual diff reporting
   - Run linting and formatting checks

### Phase 1: Custom Components Development

**Subtasks for Orchestrator:**

1. **Create RichTextWithColors Component**
   - Extend Payload's rich text editor with custom color formatting feature
   - Support color palette: Peach Fuzz (#FFBC85), Midnight Green (#021614), Sage Mist (#C3C9B5),
     Dusty Mauve (#9B849A)
   - Include standard formatting (bold, italic) using Payload's built-in features

2. **Create ButtonSelector Component**
   - Build admin component with dropdown for button type (primary/secondary)
   - Include text input field for button label
   - Structure as group field with type and text properties

3. **Test Custom Components**
   - Verify rich text editor with color selection works in admin
   - Test button selector dropdown and text input
   - Ensure components integrate properly with Payload field system
   - Test standard formatting (bold, italic) alongside colors

### Phase 2: Core Globals Setup

**Subtasks for Orchestrator:**

1. **Create Hero Global**
   - Fields: badge_text, heading (rich text with colors), description, services_button (button
     selector), contact_button (button selector), scroll_icon
   - All fields required
   - Update HeroSection component to fetch and use global data

2. **Create About Global**
   - Fields: subtitle, heading (rich text with colors), description
   - Group field for features (array of: title, description, icon)
   - Group for quality_overlay: title, description, icon
   - Update AboutSection component

3. **Create Footer Global**
   - Fields: description, navigation_links (array), company_details (group), copyright_text
   - Update Footer component

4. **Create Navigation Global**
   - Fields: nav_links (array of: href, label), contact_button_text, menu_icon, close_icon
   - Update Header component

5. **Create SiteMetadata Global**
   - Fields: title, description
   - Update layout.tsx metadata

### Phase 3: Icon Management Enhancement

**Subtasks for Orchestrator:**

6. **Update Icon Loading System**
   - Add icon fields to globals
   - Modify layout.tsx to collect icons from globals and services
   - Ensure dynamic font loading includes all used icons

### Phase 4: Migration and Testing

**Subtasks for Orchestrator:**

7. **Create Migration Script**
   - Populate globals with current hardcoded values, preserving colors and button types
   - Run migration to seed initial data

8. **Update Components**
   - Modify all components to use Payload data instead of hardcoded content
   - Handle loading states and error cases
   - Ensure visual fidelity is maintained

## Field Specifications

### Hero Global

```typescript
{
  slug: 'hero',
  fields: [
    { name: 'badge_text', type: 'text', required: true },
    { name: 'heading', type: 'richText', required: true }, // Rich text with colors
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'services_button',
      type: 'group',
      fields: [
        { name: 'type', type: 'select', options: ['primary', 'secondary'], required: true },
        { name: 'text', type: 'text', required: true },
      ]
    },
    {
      name: 'contact_button',
      type: 'group',
      fields: [
        { name: 'type', type: 'select', options: ['primary', 'secondary'], required: true },
        { name: 'text', type: 'text', required: true },
      ]
    },
    { name: 'scroll_icon', type: 'text', required: true },
  ]
}
```

### About Global

```typescript
{
  slug: 'about',
  fields: [
    { name: 'subtitle', type: 'text', required: true },
    { name: 'heading', type: 'richText', required: true }, // Rich text with colors
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text', required: true },
      ]
    },
    {
      name: 'quality_overlay',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'text', required: true },
      ]
    }
  ]
}
```

### Footer Global

```typescript
{
  slug: 'footer',
  fields: [
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'navigation_links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ]
    },
    {
      name: 'company_details',
      type: 'group',
      fields: [
        { name: 'company_name', type: 'text', required: true },
        { name: 'company_code', type: 'text', required: true },
        { name: 'location', type: 'text', required: true },
      ]
    },
    { name: 'copyright_text', type: 'text', required: true },
  ]
}
```

### Navigation Global

```typescript
{
  slug: 'navigation',
  fields: [
    {
      name: 'nav_links',
      type: 'array',
      fields: [
        { name: 'href', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ]
    },
    { name: 'contact_button_text', type: 'text', required: true },
    { name: 'menu_icon', type: 'text', required: true },
    { name: 'close_icon', type: 'text', required: true },
  ]
}
```

### SiteMetadata Global

```typescript
{
  slug: 'site-metadata',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ]
}
```

## Verification Steps

### Automated Verification

- Run TypeScript compilation: `yarn build`
- Run ESLint: `yarn lint`
- Run Payload type generation: `yarn payload generate:types`
- Test Payload admin panel access and global editing
- Verify component rendering with Payload data

### Manual Verification (by user)

- Access Payload admin panel
- Edit each global and verify changes appear on frontend
- Test all text content is editable
- Verify icons load correctly after changes
- Check responsive design still works
- Test navigation links function properly
- Verify metadata updates in page source

## Implementation Notes

- Use Payload's rich text rendering system for frontend display of rich text content
- Use existing Media collection for any future image uploads
- Services collection remains unchanged
- Icons are Material Symbols font names (text fields)
- All text fields are required to ensure content completeness
- Components should handle loading states gracefully
- Maintain existing styling and animations
- Preserve accessibility features
- Rich text fields will support color formatting alongside standard formatting (bold, italic)
- **Git Workflow:** After each phase is completed and verified to work as intended, commit the
  changes locally (do NOT push to remote)

## Dependencies

- PayloadCMS already configured (reference https://payloadcms.com/llms.txt for implementation
  details)
- Existing Services and Media collections
- Component structure established

## Risk Mitigation

- Create backup of current components before modification
- Implement globals one at a time for easier debugging
- Test each component individually after updates
- Ensure fallback values for required fields during development

## Progress Tracking

### Phase Completion Checklist

- [ ] Phase 0: Automated Testing Setup
- [ ] Phase 1: Custom Components Development
- [ ] Phase 2: Core Globals Setup
- [ ] Phase 3: Icon Management Enhancement
- [ ] Phase 4: Migration and Testing

### Subtask Completion Checklist

#### Phase 0: Automated Testing Setup

- [ ] 0.1 Install Playwright
- [ ] 0.2 Create Visual Regression Tests
- [ ] 0.3 Create Functional Tests
- [ ] 0.4 Integrate Tests into CI/CD

#### Phase 1: Custom Components Development

- [ ] 1.1 Create RichTextWithColors Component
- [ ] 1.2 Create ButtonSelector Component
- [ ] 1.3 Test Custom Components

#### Phase 2: Core Globals Setup

- [ ] 2.1 Create Hero Global
- [ ] 2.2 Create About Global
- [ ] 2.3 Create Footer Global
- [ ] 2.4 Create Navigation Global
- [ ] 2.5 Create SiteMetadata Global

#### Phase 3: Icon Management Enhancement

- [ ] 3.1 Update Icon Loading System

#### Phase 4: Migration and Testing

- [ ] 4.1 Create Migration Script
- [ ] 4.2 Update Components

### Issues Faced

_Record any issues encountered during implementation here. Include phase/subtask where issue
occurred and resolution._

### Notes for Next Phase Execution

_Record important notes, learnings, or prerequisites for upcoming phases._

This plan is structured for execution by Kilo Code's Orchestrator mode, with subtasks sized to
optimize context window usage while maintaining logical grouping of related changes. Update the
checklists, issues, and notes after completing each subtask.

Avoid running `yarn dev` or other long-running or not automatically complete-able commands without a
timeout.
