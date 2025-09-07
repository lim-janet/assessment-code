import { CardType } from "@/features/utils/game-utils";

export interface CardProps {
  card: CardType;
  flipped: boolean;
  flipDirection: "horizontal" | "vertical";
  onClick: (card: CardType) => void;
}
