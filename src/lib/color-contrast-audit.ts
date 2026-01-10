/**
 * Color Contrast Audit Script
 * Analyzes all color combinations used in the Security Guru website
 * Based on WCAG 2.1 guidelines for color contrast ratios
 */

import { checkColorContrast } from "./color-contrast.test";

// Color combinations found in the website components
const colorCombinations = [
  // === HOME PAGE ===
  {
    name: "Peach (#FFBC85) on Midnight Green (#021614)",
    foreground: "#FFBC85",
    background: "#021614",
    context: "Homepage hero buttons (primary CTA)",
    pages: ["Home"],
    elements: ["Primary buttons", "Secondary buttons with border"],
  },
  {
    name: "Sage Light (#D4D9C8) on Midnight Green (#021614)",
    foreground: "#D4D9C8",
    background: "#021614",
    context: "Homepage hero subtitle text",
    pages: ["Home"],
    elements: ["Hero subtitle"],
  },
  {
    name: "Peach (#FFBC85) on Sage (#C3C9B5)",
    foreground: "#FFBC85",
    background: "#C3C9B5",
    context: "Trust indicators icons on sage card backgrounds",
    pages: ["Home"],
    elements: ["SVG icons in trust section"],
  },
  {
    name: "Midnight Light (#0A2A22) on Sage (#C3C9B5)",
    foreground: "#0A2A22",
    background: "#C3C9B5",
    context: "Body text on sage card backgrounds",
    pages: ["Home"],
    elements: ["Working hours text", "Service area text"],
  },

  // === HEADER ===
  {
    name: "Peach (#FFBC85) on Off White (#F9FAF7)",
    foreground: "#FFBC85",
    background: "#F9FAF7",
    context: "Active nav links and hover states",
    pages: ["All pages"],
    elements: ["Active navigation links", "Hover states"],
  },
  {
    name: "Midnight (#021614) on Off White (#F9FAF7)",
    foreground: "#021614",
    background: "#F9FAF7",
    context: "Default nav links",
    pages: ["All pages"],
    elements: ["Default navigation links"],
  },

  // === FOOTER ===
  {
    name: "Sage Light (#D4D9C8) on Midnight Green (#021614)",
    foreground: "#D4D9C8",
    background: "#021614",
    context: "Footer body text",
    pages: ["All pages"],
    elements: ["Footer main text", "Social media icons"],
  },
  {
    name: "Peach (#FFBC85) on Midnight Green (#021614)",
    foreground: "#FFBC85",
    background: "#021614",
    context: "Footer headings and links",
    pages: ["All pages"],
    elements: ["Footer section headings", "Navigation links"],
  },
  {
    name: "Sage (#C3C9B5) on Midnight Green (#021614)",
    foreground: "#C3C9B5",
    background: "#021614",
    context: "Footer tagline",
    pages: ["All pages"],
    elements: ["Company tagline"],
  },
  {
    name: "Sage Dark (#A8AF98) on Midnight Green (#021614)",
    foreground: "#A8AF98",
    background: "#021614",
    context: "Footer copyright and company code",
    pages: ["All pages"],
    elements: ["Copyright text", "Company code"],
  },

  // === PASLAUGOS (SERVICES) PAGE ===
  {
    name: "Sage (#C3C9B5) on Midnight Green (#021614)",
    foreground: "#C3C9B5",
    background: "#021614",
    context: "Page header description text",
    pages: ["Services"],
    elements: ["Header subtitle text"],
  },
  {
    name: "Sage Light (#D4D9C8) on Midnight Green (#021614)",
    foreground: "#D4D9C8",
    background: "#021614",
    context: "CTA section description",
    pages: ["Services"],
    elements: ["CTA section text"],
  },
  {
    name: "Peach (#FFBC85) on Midnight Green (#021614)",
    foreground: "#FFBC85",
    background: "#021614",
    context: "CTA section button",
    pages: ["Services"],
    elements: ["CTA button"],
  },

  // === APIE-MUS (ABOUT) PAGE ===
  {
    name: "Peach (#FFBC85) on Midnight Green (#021614)",
    foreground: "#FFBC85",
    background: "#021614",
    context: "Hero subtitle motto",
    pages: ["About"],
    elements: ["Motto text"],
  },
  {
    name: "Peach (#FFBC85) on White (#FFFFFF)",
    foreground: "#FFBC85",
    background: "#FFFFFF",
    context: "Value card category labels",
    pages: ["About"],
    elements: ["Category tags on product cards"],
  },
  {
    name: "Sage Light (#D4D9C8) on Midnight Green (#021614)",
    foreground: "#D4D9C8",
    background: "#021614",
    context: "Why choose us section icons",
    pages: ["About"],
    elements: ["Checkmark icons"],
  },

  // === KONKTAKTI (CONTACT) PAGE ===
  {
    name: "Sage (#C3C9B5) on Midnight Green (#021614)",
    foreground: "#C3C9B5",
    background: "#021614",
    context: "Header subtitle and contact info text",
    pages: ["Contact"],
    elements: ["Header subtitle", "Phone numbers", "Email", "Hours"],
  },
  {
    name: "Sage Light (#D4D9C8) on Midnight Green (#021614)",
    foreground: "#D4D9C8",
    background: "#021614",
    context: "Contact sidebar background text",
    pages: ["Contact"],
    elements: ["Contact sidebar text"],
  },

  // === E-PARDUOTUVE (ESHOP) PAGE ===
  {
    name: "Sage (#C3C9B5) on Midnight Green (#021614)",
    foreground: "#C3C9B5",
    background: "#021614",
    context: "Header subtitle and CTA description",
    pages: ["E-shop"],
    elements: ["Header subtitle", "CTA description"],
  },
  {
    name: "Peach (#FFBC85) on White (#FFFFFF)",
    foreground: "#FFBC85",
    background: "#FFFFFF",
    context: "Product category labels",
    pages: ["E-shop"],
    elements: ["Category tags on product cards"],
  },
  {
    name: "Peach (#FFBC85) on Gray-300 (#D1D5DB)",
    foreground: "#FFBC85",
    background: "#D1D5DB",
    context: "Out of stock button",
    pages: ["E-shop"],
    elements: ["Disabled button (Neturime)"],
  },
  {
    name: "Gray-500 (#6B7280) on White (#FFFFFF)",
    foreground: "#6B7280",
    background: "#FFFFFF",
    context: "Product description and SKU",
    pages: ["E-shop"],
    elements: ["Product description text", "SKU"],
  },
  {
    name: "Gray-400 (#9CA3AF) on White (#FFFFFF)",
    foreground: "#9CA3AF",
    background: "#FFFFFF",
    context: "Out of stock badge",
    pages: ["E-shop"],
    elements: ["Out of stock badge"],
  },

  // === GRAY-500 ON WHITE (COMMON) ===
  {
    name: "Gray-500 (#6B7280) on White (#FFFFFF)",
    foreground: "#6B7280",
    background: "#FFFFFF",
    context: "Form labels, placeholder text",
    pages: ["Contact"],
    elements: ["Form labels", "Input placeholders"],
  },
  {
    name: "Gray-700 (#374151) on White (#FFFFFF)",
    foreground: "#374151",
    background: "#FFFFFF",
    context: "Form input text",
    pages: ["Contact"],
    elements: ["Input text values"],
  },
  {
    name: "Gray-500 (#6B7280) on Sage Light (#D4D9C8)",
    foreground: "#6B7280",
    background: "#D4D9C8",
    context: "Value card descriptions",
    pages: ["About"],
    elements: ["Value descriptions"],
  },
];

