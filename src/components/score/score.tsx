import { useContext } from "react";
import "./score.scss";
import { globalContext } from "../../context";

type Props = {
  isGamePaused: boolean;
};

const Score = ({ isGamePaused }: Props) => {
  const {
    state: { score },
  } = useContext(globalContext);
  return (
    <div className="Score">
      <p className="Score__title">Score</p>
      <p className="Score__number">{score}</p>
      <p className="Score__pause">
        Press <span className="key">esc</span> to{" "}
        {isGamePaused ? "resume" : "pause"}
      </p>
    </div>
  );
};

export default Score;
