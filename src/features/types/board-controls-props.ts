import { Levels } from "@/features/lib/levels";

export interface BoardControlsProps {
    moves: number;
    allMatched: boolean;
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
    flipDirection: "horizontal" | "vertical";
    setFlipDirection: React.Dispatch<React.SetStateAction<"horizontal" | "vertical">>;
    level: keyof Levels;
    setLevel: React.Dispatch<React.SetStateAction<keyof Levels>>;
    levels: Levels;
    restartGame: () => void;
    time: number; 

}
