import { useContext, useEffect, useMemo, useState } from "react";
import "./score.scss";
import { globalContext } from "../../context";

type Props = {
  isGamePaused: boolean;
};

const Score = ({ isGamePaused }: Props) => {
  const {
    state: {
      score,
      level,
      highScore,
      isGameOver,
      gameSpeed,
      specialApple,
      obstacles,
    },
    dispatch,
  } = useContext(globalContext);

  const [goldenTimer, setGoldenTimer] = useState(0);

  useEffect(() => {
    if (!specialApple) {
      setGoldenTimer(0);
      return;
    }

    const update = () => {
      setGoldenTimer(Math.max(0, specialApple.expiresAt - Date.now()));
    };

    update();
    const interval = window.setInterval(update, 120);
    return () => window.clearInterval(interval);
  }, [specialApple]);

  const ticksPerSecond = useMemo(() => (1000 / gameSpeed).toFixed(1), [gameSpeed]);

  const restartGame = () => {
    dispatch({ type: "RESTART_GAME" });
  };
  return (
    <div className="Score">
      <p className="Score__title">Score</p>
      <p className="Score__number">{score}</p>
      <div className="Score__grid">
        <div className="Score__grid-item">
          <p className="Score__label">Level</p>
          <p className="Score__value">{level}</p>
        </div>
        <div className="Score__grid-item">
          <p className="Score__label">High Score</p>
          <p className="Score__value">{highScore}</p>
        </div>
        <div className="Score__grid-item">
          <p className="Score__label">Speed</p>
          <p className="Score__value">{ticksPerSecond} tps</p>
        </div>
        <div className="Score__grid-item">
          <p className="Score__label">Obstacles</p>
          <p className="Score__value">{obstacles.length}</p>
        </div>
      </div>
      <div className="Score__status">
        <p className="Score__pause">
          Press <span className="key">ESC</span> / <span className="key">P</span> to {isGamePaused ? "resume" : "pause"} | Press <span className="key">R</span> to restart
        </p>
        {specialApple && (
          <p className="Score__golden">
            Golden apple active | {Math.ceil(goldenTimer / 1000)}s left
          </p>
        )}
      </div>
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
