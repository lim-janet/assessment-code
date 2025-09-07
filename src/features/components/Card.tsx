import { CardProps } from "@/features/types/card-props";
import styles from "@/features/components/Card.module.scss";

function Card({ card, flipped, flipDirection, onClick }: CardProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(card);
    }
  }

  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onClick(card)}
      onKeyDown={handleKeyDown}
      disabled={card.matched}
      aria-pressed={flipped}
      aria-label={flipped ? `Card showing ${card.symbol}` : "Hidden card"}
    >
      <div
        className={`${styles.inner} ${
          flipped
            ? flipDirection === "horizontal"
              ? styles.flippedHorizontal
              : styles.flippedVertical
            : ""
        }`}
      >
        {/* Front */}
        <div className={styles.front}>{card.symbol}</div>

        {/* Back */}
        <div className={styles.back}>❓</div>
      </div>
    </button>
  );
}
export default Card;