function analyzeCombinations() {
  console.log("=".repeat(80));
  console.log("SECURITY GURU WEBSITE - COLOR CONTRAST AUDIT REPORT");
  console.log("=".repeat(80));
  console.log("");
  console.log("WCAG 2.1 Contrast Requirements:");
  console.log("  - AA Normal Text: 4.5:1 minimum");
  console.log("  - AA Large Text (18pt+ or 14pt bold): 3:1 minimum");
  console.log("  - AAA Normal Text: 7:1 minimum");
  console.log("  - AAA Large Text: 4.5:1 minimum");
  console.log("");
  console.log("=".repeat(80));
  console.log("");

  const passed = [];
  const failed = [];
  const warnings = [];

  for (const combo of colorCombinations) {
    try {
      const result = checkColorContrast(combo.foreground, combo.background, false);
      const comboInfo = {
        ...combo,
        ratio: result.ratio,
        meetsAA: result.meetsAA,
        meetsAAA: result.meetsAAA,
      };

      if (result.ratio < 3) {
        // Critical fail - even large text fails
        failed.push({ ...comboInfo, severity: "CRITICAL" });
      } else if (result.ratio < 4.5) {
        // Fails for normal text, might pass for large text
        if (
          combo.context.includes("headings") ||
          combo.context.includes("hero") ||
          combo.context.includes("Large")
        ) {
          warnings.push({ ...comboInfo, severity: "WARNING", note: "Passes for large text only" });
        } else {
          failed.push({ ...comboInfo, severity: "HIGH" });
        }
      } else if (result.ratio < 7) {
        // Passes AA but not AAA
        warnings.push({ ...comboInfo, severity: "MINOR", note: "Meets AA but not AAA" });
      } else {
        passed.push(comboInfo);
      }
    } catch (error) {
      console.log(`ERROR analyzing ${combo.name}: ${error}`);
    }
  }

  // Sort failed by ratio (lowest first)
  failed.sort((a, b) => a.ratio - b.ratio);
  warnings.sort((a, b) => a.ratio - b.ratio);
  passed.sort((a, b) => a.ratio - b.ratio);

  // Report failures
  console.log("=".repeat(80));
  console.log(`FAILED CONTRAST COMBINATIONS (${failed.length} issues)`);
  console.log("=".repeat(80));
  console.log("");

  for (const item of failed) {
    console.log(`❌ ${item.name}`);
    console.log(`   Context: ${item.context}`);
    console.log(`   Pages: ${item.pages.join(", ")}`);
    console.log(`   Elements: ${item.elements.join(", ")}`);
    console.log(`   Contrast Ratio: ${item.ratio}:1 (Required: 4.5:1 for normal text)`);
    console.log(`   Severity: ${item.severity}`);
    console.log(`   Fix: Change foreground to a darker color or background to a lighter color`);
    console.log("");
  }

  // Report warnings
  console.log("=".repeat(80));
  console.log(`WARNING CONTRAST COMBINATIONS (${warnings.length} issues)`);
  console.log("=".repeat(80));
  console.log("");

  for (const item of warnings) {
    console.log(`⚠️  ${item.name}`);
    console.log(`   Context: ${item.context}`);
    console.log(`   Pages: ${item.pages.join(", ")}`);
    console.log(`   Elements: ${item.elements.join(", ")}`);
    console.log(`   Contrast Ratio: ${item.ratio}:1`);
    console.log(`   Note: ${item.note || "Meets AA requirements"}`);
    console.log("");
  }

  // Report passed
  console.log("=".repeat(80));
  console.log(`PASSED CONTRAST COMBINATIONS (${passed.length} combinations)`);
  console.log("=".repeat(80));
  console.log("");

  for (const item of passed) {
    console.log(`✅ ${item.name} - ${item.ratio}:1`);
  }

  // Summary
  console.log("");
  console.log("=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log(`Total combinations analyzed: ${colorCombinations.length}`);
  console.log(`✅ Passed: ${passed.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log("");

  if (failed.length > 0) {
    console.log("PRIORITY FIXES NEEDED:");
    console.log("-".repeat(40));
    failed.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name}`);
      console.log(`   Elements: ${item.elements.join(", ")}`);
      console.log(`   Current ratio: ${item.ratio}:1 (needs 4.5:1)`);
    });
  }

  return { passed, failed, warnings };
}

analyzeCombinations();
