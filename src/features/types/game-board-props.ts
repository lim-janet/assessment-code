import { CardType } from "@/features/utils/game-utils";

export interface GameBoardProps {
  cards: CardType[];
  firstCard: CardType | null;
  secondCard: CardType | null;
  flipDirection: "horizontal" | "vertical";
  handleChoice: (card: CardType) => void;
  cols: number;
  rows: number;
  scale: number;
}
