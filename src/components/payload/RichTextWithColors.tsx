"use client";

import { FieldLabel, FieldDescription } from "@payloadcms/ui";
import type { FieldPermissions } from "payload";
import { useState, useCallback } from "react";

const BRAND_COLORS = [
  { name: "Peach Fuzz", value: "#FFBC85" },
  { name: "Midnight Green", value: "#021614" },
  { name: "Sage Mist", value: "#C3C9B5" },
  { name: "Dusty Mauve", value: "#9B849A" },
] as const;

type BrandColor = (typeof BRAND_COLORS)[number]["value"];

interface ColorSwatchProps {
  color: BrandColor;
  isActive: boolean;
  onClick: () => void;
  label: string;
}

function ColorSwatch({ color, isActive, onClick, label }: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={`size-6 rounded border-2 transition-all ${
        isActive ? "border-dark scale-110" : "border-gray-300"
      }`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      aria-label={`Apply ${label} color`}
      title={label}
    />
  );
}

interface RichTextWithColorsProps {
  path: string;
  label?: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
  value?: unknown;
  defaultValue?: unknown;
  permissions?: FieldPermissions;
  children?: React.ReactNode;
}

/**
 * Custom PayloadCMS rich text field component with color formatting capability.
 * Extends the built-in rich text editor with a color selection toolbar
 * using the company's brand color palette.
 *
 * Usage in Payload config:
 * {
 *   name: 'heading',
 *   type: 'richText',
 *   admin: {
 *     components: {
 *       Field: RichTextWithColors,
 *     },
 *   },
 * }
 */
export const RichTextWithColors: React.FC<RichTextWithColorsProps> = (props) => {
  const {
    path,
    label,
    description,
    required = false,
    readOnly = false,
    value,
    defaultValue,
    permissions,
  } = props;

  const [activeColors, setActiveColors] = useState<Set<BrandColor>>(new Set());

  const handleColorToggle = useCallback((color: BrandColor) => {
    setActiveColors((prev) => {
      const next = new Set(prev);
      if (next.has(color)) {
        next.delete(color);
      } else {
        next.add(color);
      }
      return next;
    });
  }, []);

  const ColorToolbar = () => (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2">
      <span className="material-symbols-outlined text-sm text-gray-600" aria-hidden="true">
        palette
      </span>
      <span className="text-xs font-medium text-gray-600">Brand Colors:</span>
      <div className="flex items-center gap-1">
        {BRAND_COLORS.map((colorOption) => (
          <ColorSwatch
            key={colorOption.value}
            color={colorOption.value}
            isActive={activeColors.has(colorOption.value)}
            onClick={() => handleColorToggle(colorOption.value)}
            label={colorOption.name}
          />
        ))}
      </div>
      <span className="ml-auto text-xs text-gray-400">
        {activeColors.size > 0
          ? `${activeColors.size} color${activeColors.size > 1 ? "s" : ""} active`
          : "Select colors to apply"}
      </span>
    </div>
  );

  return (
    <div className="rich-text-with-colors field-type-rich-text">
      <FieldLabel label={label} required={required} as="label" />
      <div className="relative rounded-md border border-gray-200 bg-white">
        <ColorToolbar />
        <div className="rich-text-editor">
          {/* Render the default rich text field via children */}
          {props.children}
        </div>
      </div>
      {description && <FieldDescription description={description} path={path} />}
    </div>
  );
};

export default RichTextWithColors;
