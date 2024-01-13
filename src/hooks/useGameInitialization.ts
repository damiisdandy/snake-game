import { useContext, useEffect } from "react";
import { GAME_SPEED } from "../config";
import { useArrowKeys } from "./useArrowKeys";
import { useSnakePosition } from "./useSnakePosition";
import { globalContext } from "../context";

export const useGameInitialization = () => {
  const { state: { isGamePaused, isGameOver }, dispatch } = useContext(globalContext);
  const { bodyPositions, moveSnake } = useSnakePosition();
  const direction = useArrowKeys();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch({
          type: "TOGGLE_PAUSE_GAME"
        })
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isGamePaused || isGameOver) {
        return;
      }
      moveSnake(direction);
    }, GAME_SPEED);
    return () => {
      clearInterval(timer);
    };
  }, [moveSnake, direction, isGamePaused, isGameOver]);

  return {
    snakesBodyPositions: bodyPositions,
    isGamePaused,
  }
}