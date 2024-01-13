import { useContext } from "react";
import "./score.scss";
import { globalContext } from "../../context";

const Score = () => {
  const {
    state: { score },
  } = useContext(globalContext);
  return (
    <div className="Score">
      <p className="Score__title">Score</p>
      <p className="Score__number">{score}</p>
    </div>
  );
};

export default Score;
