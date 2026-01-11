/**
 * Color contrast utilities for automated accessibility testing
 * Based on WCAG 2.1 guidelines for color contrast ratios
 */

export interface ColorContrastResult {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  foreground: string;
  background: string;
}

/**
 * Parse hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 specification
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  if (!fgRgb || !bgRgb) {
    throw new Error(`Invalid color format: ${foreground} or ${background}`);
  }

  const fgLuminance = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG accessibility standards
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  isLargeText = false,
): ColorContrastResult {
  const ratio = calculateContrastRatio(foreground, background);
  const aaRequired = isLargeText ? 3 : 4.5;
  const aaaRequired = isLargeText ? 4.5 : 7;

  return {
    ratio: Math.round(ratio * 100) / 100,
    meetsAA: ratio >= aaRequired,
    meetsAAA: ratio >= aaaRequired,
    foreground,
    background,
  };
}

/**
 * Brand color palette for reference
 */
export const brandColors = {
  primary: {
    peachFuzz: "#FFBC85",
  },
  neutral: {
    midnightGreen: "#021614",
    sageMist: "#C3C9B5",
    dustyMauve: "#9B849A",
    offWhite: "#F8F7F4",
    white: "#FFFFFF",
    black: "#000000",
  },
};

/**
 * Common color combinations to validate
 */
export const colorCombinations = [
  // Primary actions on light backgrounds
  {
    name: "Peach Fuzz on Off White",
    foreground: brandColors.primary.peachFuzz,
    background: brandColors.neutral.offWhite,
    context: "Primary buttons on light sections",
  },
  {
    name: "Peach Fuzz on White",
    foreground: brandColors.primary.peachFuzz,
    background: brandColors.neutral.white,
    context: "Primary buttons on white backgrounds",
  },
  // Dark text on sage backgrounds (accessibility fix)
  {
    name: "Midnight Green on Sage Mist",
    foreground: brandColors.neutral.midnightGreen,
    background: brandColors.neutral.sageMist,
    context: "Headings on sage sections",
  },
  {
    name: "Midnight Green on Dusty Mauve",
    foreground: brandColors.neutral.midnightGreen,
    background: brandColors.neutral.dustyMauve,
    context: "Text on mauve accents",
  },
  // White text on dark backgrounds
  {
    name: "White on Midnight Green",
    foreground: brandColors.neutral.white,
    background: brandColors.neutral.midnightGreen,
    context: "Footer, hero sections",
  },
  // Dark text on light backgrounds
  {
    name: "Midnight Green on Off White",
    foreground: brandColors.neutral.midnightGreen,
    background: brandColors.neutral.offWhite,
    context: "Body text on light backgrounds",
  },
  {
    name: "Midnight Green on White",
    foreground: brandColors.neutral.midnightGreen,
    background: brandColors.neutral.white,
    context: "Body text on white cards",
  },
];

/**
 * Validate all brand color combinations
 */
export function validateBrandColorContrast(): {
  passed: ColorContrastResult[];
  failed: ColorContrastResult[];
} {
  const passed: ColorContrastResult[] = [];
  const failed: ColorContrastResult[] = [];

  for (const combination of colorCombinations) {
    const result = checkColorContrast(combination.foreground, combination.background);
    if (result.meetsAA) {
      passed.push(result);
    } else {
      failed.push(result);
    }
  }

  return { passed, failed };
}

/**
 * Generate a report of color contrast validation
 */
export function generateColorContrastReport(): string {
  const { passed, failed } = validateBrandColorContrast();

  let report = "# Color Contrast Report\n\n";
  report += `## Summary\n`;
  report += `- Passed: ${passed.length} combinations\n`;
  report += `- Failed: ${failed.length} combinations\n\n`;

  if (failed.length > 0) {
    report += `## Failed Combinations (Do NOT use)\n\n`;
    for (const result of failed) {
      report += `- **${result.foreground}** on **${result.background}**\n`;
      report += `  - Ratio: ${result.ratio}:1 (AA requires 4.5:1)\n\n`;
    }
  }

  report += `## Passed Combinations (Safe to use)\n\n`;
  for (const result of passed) {
    report += `- **${result.foreground}** on **${result.background}**\n`;
    report += `  - Ratio: ${result.ratio}:1\n`;
    report += `  - AA: ${result.meetsAA ? "✓" : "✗"} | AAA: ${result.meetsAAA ? "✓" : "✗"}\n\n`;
  }

  return report;
}
