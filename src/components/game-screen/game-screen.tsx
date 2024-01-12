import "./game-screen.scss";
import { SCREEN_SIZE, PIXEL_COUNT_PER_ROW } from "../../config";

const GRID_ARRAY = Array.from({ length: PIXEL_COUNT_PER_ROW });
const PIXEL_SIZE = SCREEN_SIZE / PIXEL_COUNT_PER_ROW;

const GameScreen = () => {
  return (
    <div
      className="GameScreen"
      style={{
        width: `${SCREEN_SIZE}rem`,
        height: `${SCREEN_SIZE}rem`,
      }}
    >
      {GRID_ARRAY.map((_, i) => (
        <div className="GameScreen__row" key={i}>
          {GRID_ARRAY.map((_, j) => (
            <div
              className="GameScreen__cell"
              key={j}
              style={{
                width: `${PIXEL_SIZE}rem`,
                height: `${PIXEL_SIZE}rem`,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameScreen;
