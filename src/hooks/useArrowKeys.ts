import { useCallback, useContext, useEffect } from "react";
import { Direction, globalContext } from "../context";

export const useArrowKeys = () => {
  const { state, dispatch } = useContext(globalContext);

  const { currentDirection } = state;

  const setDirection = useCallback((direction: Direction) => {
    switch (direction) {
      case Direction.Up:
        if (currentDirection === Direction.Down) {
          return;
        }
        break;
      case Direction.Down:
        if (currentDirection === Direction.Up) {
          return;
        }
        break;
      case Direction.Left:
        if (currentDirection === Direction.Right) {
          return;
        }
        break;
      case Direction.Right:
        if (currentDirection === Direction.Left) {
          return;
        }
        break;
      default:
        break;
    }
    dispatch({
      type: "SET_DIRECTION",
      payload: direction,
    })
  }, [currentDirection, dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w':
        case 'ArrowUp':
          setDirection(Direction.Up);
          break;
        case 's':
        case 'ArrowDown':
          setDirection(Direction.Down);
          break;
        case 'a':
        case 'ArrowLeft':
          setDirection(Direction.Left);
          break;
        case 'd':
        case 'ArrowRight':
          setDirection(Direction.Right);
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };
  }, [setDirection]);

  return currentDirection;
};