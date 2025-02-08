import "./PlayerInterface.css";
import { useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "../../../stores/useGame";
import { useRef } from "react";
import { addEffect } from "@react-three/fiber";

const playerInterface = () => {
    const handleRestart = useGame((state) => state.restart);
    const phase = useGame((state) => state.phase);
    const time = useRef<HTMLDivElement>(null); // DOM element
    const elapsedTimeRef = useRef<number>(0); // Store the elapsed time as a number

    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const leftward = useKeyboardControls((state) => state.leftward);
    const rightward = useKeyboardControls((state) => state.rightward);
    const jump = useKeyboardControls((state) => state.jump);

    // Call addEffect on the first render of the component
    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const { phase, startTime, endTime } = useGame.getState();
            let elapsedTime = 0;

            if (phase === "playing") {
                elapsedTime = Date.now() - startTime; // Time since game started
            } else if (phase === "ended") {
                elapsedTime = endTime - startTime; // Time between start and end
            }

            // Store elapsed time in the ref
            elapsedTimeRef.current = elapsedTime /= 1000; // Store in seconds

            // Update the DOM directly (without causing a re-render)
            if (time.current) {
                time.current.textContent = elapsedTimeRef.current.toFixed(2); // Manually update the text content
            }
        });

        return () => {
            unsubscribeEffect();
        };
    }, []);

    return (
        <div className="player-interface">
            <div className="player-interface__time" ref={time}>
                {elapsedTimeRef.current}{" "}
                {/* Displaying elapsed time from ref */}
            </div>
            {phase === "ended" && (
                <div
                    className="player-interface__restart"
                    onClick={handleRestart}
                >
                    Restart
                </div>
            )}

            {/* Controls */}
            <div className="player-interface__controls">
                <div className="player-interface__row">
                    <div
                        className={`player-interface__key ${
                            forward ? "player-interface__key--active" : ""
                        }`}
                    ></div>
                </div>
                <div className="player-interface__row">
                    <div
                        className={`player-interface__key ${
                            leftward ? "player-interface__key--active" : ""
                        }`}
                    ></div>
                    <div
                        className={`player-interface__key ${
                            backward ? "player-interface__key--active" : ""
                        }`}
                    ></div>
                    <div
                        className={`player-interface__key ${
                            rightward ? "player-interface__key--active" : ""
                        }`}
                    ></div>
                </div>
                <div className="player-interface__row">
                    <div
                        className={`player-interface__key player-interface__key--large ${
                            jump ? "player-interface__key--active" : ""
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default playerInterface;
