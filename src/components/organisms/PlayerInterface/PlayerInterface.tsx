import "./playerInterface.css";

const playerInterface = () => {
    return (
        <div className="player-interface">
            <div className="player-interface__time">0.00</div>
            <div className="player-interface__btn player-interface__btn--restart">
                Restart
            </div>
        </div>
    );
};

export default playerInterface;
