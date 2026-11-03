import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight: string;
  className?: string;
  highlightClassName?: string;
}

/**
 * Highlights occurrences of the target word/character in red (text color only, no background)
 */
export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlight,
  className = '',
  highlightClassName = 'text-purple-600 font-bold'
}) => {
  if (!text || !highlight) {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters in highlight string
  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return (
            <span key={index} className={highlightClassName}>
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
