import { create } from "zustand";

// Type defining
type GameState = {
    blocksCount: number;
};

const useGame = create<GameState>(() => ({
    blocksCount: 3,
}));

export default useGame;
