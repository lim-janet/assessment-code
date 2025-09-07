import { useState, useEffect, useRef } from "react";
import { symbols } from "@/features/lib/symbols";
import { levels } from "@/features/lib/levels";
import { createDeck, CardType } from "@/features/utils/game-utils";
import GameBoard from "@/features/components/GameBoard";
import BoardControls from "@/features/components/BoardControls";
import styles from "@/features/pages/MemoryGame.module.scss";
import { BestScore } from "@/features/types/best-score-props";

function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [scale, setScale] = useState(1);
  const [flipDirection, setFlipDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [level, setLevel] = useState<keyof typeof levels>("4x4");

  // Timer
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Best Score
  const [bestScore, setBestScore] = useState<BestScore | null>(null);

  // Load best score from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`bestScore-${level}`);
    if (stored) setBestScore(JSON.parse(stored));
  }, [level]);

  // Start new game
  useEffect(() => {
    startGame();
  }, [level]);

  function startGame() {
    const { cols, rows } = levels[level]!;
    setCards(createDeck(symbols, cols, rows));
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setDisabled(false);

    // reset timer
    setTime(0);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function handleChoice(card: CardType) {
    if (disabled) return;

    // start timer on first flip
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard && card.id !== firstCard.id) {
      setSecondCard(card);
    }
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.symbol === secondCard.symbol) {
        setCards((prev) =>
          prev.map((c) =>
            c.symbol === firstCard.symbol ? { ...c, matched: true } : c
          )
        );
        setTimeout(resetTurn, 200);
      } else {
        setTimeout(resetTurn, 800);
      }
      setMoves((m) => m + 1);
    }
  }, [firstCard, secondCard]);

  function resetTurn() {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  }

  function restartGame() {
    startGame(); // reshuffle + reset state
  }

  // stop timer when all matched
  const allMatched = cards.length > 0 && cards.every((c) => c.matched);
  useEffect(() => {
    if (allMatched && isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);

      // check and update best score
      if (
        !bestScore ||
        moves < bestScore.moves ||
        (moves === bestScore.moves && time < bestScore.time)
      ) {
        const newBest: BestScore = { moves, time };
        setBestScore(newBest);
        localStorage.setItem(`bestScore-${level}`, JSON.stringify(newBest));
      }
    }
  }, [allMatched, isRunning]);

  const { cols, rows } = levels[level]!;
  const gridCols = flipDirection === "horizontal" ? cols : rows;
  const gridRows = flipDirection === "horizontal" ? rows : cols;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🧩 Memory Match</h1>

      <BoardControls
        moves={moves}
        allMatched={allMatched}
        scale={scale}
        setScale={setScale}
        flipDirection={flipDirection}
        setFlipDirection={setFlipDirection}
        level={level}
        setLevel={setLevel}
        levels={levels}
        restartGame={restartGame}
        time={time} 
        bestScore={bestScore} 
      />

      <div className={styles.boardWrapper}>
        <GameBoard
          cards={cards}
          firstCard={firstCard}
          secondCard={secondCard}
          flipDirection={flipDirection}
          handleChoice={handleChoice}
          cols={gridCols}
          rows={gridRows}
          scale={scale}
        />
      </div>
    </div>
  );
}
export default MemoryGame;
