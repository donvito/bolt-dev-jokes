interface Joke {
  setup: string;
  delivery: string;
}

export async function getRandomJoke(): Promise<Joke> {
  const response = await fetch('https://v2.jokeapi.dev/joke/Programming?type=twopart&safe-mode');
  if (!response.ok) {
    throw new Error('Failed to fetch joke');
  }
  return response.json();
}