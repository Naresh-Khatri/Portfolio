const adjectives = [
  "Clever",
  "Brave",
  "Quick",
  "Silent",
  "Eager",
  "Bold",
  "Bright",
  "Fierce",
  "Gentle",
  "Mighty",
  "Noble",
  "Proud",
  "Swift",
  "Calm",
  "Daring",
];

const nouns = [
  "Tiger",
  "Lion",
  "Eagle",
  "Falcon",
  "Wolf",
  "Panther",
  "Hawk",
  "Bear",
  "Whale",
  "Fox",
  "Lynx",
  "Otter",
  "Serpent",
  "Dragon",
  "Phoenix",
];

const colors = [
  "#60a5fa",
  "#f87171",
  "#4ade80",
  "#facc15",
  "#c084fc",
  "#fb923c",
  "#f43f5e",
  "#818cf8",
  "#22d3ee",
  "#a3e635",
];

const randomPicker = <T>(items: T[]): (() => T) => {
  let index = 0;
  const _items = items.sort(() => Math.random() - 0.5);
  return () => {
    return _items[index++ % _items.length];
  };
};

export const generateRandomCursor = (): { name: string; color: string } => {
  const colorPicker = randomPicker(colors);
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const name = `${randomAdjective} ${randomNoun}`;
  const color = colorPicker();
  return { name, color };
};
