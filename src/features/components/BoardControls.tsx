import { Levels } from "@/features/lib/levels";
import { BoardControlsProps } from "@/features/types/board-controls-props";
import styles from "@/features/components/BoardControls.module.scss";

function BoardControls({
  moves,
  allMatched,
  flipDirection,
  setFlipDirection,
  level,
  setLevel,
  levels,
  restartGame,
  time,
  bestScore,
}: BoardControlsProps & { bestScore?: { moves: number; time: number } | null }) {
  return (
    <div className={styles.controls}>
      <button onClick={restartGame} className={`${styles.button} ${styles.restart}`}>
        Restart
      </button>

      <span>Moves: {moves}</span>
      <span>⏱ {time}s</span>

      {allMatched && (
        <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-sm">
          🎉 You win!
        </span>
      )}

      {bestScore && (
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-sm">
          🏆 Best: {bestScore.moves} moves, {bestScore.time}s
        </span>
      )}

      <button
        onClick={() =>
          setFlipDirection((prev) => (prev === "horizontal" ? "vertical" : "horizontal"))
        }
        className={`${styles.button} ${styles.flip}`}
      >
        Flip: {flipDirection === "horizontal" ? "H" : "V"}
      </button>

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value as keyof Levels)}
        className={styles.select}
      >
        {Object.keys(levels).map((l) => (
          <option key={l} value={l}>
            {levels[l as keyof Levels]?.cols}x{levels[l as keyof Levels]?.rows}
          </option>
        ))}
      </select>
    </div>
  );
}
export default BoardControls;
