import { useContext } from "react";
import { PIXEL_COUNT_PER_ROW } from '../config'
import { Position, globalContext } from "../context";

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
  const { state, dispatch } = useContext(globalContext);

  const { snakePosition } = state;

  const setSnakePosition = (position: Position) => {
    dispatch({
      type: "MOVE_SNAKE",
      payload: position,
    })
  }

  const moveSnake = (direction: Direction) => {
    switch (direction) {
      case Direction.Up:
        setSnakePosition({
          x: snakePosition.x,
          y: onScreenEdgeResetPosition(snakePosition.y - 1)
        });
        break;
      case Direction.Down:
        setSnakePosition({
          x: snakePosition.x,
          y: onScreenEdgeResetPosition(snakePosition.y + 1)
        });
        break;
      case Direction.Left:
        setSnakePosition({
          y: snakePosition.y,
          x: onScreenEdgeResetPosition(snakePosition.x - 1)
        });
        break;
      case Direction.Right:
        setSnakePosition({
          y: snakePosition.y,
          x: onScreenEdgeResetPosition(snakePosition.x + 1)
        });
        break;
      default:
        break;
    }
  };


  return {
    position: {
      x: snakePosition.x,
      y: snakePosition.y,
    },
    moveSnake,
  };
}