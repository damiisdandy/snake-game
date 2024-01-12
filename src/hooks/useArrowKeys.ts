import { useEffect, useState } from "react";
import { Direction } from "./useSnakePosition";

export const useArrowKeys = () => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);

  useEffect(() => {
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
  }, []);

  return direction;
};