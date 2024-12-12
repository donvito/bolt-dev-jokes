import React from 'react';
import { RefreshCw, Code2, Terminal, Laptop } from 'lucide-react';
import { AudioControls } from './AudioControls';
import { HighlightedText } from './HighlightedText';

interface JokeCardProps {
  setup: string;
  delivery: string | null;
  isLoading: boolean;
  isPlaying: boolean;
  speakingPart: 'setup' | 'delivery' | null;
  onNewJoke: () => void;
  onToggleAudio: () => void;
}

export function JokeCard({
  setup,
  delivery,
  isLoading,
  isPlaying,
  speakingPart,
  onNewJoke,
  onToggleAudio
}: JokeCardProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-xl p-8 max-w-xl w-full overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-tr-full opacity-50" />
      
      <div className="relative space-y-8">
        <div className="text-center flex flex-col items-center relative">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Dev Jokes</h1>
            <Code2 className="w-8 h-8 text-indigo-600" />
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=200&q=80"
              alt="Laptop with code"
              className="w-24 h-24 object-cover rounded-full mb-4 shadow-md border-4 border-white"
            />
            <div className="absolute -bottom-2 right-0 bg-white rounded-full p-1 shadow-md">
              <Laptop className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          
          <p className="text-gray-600 mt-4">Need a laugh? Get your daily dose of dev humor!</p>
          <div className="mt-4">
            <AudioControls
              isPlaying={isPlaying}
              onToggleAudio={onToggleAudio}
              disabled={isLoading || (!setup && !delivery)}
            />
          </div>
        </div>

        <div className="min-h-[160px] flex items-center justify-center bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-lg p-6">
          {isLoading ? (
            <div className="text-gray-500 animate-pulse">Loading joke...</div>
          ) : (
            <div className="space-y-4">
              <HighlightedText 
                text={setup}
                isHighlighted={speakingPart === 'setup'}
                className="transition-opacity duration-300"
              />
              {delivery && (
                <HighlightedText
                  text={delivery}
                  isHighlighted={speakingPart === 'delivery'}
                  className="transition-all duration-500 animate-fade-in"
                />
              )}
            </div>
          )}
        </div>

        <button
          onClick={onNewJoke}
          disabled={isLoading}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 
                     text-white rounded-lg font-medium flex items-center justify-center 
                     gap-3 hover:from-indigo-700 hover:to-indigo-800 transform hover:-translate-y-0.5 
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
        >
          <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
          Get New Joke
        </button>
      </div>
    </div>
  );
}