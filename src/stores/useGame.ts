import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Type defining
type GameState = {
    blocksCount: number;
    blocksSeed: number;
    phase: "ready" | "playing" | "ended";
    startTime: number;
    endTime: number;

    start: () => void;
    restart: () => void;
    end: () => void;
};

const useGame = create<GameState>()(
    subscribeWithSelector((set) => ({
        blocksCount: 10,
        blocksSeed: 0,
        phase: "ready",
        startTime: 0,
        endTime: 0,

        start: () => {
            set((state) => ({
                phase: state.phase === "ready" ? "playing" : state.phase,
                startTime:
                    state.phase === "ready" ? Date.now() : state.startTime, // Set startTime only when phase changes to "playing"
            }));
        },

        restart: () => {
            set((state) => {
                if (state.phase === "playing" || state.phase === "ended") {
                    return { phase: "ready", blocksSeed: Math.random() };
                }
                return state; // Returns the current state if the condition is not met
            });
        },

        end: () => {
            set((state) => ({
                phase: state.phase === "playing" ? "ended" : state.phase, // Only end the game if it's "playing"
                endTime: state.phase === "playing" ? Date.now() : state.endTime, // Set endTime only when phase is "ended"
            }));
        },
    }))
);
export default useGame;
