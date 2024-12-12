import { useCallback, useState } from 'react';
import { speakText } from '../services/speech';

export function useJokeAudio(setup: string, delivery: string | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speakingPart, setSpeakingPart] = useState<'setup' | 'delivery' | null>(null);

  const playAudio = useCallback(async (text: string) => {
    setIsPlaying(true);
    // Set speaking part based on text content
    setSpeakingPart(text === setup ? 'setup' : 'delivery');
    
    try {
      await speakText(text);
    } finally {
      setSpeakingPart(null);
      setIsPlaying(false);
    }
  }, [setup]);

  const toggleAudio = useCallback(async () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setSpeakingPart(null);
      setIsPlaying(false);
      return;
    }

    await playAudio(setup);
    if (delivery) {
      // Add pause between setup and delivery
      await new Promise(resolve => setTimeout(resolve, 800));
      await playAudio(delivery);
    }
  }, [setup, delivery, isPlaying, playAudio]);

  const stopAudio = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setSpeakingPart(null);
  }, []);


  return {
    isPlaying,
    speakingPart,
    toggleAudio,
    stopAudio,
    playAudio
  };
}