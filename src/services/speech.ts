const DEFAULT_RATE = 0.9;
const DEFAULT_PITCH = 1;

export async function speakText(text: string): Promise<void> {
  // Use the Web Speech API for text-to-speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = DEFAULT_RATE; // Slightly slower for better clarity
  utterance.pitch = DEFAULT_PITCH;
  
  return new Promise((resolve) => {
    utterance.onend = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}