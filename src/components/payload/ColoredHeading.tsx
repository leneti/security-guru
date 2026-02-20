interface ColoredHeadingProps {
  text: string;
  variant: "hero" | "about";
}

/**
 * ColoredHeading component applies automatic color styling to headings.
 *
 * - For 'hero' variant: colors text before the first comma with primary color (#FFBC85)
 * - For 'about' variant: colors the last two space-separated words with primary color
 */
export function ColoredHeading({ text, variant }: ColoredHeadingProps) {
  if (variant === "hero") {
    // Find the first comma and color the text before it
    const commaIndex = text.indexOf(",");
    if (commaIndex === -1) {
      // No comma found, return plain text
      return <>{text}</>;
    }

    const beforeComma = text.slice(0, commaIndex);
    const afterComma = text.slice(commaIndex);

    return (
      <>
        <span className="text-primary">{beforeComma}</span>
        {afterComma}
      </>
    );
  }

  // 'about' variant: color the last two words
  const words = text.split(" ");
  if (words.length < 2) {
    // Less than 2 words, return plain text
    return <>{text}</>;
  }

  const lastTwoWordsStartIndex = words.length - 2;
  const beforeLastTwo = words.slice(0, lastTwoWordsStartIndex).join(" ");
  const lastTwoWords = words.slice(lastTwoWordsStartIndex).join(" ");

  if (beforeLastTwo.length === 0) {
    // Only two words, color them both
    return <span className="text-primary">{lastTwoWords}</span>;
  }

  return (
    <>
      {beforeLastTwo} <span className="text-primary">{lastTwoWords}</span>
    </>
  );
}
