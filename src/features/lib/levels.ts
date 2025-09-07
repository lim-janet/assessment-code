export type Levels = {
    [key: string]: { cols: number; rows: number };
};

export const levels: Levels = {
    "2x2": { cols: 2, rows: 2 },
    "4x4": { cols: 4, rows: 4 }, // default
    "6x6": { cols: 6, rows: 6 },
};
