import "./PlayerInterface.css";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "../../../stores/useGame";

const playerInterface = () => {
    const forward = useKeyboardControls((state) => state.forward);
    const backward = useKeyboardControls((state) => state.backward);
    const leftward = useKeyboardControls((state) => state.leftward);
    const rightward = useKeyboardControls((state) => state.rightward);
    const jump = useKeyboardControls((state) => state.jump);

    console.log(forward, backward, leftward, rightward, jump);

    return (
        <div className="player-interface">
            <div className="player-interface__time">0.00</div>
            <div className="player-interface__restart">Restart</div>

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
