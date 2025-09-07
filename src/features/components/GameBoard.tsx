import Card from "@/features/components/Card";
import { GameBoardProps } from "@/features/types/game-board-props";
import styles from "@/features/components/GameBoard.module.scss";

function GameBoard({
  cards,
  firstCard,
  secondCard,
  flipDirection,
  handleChoice,
  cols,
  rows,
}: GameBoardProps) {
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {cards.map((card) => {
        const flipped =
          (firstCard && card.id === firstCard.id) ||
          (secondCard && card.id === secondCard.id) ||
          card.matched;

        return (
          <Card
            key={card.id}
            card={card}
            flipped={flipped}
            flipDirection={flipDirection}
            onClick={handleChoice}
          />
        );
      })}
    </div>
  );
}
export default GameBoard;
