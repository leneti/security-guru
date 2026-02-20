import { TextStateFeature } from "@payloadcms/richtext-lexical";

/**
 * Brand colors for the Security Guru website.
 * These colors can be applied to text in the Lexical rich text editor.
 */
const BRAND_COLORS = {
  /** Primary highlight color - Peach Fuzz */
  peach: {
    label: "Peach Fuzz",
    css: { color: "#FFBC85" },
  },
  /** Dark text color - Midnight Green */
  midnight: {
    label: "Midnight Green",
    css: { color: "#021614" },
  },
  /** Secondary background color - Sage Mist */
  sage: {
    label: "Sage Mist",
    css: { color: "#C3C9B5" },
  },
  /** Accent color - Dusty Mauve */
  mauve: {
    label: "Dusty Mauve",
    css: { color: "#9B849A" },
  },
};

/**
 * ColorFeature provides a color picker dropdown in the Lexical toolbar
 * that allows admins to apply brand colors to selected text.
 *
 * This uses PayloadCMS's built-in TextStateFeature which stores color state
 * directly on text nodes and applies CSS styles for visualization.
 *
 * The color state is stored as a simple key (e.g., "peach") on the text node,
 * and the corresponding CSS is applied when rendering.
 *
 * @example
 * // In a collection config:
 * {
 *   name: "heading",
 *   type: "richText",
 *   admin: {
 *     elements: [],
 *     leaves: [],
 *   },
 * }
 *
 * // Then add ColorFeature to the lexicalEditor features in payload.config.ts:
 * editor: lexicalEditor({
 *   features: ({ defaultFeatures }) => [...defaultFeatures, ColorFeature],
 * })
 */
export const ColorFeature = TextStateFeature({
  state: {
    color: BRAND_COLORS,
  },
});
