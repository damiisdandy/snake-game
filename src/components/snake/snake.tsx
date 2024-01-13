import "./snake.scss";
import { PIXEL_SIZE } from "../../config";
import { useContext } from "react";
import { Direction, Position, globalContext } from "../../context";

type Props = {
  position: Position;
};

const len = 10;

const Snake = ({ position }: Props) => {
  const {
    state: { currentDirection },
  } = useContext(globalContext);

  const getStaggerPosition = (i: number) => {
    switch (currentDirection) {
      case Direction.Up:
        return {
          top: `${PIXEL_SIZE * position.y + i}rem`,
          left: `${PIXEL_SIZE * position.x}rem`,
        };
      case Direction.Down:
        return {
          top: `${PIXEL_SIZE * position.y - i}rem`,
          left: `${PIXEL_SIZE * position.x}rem`,
        };
      case Direction.Left:
        return {
          top: `${PIXEL_SIZE * position.y}rem`,
          left: `${PIXEL_SIZE * position.x + i}rem`,
        };
      case Direction.Right:
        return {
          top: `${PIXEL_SIZE * position.y}rem`,
          left: `${PIXEL_SIZE * position.x - i}rem`,
        };
    }
  };

  return (
    <>
      {Array(len)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map((_, i) => (
          <div
            className="Snake"
            style={{
              width: `${PIXEL_SIZE}rem`,
              height: `${PIXEL_SIZE}rem`,
              ...getStaggerPosition(i),
            }}
          ></div>
        ))}
    </>
  );
};

export default Snake;
