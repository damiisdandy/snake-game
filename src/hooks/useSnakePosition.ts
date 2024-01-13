import { useContext } from "react";
import { PIXEL_COUNT_PER_ROW } from '../config'
import { Direction, Position, globalContext } from "../context";

const MOVEMENT_CONSTRAINT = PIXEL_COUNT_PER_ROW - 1; // 0 to 23


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

  const { snakePositions } = state;

  const snakesHead = snakePositions[0];

  const setSnakePosition = (position: Position) => {
    dispatch({
      type: "MOVE_SNAKE",
      payload: position,
    })
  }

  const moveSnake = (direction: Direction) => {
    let newPosition: Position = {
      x: 0,
      y: 0,
    };
    switch (direction) {
      case Direction.Up: {
        newPosition = {
          x: snakesHead.x,
          y: onScreenEdgeResetPosition(snakesHead.y - 1)
        };
        break;
      }
      case Direction.Down: {
        newPosition = {
          x: snakesHead.x,
          y: onScreenEdgeResetPosition(snakesHead.y + 1)
        };
        break;
      }
      case Direction.Left: {
        newPosition = {
          x: onScreenEdgeResetPosition(snakesHead.x - 1),
          y: snakesHead.y
        };
        break;
      }
      case Direction.Right: {
        newPosition = {
          x: onScreenEdgeResetPosition(snakesHead.x + 1),
          y: snakesHead.y
        };
        break;
      }
      default:
        throw new Error("Invalid direction");
    }
    if (newPosition) {
      if (snakePositions.some(position => position.x === newPosition.x && position.y === newPosition.y)) {
        dispatch({
          type: "END_GAME",
        })
        return;
      }
      setSnakePosition(newPosition);
    }
  };


  return {
    snakesHead,
    bodyPositions: snakePositions,
    moveSnake,
  };
}