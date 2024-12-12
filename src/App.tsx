import React, { useState, useCallback } from 'react';
import { JokeCard } from './components/JokeCard';
import { getRandomJoke } from './services/jokes';
import { useJokeAudio } from './hooks/useJokeAudio';

function App() {
  const [setup, setSetup] = useState('Click the button to get your first joke!');
  const [delivery, setDelivery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isPlaying, speakingPart, toggleAudio, stopAudio, playAudio } = useJokeAudio(setup, delivery);

  const fetchNewJoke = useCallback(async () => {
    setIsLoading(true);
    stopAudio(); // Stop any ongoing speech

    try {
      const joke = await getRandomJoke();
      // Show setup text first
      setDelivery(null);
      setSetup(joke.setup);

      // Wait a moment for the setup text to be visible
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show delivery text
      setDelivery(joke.delivery);
      
      // Wait a moment for the delivery text to be visible
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Play setup audio
      await playAudio(joke.setup);
      
      // Add a pause between setup and delivery audio
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Play delivery audio
      await playAudio(joke.delivery);
    } catch (error) {
      setSetup('Oops! Failed to fetch joke.');
      setDelivery('Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [playAudio, stopAudio]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-100 rounded-full opacity-20" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-100 rounded-full opacity-20" />
        <div className="absolute -bottom-10 right-1/3 w-48 h-48 bg-purple-100 rounded-full opacity-20" />
      </div>
      <JokeCard
        setup={setup}
        delivery={delivery}
        isLoading={isLoading}
        isPlaying={isPlaying}
        speakingPart={speakingPart}
        onNewJoke={fetchNewJoke}
        onToggleAudio={toggleAudio}
      />
    </div>
  );
}

export default App;
