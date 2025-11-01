import { useContext, useMemo } from "react";
import { PIXEL_COUNT_PER_ROW } from "../config";
import { Direction, Position, globalContext } from "../context";
import { positionsEqual } from "../utils";

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

  const {
    snakePositions,
    applePosition,
    specialApple,
    obstacles,
  } = state;

  const snakesHead = snakePositions[0];

  const growAmount = useMemo(() => ({ regular: 1, golden: 3 }), []);

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
    const ateRegularApple = positionsEqual(newPosition, applePosition);
    const ateSpecialApple = specialApple
      ? positionsEqual(newPosition, specialApple.position)
      : false;

    const growBy = (ateRegularApple ? growAmount.regular : 0) +
      (ateSpecialApple ? growAmount.golden : 0);

    const bodySegmentsToCheck =
      growBy === 0 && snakePositions.length > 1
        ? snakePositions.slice(0, -1)
        : snakePositions;

    const collidedWithSelf = bodySegmentsToCheck.some((position) =>
      positionsEqual(position, newPosition)
    );

    const collidedWithObstacle = obstacles.some((position) =>
      positionsEqual(position, newPosition)
    );

    if (collidedWithSelf || collidedWithObstacle) {
      dispatch({
        type: "END_GAME",
      });
      return;
    }

    dispatch({
      type: "MOVE_SNAKE",
      payload: {
        position: newPosition,
        growBy,
      },
    });

    if (ateRegularApple) {
      dispatch({
        type: "EAT_APPLE",
        payload: { kind: "regular" },
      });
    }

    if (ateSpecialApple && specialApple) {
      dispatch({
        type: "EAT_APPLE",
        payload: { kind: specialApple.kind },
      });
    }
  };


  return {
    snakesHead,
    bodyPositions: snakePositions,
    moveSnake,
  };
}