import type { SerializedTextNode } from "@payloadcms/richtext-lexical";

/**
 * Pre-defined color states for the text editor.
 * These colors are used in payload.config.ts and typed throughout the app.
 */
export const TEXT_STATE_COLORS = {
  peach: { label: "Peach", css: { color: "#ffbc85" } },
  midnight: { label: "Midnight", css: { color: "#021614" } },
  sage: { label: "Sage", css: { color: "#c3c9b5" } },
  mauve: { label: "Mauve", css: { color: "#9b849a" } },
  white: { label: "White", css: { color: "#ffffff" } },
  black: { label: "Black", css: { color: "#000000" } },
} as const;

/**
 * Text state configuration for the Payload CMS Rich Text editor.
 * This type mirrors the TextStateFeature state configuration.
 *
 * Used with `satisfies` in payload.config.ts to ensure type safety.
 *
 * @example
 * ```ts
 * const textState = {
 *   color: TEXT_STATE_COLORS,
 * } satisfies TextStateConfig;
 * ```
 */
export type TextStateConfig = {
  color: typeof TEXT_STATE_COLORS;
};

/**
 * The shape of the $ property on serialized text nodes.
 * This is used to type the text state feature data stored in nodes.
 *
 * The keys correspond to the state keys in TextStateConfig (e.g., "color").
 * The values are the keys of each state value object (e.g., "peach", "midnight").
 */
export type TextState = {
  color: keyof typeof TEXT_STATE_COLORS;
};

// Extend SerializedTextNode with the typed $ property from TextStateFeature
export type TextNodeWithColor = SerializedTextNode & {
  $?: TextState;
};
