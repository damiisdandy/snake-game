import { useEffect } from "react";
import { PIXEL_SIZE } from "../../config";
import { useApples } from "../../hooks/useApples";
import "./apple.scss";
import { useSnakePosition } from "../../hooks/useSnakePosition";

const Apples = () => {
  const { position: applePosition, eatApple } = useApples();
  const { position: snakePosition } = useSnakePosition();

  useEffect(() => {
    if (
      applePosition.x === snakePosition.x &&
      applePosition.y === snakePosition.y
    ) {
      eatApple();
    }
  }, [snakePosition, applePosition, eatApple]);

  return (
    <div
      className="Apples__apple"
      style={{
        left: `${PIXEL_SIZE * applePosition.x}rem`,
        top: `${PIXEL_SIZE * applePosition.y}rem`,
        width: `${PIXEL_SIZE}rem`,
        height: `${PIXEL_SIZE}rem`,
        fontSize: `${PIXEL_SIZE * 0.7}rem`,
      }}
    >
      🍎
    </div>
  );
};

export default Apples;
