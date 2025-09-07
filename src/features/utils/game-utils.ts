export interface CardType {
  id: string;
  symbol: string;
  matched: boolean;
}

export const shuffle = <T,>(array: T[]): T[] =>
  [...array].sort(() => Math.random() - 0.5);

export const createDeck = (symbols: string[], cols: number, rows: number): CardType[] => {
  const totalCards = cols * rows;
  const neededPairs = totalCards / 2;
  const selected = shuffle(symbols).slice(0, neededPairs);

  return shuffle(
    [...selected, ...selected].map((symbol, i) => ({
      id: `${i}-${Math.random().toString(36).slice(2)}`,
      symbol,
      matched: false,
    }))
  );
};
