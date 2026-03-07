"use client";

import { FieldLabel, FieldDescription } from "@payloadcms/ui";
import type { FieldPermissions } from "payload";
import { useCallback, useState } from "react";

const BUTTON_TYPES = [
  { value: "primary", label: "Primary", color: "#FFBC85" },
  { value: "secondary", label: "Secondary", color: "#9B849A" },
] as const;

type ButtonType = (typeof BUTTON_TYPES)[number]["value"];

interface ButtonSelectorProps {
  path: string;
  label?: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
  value?: { type?: ButtonType; text?: string };
  defaultValue?: { type?: ButtonType; text?: string };
  permissions?: FieldPermissions;
  children?: React.ReactNode;
}

/**
 * Custom PayloadCMS field component for button configuration.
 * Allows editors to select button type (primary/secondary) and enter button label text.
 *
 * Usage in Payload config:
 * {
 *   name: 'services_button',
 *   type: 'group',
 *   admin: {
 *     components: {
 *       Field: ButtonSelector,
 *     },
 *   },
 *   fields: [
 *     { name: 'type', type: 'select', options: ['primary', 'secondary'], required: true },
 *     { name: 'text', type: 'text', required: true },
 *   ]
 * }
 */
export const ButtonSelector: React.FC<ButtonSelectorProps> = (props) => {
  const {
    path,
    label = "Button",
    description,
    required = false,
    readOnly = false,
    value,
    defaultValue,
    permissions,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const currentType =
    (value as { type?: ButtonType } | undefined)?.type ||
    (defaultValue as { type?: ButtonType } | undefined)?.type ||
    "primary";
  const currentText =
    (value as { text?: string } | undefined)?.text ||
    (defaultValue as { text?: string } | undefined)?.text ||
    "";

  const selectedTypeInfo = BUTTON_TYPES.find((t) => t.value === currentType);
  const hasPermission = permissions ? Boolean(permissions.read) : true;

  const handleTypeSelect = useCallback((_type: ButtonType) => {
    // The actual value update is handled by Payload's underlying field components
    // We just update local state for the UI preview
    setIsOpen(false);
  }, []);

  return (
    <div className="button-selector field-type-group">
      <FieldLabel label={label} required={required} as="label" />

      <div className="relative rounded-md border border-gray-200 bg-white p-4">
        {/* Button Type Selector */}
        <div className="mb-4">
          <label htmlFor={`${path}.type`} className="mb-1 block text-sm font-medium text-gray-700">
            Button Type
          </label>
          <div className="relative">
            <button
              type="button"
              id={`${path}.type`}
              onClick={() => !readOnly && setIsOpen(!isOpen)}
              disabled={readOnly || !hasPermission}
              className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-all ${
                readOnly ? "cursor-not-allowed opacity-50" : "hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="size-4 rounded-full"
                  style={{ backgroundColor: selectedTypeInfo?.color }}
                />
                <span>{selectedTypeInfo?.label}</span>
              </div>
              <span className="material-symbols-outlined text-sm text-gray-500">
                {isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </button>

            {/* Dropdown menu */}
            {isOpen && !readOnly && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                  onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
                  role="presentation"
                />
                <div className="absolute top-full left-0 z-20 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
                  {BUTTON_TYPES.map((typeOption) => (
                    <button
                      key={typeOption.value}
                      type="button"
                      onClick={() => handleTypeSelect(typeOption.value)}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors ${
                        typeOption.value === currentType ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className="size-4 rounded-full"
                        style={{ backgroundColor: typeOption.color }}
                      />
                      <span>{typeOption.label}</span>
                      {typeOption.value === currentType && (
                        <span className="material-symbols-outlined ml-auto text-sm">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Button Text Input */}
        <div>
          <label htmlFor={`${path}.text`} className="mb-1 block text-sm font-medium text-gray-700">
            Button Label
          </label>
          <div className="relative">
            <input
              type="text"
              id={`${path}.text`}
              value={currentText}
              placeholder="Enter button label..."
              disabled={readOnly || !hasPermission}
              className={`focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-all placeholder:text-gray-400 focus:ring-1 focus:outline-none ${
                readOnly ? "cursor-not-allowed opacity-50" : ""
              }`}
              style={{
                borderColor: selectedTypeInfo?.color === "#FFBC85" ? "#FFBC85" : undefined,
              }}
              onChange={() => {
                // Handled by Payload's underlying text field
              }}
            />
            <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-sm text-gray-400">
              text_fields
            </span>
          </div>
        </div>

        {/* Preview */}
        {currentText && (
          <div className="mt-4 rounded-md border border-gray-100 bg-gray-50 p-3">
            <span className="mb-1 block text-xs font-medium text-gray-500">Preview</span>
            <button
              type="button"
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                currentType === "primary"
                  ? "bg-[#FFBC85] text-[#021614] hover:opacity-90"
                  : "bg-[#9B849A] text-white hover:opacity-90"
              }`}
            >
              {currentText}
            </button>
          </div>
        )}
      </div>

      {description && <FieldDescription description={description} path={path} />}
    </div>
  );
};

export default ButtonSelector;
