import { useContext } from "react";
import "./score.scss";
import { globalContext } from "../../context";

type Props = {
  isGamePaused: boolean;
};

const Score = ({ isGamePaused }: Props) => {
  const {
    state: { score, isGameOver },
    dispatch,
  } = useContext(globalContext);

  const restartGame = () => {
    dispatch({ type: "RESTART_GAME" });
  };
  return (
    <div className="Score">
      <p className="Score__title">Score</p>
      <p className="Score__number">{score}</p>
      <p className="Score__pause">
        Press <span className="key">ESC</span> to{" "}
        {isGamePaused ? "resume" : "pause"}
      </p>
      {isGameOver && (
        <div>
          <p className="Score__game-over">Game Over</p>
          <button className="Score__restart" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Score;
