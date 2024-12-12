import React from 'react';

interface HighlightedTextProps {
  text: string;
  isHighlighted: boolean;
  className?: string;
}

export function HighlightedText({ text, isHighlighted, className = '' }: HighlightedTextProps) {
  return (
    <p className={`text-lg font-medium transition-colors duration-200 ${className} ${
      isHighlighted 
        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 px-4 py-3 rounded-lg shadow-sm' 
        : 'text-gray-800'
    }`}>
      {text}
    </p>
  );
}