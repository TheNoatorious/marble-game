import { create } from "zustand";

// Type defining
type GameState = {
    blocksCount: number;
    phase: "ready" | "playing" | "ended";

    start: () => void;
    restart: () => void;
    end: () => void;
};

const useGame = create<GameState>((set) => ({
    blocksCount: 3,
    phase: "ready",
    start: () =>
        set((state) => ({
            phase: state.phase === "ready" ? "playing" : state.phase, // Only change to "playing" if it's not already "ready"
        })),

    restart: () =>
        set((state) => ({
            phase:
                state.phase === "playing" || state.phase === "ended"
                    ? "ready"
                    : state.phase, // Only restart if in "playing" or "ended"
        })),

    end: () =>
        set((state) => ({
            phase: state.phase === "playing" ? "ended" : state.phase, // Only end the game if it's "playing"
        })),
}));

export default useGame;
