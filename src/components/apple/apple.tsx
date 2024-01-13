import { useEffect } from "react";
import { PIXEL_SIZE } from "../../config";
import { useApples } from "../../hooks/useApples";
import "./apple.scss";
import { useSnakePosition } from "../../hooks/useSnakePosition";

const Apples = () => {
  const { position: applePosition, eatApple } = useApples();
  const { snakesHead } = useSnakePosition();

  useEffect(() => {
    if (applePosition.x === snakesHead.x && applePosition.y === snakesHead.y) {
      eatApple();
    }
  }, [snakesHead, applePosition, eatApple]);

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
