import type { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { RichText, type JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import type { HeroData } from "@/lib/page-data-types";
import { TEXT_STATE_COLORS, type TextNodeWithColor } from "@/lib/richtext-text-state";

// Custom converters to handle text colors
const converters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: (args) => {
    const node = args.node as TextNodeWithColor;
    const color = node.$?.color;
    const format = node.format ?? 0;

    // Check if any formatting needs to be applied based on format bits
    const hasBold = (format & 1) !== 0;
    const hasItalic = (format & 2) !== 0;
    const hasCode = (format & 4) !== 0;
    const hasUnderline = (format & 8) !== 0;
    const hasStrikethrough = (format & 16) !== 0;

    const hasFormatting = hasBold || hasItalic || hasCode || hasUnderline || hasStrikethrough;
    const hasColor = Boolean(color && TEXT_STATE_COLORS[color].css.color);

    // If no color or formatting, fall back to default converter
    if (!hasColor && !hasFormatting) {
      return typeof defaultConverters.text === "function"
        ? defaultConverters.text(args)
        : defaultConverters.text;
    }

    // Build the content with formatting applied
    let content: React.ReactNode = node.text;

    if (hasStrikethrough) {
      content = <s>{content}</s>;
    }
    if (hasUnderline) {
      content = <u>{content}</u>;
    }
    if (hasCode) {
      content = <code>{content}</code>;
    }
    if (hasItalic) {
      content = <em>{content}</em>;
    }
    if (hasBold) {
      content = <strong>{content}</strong>;
    }

    // Apply color if specified
    if (hasColor) {
      return <span style={{ color: TEXT_STATE_COLORS[color!].css.color }}>{content}</span>;
    }

    return content;
  },
});

const primaryButtonClasses =
  "transform-gpu rounded-lg bg-primary px-8 py-4 font-bold text-dark shadow-[0_0_20px_rgba(255,188,133,0.3)] transition-all hover:scale-105 hover:bg-white";
const secondaryButtonClasses =
  "transform-gpu rounded-lg border-2 border-sage px-8 py-4 font-bold text-sage transition-all hover:bg-sage hover:text-dark";

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-150 items-center justify-center overflow-hidden bg-dark"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated version - hidden when reduced motion is preferred */}
        <div className="h-full w-full motion-reduce:hidden">
          <Image
            src="/images/hero-bg-animated.svg"
            alt=""
            role="presentation"
            width={1024}
            height={1024}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        {/* Static version - shown when reduced motion is preferred */}
        <div className="h-full w-full motion-safe:hidden">
          <Image
            src="/images/hero-bg-static.svg"
            alt=""
            role="presentation"
            width={1024}
            height={1024}
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-3xl px-4 text-center">
        <div className="mb-6 inline-block animate-[fadeIn_1s_ease-out] rounded-full border border-primary/50 bg-primary/10 px-3 py-1 backdrop-blur-sm">
          <RichText
            data={data.badge_text}
            converters={converters}
            className="text-xs tracking-widest"
          />
        </div>

        <RichText
          data={data.heading}
          converters={converters}
          className="slide-up mb-6 text-5xl leading-tight text-balance animation-delay-100 md:text-7xl"
        />

        <RichText
          data={data.description}
          converters={converters}
          className="slide-up mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light animation-delay-200 md:text-xl"
        />

        <div className="slide-up flex flex-col justify-center gap-4 animation-delay-300 sm:flex-row">
          <Link
            href="#services"
            className={clsx(
              data.services_button.type === "primary" && primaryButtonClasses,
              data.services_button.type === "secondary" && secondaryButtonClasses,
            )}
          >
            {data.services_button.text}
          </Link>
          <Link
            href="#contact"
            className={clsx(
              data.contact_button.type === "primary" && primaryButtonClasses,
              data.contact_button.type === "secondary" && secondaryButtonClasses,
            )}
          >
            {data.contact_button.text}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform-gpu animate-bounce text-sage/50">
        <span className="material-symbols-outlined text-4xl" aria-hidden="true">
          {data.scroll_icon}
        </span>
      </div>
    </section>
  );
}
