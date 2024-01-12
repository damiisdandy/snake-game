import { useState } from "react";
import { PIXEL_COUNT_PER_ROW } from '../config'

const MOVEMENT_CONSTRAINT = PIXEL_COUNT_PER_ROW - 1; // 0 to 23

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

const onScreenEdgeResetPosition = (position: number) => {
  if (position < 0) {
    return MOVEMENT_CONSTRAINT;
  } else if (position > MOVEMENT_CONSTRAINT) {
    return 0;
  }
  return position;

}

export const useSnakePosition = () => {
  const [snakePosition, setSnakePosition] = useState({
    x: 0,
    y: 0,
  });

  const moveSnake = (direction: Direction) => {
    switch (direction) {
      case Direction.Up:
        setSnakePosition(({ x, y }) => ({
          x,
          y: onScreenEdgeResetPosition(y - 1)
        }));
        break;
      case Direction.Down:
        setSnakePosition(({ x, y }) => ({
          x,
          y: onScreenEdgeResetPosition(y + 1),
        }));
        break;
      case Direction.Left:
        setSnakePosition(({ x, y }) => ({
          y,
          x: onScreenEdgeResetPosition(x - 1)
        }));
        break;
      case Direction.Right:
        setSnakePosition(({ x, y }) => ({
          y,
          x: onScreenEdgeResetPosition(x + 1),
        }));
        break;
      default:
        break;
    }
  };


  return {
    position: snakePosition,
    moveSnake,
  };
}