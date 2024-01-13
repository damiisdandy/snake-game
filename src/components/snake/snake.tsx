import "./snake.scss";
import { PIXEL_SIZE } from "../../config";
import { Direction, Position, globalContext } from "../../context";
import { useCallback, useContext } from "react";

type Props = {
  bodyPositions: Position[];
};

const Snake = ({ bodyPositions }: Props) => {
  const {
    state: { isGameOver, currentDirection },
  } = useContext(globalContext);

  const getExplosionPosition = useCallback(() => {
    switch (currentDirection) {
      case Direction.Up:
        return {
          top: `-${PIXEL_SIZE}rem`,
          left: `${1.5 - PIXEL_SIZE}rem`,
        };
      case Direction.Down:
        return {
          bottom: `-${PIXEL_SIZE}rem`,
          left: `${1.5 - PIXEL_SIZE}rem`,
        };
      case Direction.Left:
        return {
          left: `-${PIXEL_SIZE / 2}rem`,
          top: `-${PIXEL_SIZE / 3}rem`,
        };
      case Direction.Right:
        return {
          right: `-${PIXEL_SIZE / 2}rem`,
          top: `-${PIXEL_SIZE / 3}rem`,
        };
    }
  }, [currentDirection]);

  return (
    <>
      {bodyPositions.map((position, i) => (
        <div
          key={i}
          className="Snake"
          style={{
            width: `${PIXEL_SIZE}rem`,
            height: `${PIXEL_SIZE}rem`,
            top: `${PIXEL_SIZE * position.y}rem`,
            left: `${PIXEL_SIZE * position.x}rem`,
            zIndex: bodyPositions.length - i,
          }}
        >
          {i}
          {isGameOver && i === 0 && (
            <span
              className="Snake__dead"
              style={{
                fontSize: `${PIXEL_SIZE}rem`,
                ...getExplosionPosition(),
              }}
            >
              💥
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default Snake;
