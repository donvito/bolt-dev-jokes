import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  onToggleAudio: () => void;
  disabled?: boolean;
}

export function AudioControls({ isPlaying, onToggleAudio, disabled }: AudioControlsProps) {
  return (
    <button
      onClick={onToggleAudio}
      disabled={disabled}
      className="p-3 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 
                 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 
                 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      title={isPlaying ? "Stop speaking" : "Speak joke"}
    >
      {isPlaying ? (
        <VolumeX className="w-6 h-6 text-indigo-600" />
      ) : (
        <Volume2 className="w-6 h-6 text-indigo-600" />
      )}
    </button>
  );
}