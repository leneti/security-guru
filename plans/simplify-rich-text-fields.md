# Implementation Plan: Simplify Rich Text Fields

## Overview

This plan outlines the steps to replace Lexical Rich Text Editor fields with simple text fields for the Hero and About sections, with automatic color styling applied on the frontend.

### Goals

1. **Hero heading**: Replace `richText` with `text` field, auto-color the first word (until first comma `,`)
2. **About heading**: Replace `richText` with `text` field, auto-color the last two words

---

## Current State Analysis

### Hero Collection (`src/collections/Hero.ts`)

- **Field**: `heading` (type: `richText`)
- **Current data**: `"Kokybė, Profesionalumas ir Inovatyvumas"`
- **Color logic**: First word "Kokybė" is colored with peach (#FFBC85)

### About Collection (`src/collections/About.ts`)

- **Field**: `heading` (type: `richText`)
- **Current data**: `"Saugumas reikalauja Ekspertų Dėmesio"`
- **Color logic**: Last two words "Ekspertų Dėmesio" are colored with peach (#FFBC85)

### Frontend Rendering

- Both `HeroSection.tsx` and `AboutSection.tsx` use `RichTextRenderer` component
- `RichTextRenderer` handles complex Lexical document structure with color support

### Type Definitions (`src/payload-types.ts`)

- `Hero.heading`: `{ [k: string]: unknown }` (Lexical JSON structure)
- `About.heading`: `{ [k: string]: unknown }` (Lexical JSON structure)

---

## Files to Modify

| File                                        | Change Type    | Description                                                    |
| ------------------------------------------- | -------------- | -------------------------------------------------------------- |
| `src/collections/Hero.ts`                   | Modify         | Change `heading` from `richText` to `text`                     |
| `src/collections/About.ts`                  | Modify         | Change `heading` from `richText` to `text`                     |
| `src/components/HeroSection.tsx`            | Modify         | Replace `RichTextRenderer` with new `ColoredHeading` component |
| `src/components/AboutSection.tsx`           | Modify         | Replace `RichTextRenderer` with new `ColoredHeading` component |
| `src/components/payload/ColoredHeading.tsx` | Create         | New component for auto-coloring text                           |
| `src/migrations/seed-globals.ts`            | Modify         | Update seed data to use plain text strings                     |
| `src/payload-types.ts`                      | Auto-generated | Will be regenerated after schema changes                       |

### Files That Can Be Removed (Optional Cleanup)

These files become unused after the change and can be removed if no other rich text fields exist:

- `src/components/payload/RichTextRenderer.tsx`
- `src/components/payload/RichTextWithColors.tsx`
- `src/components/payload/ColorFeature.ts`

**Note**: Check if other fields still use rich text before removing these files.

---

## Detailed Changes

### Step 1: Create the ColoredHeading Component

**File**: `src/components/payload/ColoredHeading.tsx` (new file)

```typescript
interface ColoredHeadingProps {
  text: string;
  variant: 'hero' | 'about';
  className?: string;
}

/**
 * Component that automatically applies color styling to headings.
 * - Hero variant: Colors the first word (until first comma)
 * - About variant: Colors the last two words
 */
export function ColoredHeading({ text, variant, className = '' }: ColoredHeadingProps) {
  if (variant === 'hero') {
    // Find first comma to determine first "word"
    const commaIndex = text.indexOf(',');
    if (commaIndex === -1) {
      // No comma found, color the first word by space
      const spaceIndex = text.indexOf(' ');
      if (spaceIndex === -1) {
        return <span className={className}>{text}</span>;
      }
      return (
        <span className={className}>
          <span className="text-primary">{text.slice(0, spaceIndex)}</span>
          {text.slice(spaceIndex)}
        </span>
      );
    }
    // Color everything before the first comma
    return (
      <span className={className}>
        <span className="text-primary">{text.slice(0, commaIndex)}</span>
        {text.slice(commaIndex)}
      </span>
    );
  }

  if (variant === 'about') {
    // Color the last two words
    const words = text.split(' ');
    if (words.length < 2) {
      return <span className={className}>{text}</span>;
    }
    const lastTwoWords = words.slice(-2).join(' ');
    const restOfText = words.slice(0, -2).join(' ');

    return (
      <span className={className}>
        {restOfText}{restOfText ? ' ' : ''}
        <span className="text-primary">{lastTwoWords}</span>
      </span>
    );
  }

  return <span className={className}>{text}</span>;
}
```

### Step 2: Modify Hero Collection

**File**: `src/collections/Hero.ts`

**Change**: Replace `richText` field with `text` field

```diff
  {
    name: "heading",
-   type: "richText",
+   type: "text",
    required: true,
  },
```

### Step 3: Modify About Collection

**File**: `src/collections/About.ts`

**Change**: Replace `richText` field with `text` field

```diff
  {
    name: "heading",
-   type: "richText",
+   type: "text",
    required: true,
  },
```

### Step 4: Update HeroSection Component

**File**: `src/components/HeroSection.tsx`

**Changes**:

1. Remove `RichTextRenderer` import
2. Add `ColoredHeading` import
3. Update `HeroData` interface - change `heading` type from `Hero["heading"]` to `string`
4. Update `DEFAULT_HERO_DATA.heading` to be a plain string
5. Replace `<RichTextRenderer content={data.heading} />` with `<ColoredHeading text={data.heading} variant="hero" />`

```diff
- import { RichTextRenderer } from "@/components/payload/RichTextRenderer";
+ import { ColoredHeading } from "@/components/payload/ColoredHeading";

  interface HeroData {
    badge_text: string;
-   heading: Hero["heading"];
+   heading: string;
    // ... rest unchanged
  }

  const DEFAULT_HERO_DATA: HeroData = {
    badge_text: "Saugumas Pirmiausia",
-   heading: [
-     {
-       type: "p",
-       children: [
-         { text: "", format: 0 },
-         {
-           text: "Kokybė",
-           format: 0,
-           styles: [{ color: "#FFBC85" }],
-         },
-         { text: ", Profesionalumas", format: 0 },
-         { text: "\n", format: 0 },
-         { text: "ir Inovatyvumas", format: 0 },
-       ],
-     },
-   ] as unknown as Hero["heading"],
+   heading: "Kokybė, Profesionalumas ir Inovatyvumas",
    // ... rest unchanged
  };

  // In the JSX:
-   <RichTextRenderer content={data.heading} />
+   <ColoredHeading text={data.heading} variant="hero" />
```

### Step 5: Update AboutSection Component

**File**: `src/components/AboutSection.tsx`

**Changes**:

1. Remove `RichTextRenderer` import
2. Add `ColoredHeading` import
3. Update `AboutData` interface - change `heading` type from `About["heading"]` to `string`
4. Update `DEFAULT_ABOUT_DATA.heading` to be a plain string
5. Replace `<RichTextRenderer content={data.heading} />` with `<ColoredHeading text={data.heading} variant="about" />`

```diff
- import { RichTextRenderer } from "@/components/payload/RichTextRenderer";
+ import { ColoredHeading } from "@/components/payload/ColoredHeading";

  interface AboutData {
    subtitle: string;
-   heading: About["heading"];
+   heading: string;
    // ... rest unchanged
  }

  const DEFAULT_ABOUT_DATA: AboutData = {
    subtitle: "Kodėl rinktis mus?",
-   heading: [
-     {
-       type: "p",
-       children: [
-         { text: "Saugumas reikalauja ", format: 0 },
-         {
-           text: "Ekspertų Dėmesio",
-           format: 0,
-           styles: [{ color: "#FFBC85" }],
-         },
-       ],
-     },
-   ] as unknown as About["heading"],
+   heading: "Saugumas reikalauja Ekspertų Dėmesio",
    // ... rest unchanged
  };

  // In the JSX:
-   <RichTextRenderer content={data.heading} />
+   <ColoredHeading text={data.heading} variant="about" />
```

### Step 6: Update Seed Data

**File**: `src/migrations/seed-globals.ts`

**Changes**:

1. Simplify `seedHero` to use plain text string
2. Simplify `seedAbout` to use plain text string
3. Remove or simplify `createLexicalRichText` helper if no longer needed

```diff
  async function seedHero(payload: Payload) {
    const heroData = {
      badge_text: "Saugumas Pirmiausia",
-     heading: createLexicalRichText([
-       { text: "Kokybė", color: "#FFBC85" },
-       { text: ", Profesionalumas ir Inovatyvumas" },
-     ]),
+     heading: "Kokybė, Profesionalumas ir Inovatyvumas",
      // ... rest unchanged
    };
    // ...
  }

  async function seedAbout(payload: Payload) {
    const aboutData = {
      subtitle: "Kodėl rinktis mus?",
-     heading: createLexicalRichText([
-       { text: "Saugumas reikalauja " },
-       { text: "Ekspertų Dėmesio", bold: true, color: "#FFBC85" },
-     ]),
+     heading: "Saugumas reikalauja Ekspertų Dėmesio",
      // ... rest unchanged
    };
    // ...
  }
```

### Step 7: Regenerate Types

After making the schema changes, run:

```bash
yarn payload generate:types
```

This will update `src/payload-types.ts` with:

- `Hero.heading`: `string` (instead of `{ [k: string]: unknown }`)
- `About.heading`: `string` (instead of `{ [k: string]: unknown }`)

---

## Migration Considerations

### Data Migration

Since the field type changes from `richText` (Lexical JSON) to `text` (string), existing data in the database will need to be handled:

1. **Option A - Manual Migration**: Before deploying, manually update the Hero and About globals in PayloadCMS admin panel with the new plain text values.

2. **Option B - Migration Script**: Create a migration script that:
   - Reads existing Lexical JSON from the database
   - Extracts plain text from the Lexical structure
   - Updates the field with the extracted text

3. **Option C - Seed Data Reset**: Run the updated seed script after deployment:
   ```bash
   yarn seed:globals
   ```

### Recommended Approach

**Option C** is recommended since the seed data is already defined and the globals can be easily reset.

---

## Order of Changes (To Avoid Breaking Build)

1. **Create** `src/components/payload/ColoredHeading.tsx` (new component)
2. **Modify** `src/collections/Hero.ts` (change field type)
3. **Modify** `src/collections/About.ts` (change field type)
4. **Modify** `src/components/HeroSection.tsx` (update imports and usage)
5. **Modify** `src/components/AboutSection.tsx` (update imports and usage)
6. **Modify** `src/migrations/seed-globals.ts` (update seed data)
7. **Run** `yarn payload generate:types` (regenerate types)
8. **Run** `yarn build` or `yarn typecheck` (verify no type errors)
9. **Optional**: Remove unused rich text components if no longer needed

---

## Cleanup (Optional)

After verifying everything works, consider removing these unused files:

- `src/components/payload/RichTextRenderer.tsx`
- `src/components/payload/RichTextWithColors.tsx`
- `src/components/payload/ColorFeature.ts`

Also remove the `ColorFeature` import from `src/payload.config.ts` if no other rich text fields use it.

---

## Testing Checklist

- [ ] Hero heading displays correctly with first word colored
- [ ] About heading displays correctly with last two words colored
- [ ] Default fallback data works when PayloadCMS is unavailable
- [ ] Seed script runs successfully
- [ ] TypeScript compilation passes
- [ ] ESLint passes
- [ ] Build succeeds
- [ ] Admin panel allows editing the new text fields
