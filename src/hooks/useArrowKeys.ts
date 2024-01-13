import { useContext, useEffect } from "react";
import { Direction, globalContext } from "../context";

export const useArrowKeys = () => {
  const { state, dispatch } = useContext(globalContext);



  useEffect(() => {
    const setDirection = (direction: Direction) => {
      dispatch({
        type: "SET_DIRECTION",
        payload: direction,
      });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection(Direction.Up);
          break;
        case 'ArrowDown':
          setDirection(Direction.Down);
          break;
        case 'ArrowLeft':
          setDirection(Direction.Left);
          break;
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
  }, [dispatch]);

  return state.currentDirection;
};