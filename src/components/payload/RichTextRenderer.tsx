"use client";

import React from "react";

/**
 * Brand colors mapping for both hex values and TextStateFeature keys.
 * The TextStateFeature stores color as a key (e.g., "peach") on text nodes.
 */
const BRAND_COLORS_BY_KEY: Record<string, { name: string; value: string; cssClass: string }> = {
  peach: { name: "Peach Fuzz", value: "#FFBC85", cssClass: "text-primary" },
  midnight: { name: "Midnight Green", value: "#021614", cssClass: "text-dark" },
  sage: { name: "Sage Mist", value: "#C3C9B5", cssClass: "text-sage" },
  mauve: { name: "Dusty Mauve", value: "#9B849A", cssClass: "text-accent" },
};

const BRAND_COLORS_BY_VALUE: Record<string, { name: string; cssClass: string }> = {
  "#FFBC85": { name: "Peach Fuzz", cssClass: "text-primary" },
  "#021614": { name: "Midnight Green", cssClass: "text-dark" },
  "#C3C9B5": { name: "Sage Mist", cssClass: "text-sage" },
  "#9B849A": { name: "Dusty Mauve", cssClass: "text-accent" },
};

type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
  format?: number;
  indent?: number;
  version?: number;
  styles?: Array<{ color?: string }>;
  /** Color key from TextStateFeature (e.g., "peach", "midnight") */
  color?: string;
  fields?: { url?: string };
};

type LexicalDocument = {
  root?: {
    children?: RichTextNode[];
    type?: string;
    version?: number;
  };
};

interface RichTextRendererProps {
  content: RichTextNode[] | LexicalDocument | unknown;
  className?: string;
}

/**
 * Check if content is a Lexical document structure with root property.
 * Lexical documents have the shape: { root: { children: [...], type: "root", version: 1 } }
 */
function isLexicalDocument(content: unknown): content is LexicalDocument {
  if (!content) return false;
  if (typeof content !== "object") return false;

  const doc = content as Record<string, unknown>;
  return "root" in doc && typeof doc.root === "object" && doc.root !== null;
}

/**
 * Check if content is a flat array of rich text nodes.
 * This is the format used by DEFAULT_HERO_DATA and other inline definitions.
 */
function isRichTextNodeArray(content: unknown): content is RichTextNode[] {
  if (!content) return false;
  if (!Array.isArray(content)) return false;
  if (content.length === 0) return true;

  // Check if it looks like a rich text array
  const first = content[0];
  return (
    typeof first === "object" &&
    first !== null &&
    "type" in first &&
    typeof (first as RichTextNode).type === "string"
  );
}

/**
 * Normalize content to a flat array of rich text nodes.
 * Handles both Lexical document structure and flat arrays.
 */
function normalizeContent(content: unknown): RichTextNode[] | null {
  // Handle Lexical document structure: { root: { children: [...] } }
  if (isLexicalDocument(content)) {
    const children = content.root?.children;
    if (Array.isArray(children)) {
      return children;
    }
    return null;
  }

  // Handle flat array of nodes
  if (isRichTextNodeArray(content)) {
    return content;
  }

  return null;
}

/**
 * Get color class from either:
 * 1. TextStateFeature format: color key directly on node (e.g., `color: "peach"`)
 * 2. Legacy seed data format: styles array with hex color (e.g., `styles: [{ color: "#FFBC85" }]`)
 */
function getColorClass(node: RichTextNode): string | null {
  // First, check for TextStateFeature format (color key directly on node)
  if (node.color) {
    const colorInfo = BRAND_COLORS_BY_KEY[node.color];
    if (colorInfo) {
      return colorInfo.cssClass;
    }
  }

  // Then, check for legacy styles array format (from seed data)
  const styles = node.styles;
  if (!styles) return null;

  // Handle array of style objects (Payload format)
  if (Array.isArray(styles)) {
    for (const s of styles) {
      if (typeof s === "object" && s !== null) {
        const styleObj = s as Record<string, unknown>;
        if (styleObj.color) {
          const colorValue = String(styleObj.color);
          const colorMatch = BRAND_COLORS_BY_VALUE[colorValue];
          if (colorMatch) {
            return colorMatch.cssClass;
          }
        }
      }
    }
  }

  return null;
}

function renderNode(node: RichTextNode, index: number): React.ReactNode {
  const { type, children, text } = node;

  if (text !== undefined) {
    let className = "";

    // Check for bold (format is a bitmask: bit 0 = bold, bit 1 = italic)
    const format = node.format ?? 0;
    const isBold = (format & 1) !== 0;
    // Check for italic
    const isItalic = (format & 2) !== 0;

    if (isBold) className += " font-bold";
    if (isItalic) className += " italic";

    // Apply color styles (supports both TextStateFeature and legacy formats)
    const colorClass = getColorClass(node);
    if (colorClass) {
      className += ` ${colorClass}`;
    }

    return (
      <span key={index} className={className.trim() || undefined}>
        {text}
      </span>
    );
  }

  if (!children) return null;

  switch (type) {
    case "h1":
      return (
        <h1 key={index} className="mb-4 text-4xl font-bold">
          {children.map((child, i) => renderNode(child, i))}
        </h1>
      );
    case "h2":
      return (
        <h2 key={index} className="mb-4 text-3xl font-bold">
          {children.map((child, i) => renderNode(child, i))}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="mb-3 text-2xl font-bold">
          {children.map((child, i) => renderNode(child, i))}
        </h3>
      );
    case "p":
    case "paragraph":
      return (
        <p key={index} className="mb-4">
          {children.map((child, i) => renderNode(child, i))}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mb-4 list-disc pl-6">
          {children.map((child, i) => (
            <li key={i}>{renderNode(child, i)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mb-4 list-decimal pl-6">
          {children.map((child, i) => (
            <li key={i}>{renderNode(child, i)}</li>
          ))}
        </ol>
      );
    case "li":
      return <li key={index}>{children.map((child, i) => renderNode(child, i))}</li>;
    case "link":
      const href = node.fields?.url || "#";
      return (
        <a key={index} href={href} className="text-primary underline hover:text-white">
          {children.map((child, i) => renderNode(child, i))}
        </a>
      );
    default:
      return <span key={index}>{children.map((child, i) => renderNode(child, i))}</span>;
  }
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  const nodes = normalizeContent(content);

  if (!nodes) {
    return null;
  }

  return <div className={`rich-text-content ${className}`}>{nodes.map(renderNode)}</div>;
}

export default RichTextRenderer;
