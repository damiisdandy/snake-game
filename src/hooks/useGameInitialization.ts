import { useContext, useEffect, useRef } from "react";
import {
  GOLDEN_APPLE_CHANCE,
  GOLDEN_APPLE_LIFESPAN,
} from "../config";
import { useArrowKeys } from "./useArrowKeys";
import { useSnakePosition } from "./useSnakePosition";
import { globalContext } from "../context";
import { buildExclusionList, generateRandomPosition } from "../utils";

export const useGameInitialization = () => {
  const {
    state: {
      isGamePaused,
      isGameOver,
      gameSpeed,
      specialApple,
      score,
      applePosition,
      obstacles,
      snakePositions,
      highScore,
    },
    dispatch,
  } = useContext(globalContext);
  const { bodyPositions, moveSnake } = useSnakePosition();
  const direction = useArrowKeys();

  useEffect(() => {
    dispatch({
      type: "SET_APPLE_POSITION",
    });
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "p" || event.key === "P") {
        dispatch({
          type: "TOGGLE_PAUSE_GAME"
        })
        return;
      }

      if (event.key === "r" || event.key === "R") {
        dispatch({ type: "RESTART_GAME" });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };
  }, [dispatch]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTick = performance.now();

    const loop = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(loop);
      if (isGamePaused || isGameOver) {
        lastTick = timestamp;
        return;
      }
      if (timestamp - lastTick >= gameSpeed) {
        lastTick = timestamp;
        moveSnake(direction);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [moveSnake, direction, isGamePaused, isGameOver, gameSpeed]);

  useEffect(() => {
    if (!specialApple) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch({ type: "DESPAWN_SPECIAL_APPLE" });
    }, Math.max(0, specialApple.expiresAt - Date.now()));

    return () => {
      window.clearTimeout(timeout);
    };
  }, [specialApple, dispatch]);

  const lastScoreRef = useRef(score);

  useEffect(() => {
    if (score === lastScoreRef.current) {
      return;
    }

    if (!isGameOver && !specialApple && Math.random() < GOLDEN_APPLE_CHANCE) {
      const exclusions = buildExclusionList(
        snakePositions,
        obstacles,
        applePosition,
      );
      const position = generateRandomPosition(exclusions, {
        avoidEdges: false,
      });
      dispatch({
        type: "SPAWN_SPECIAL_APPLE",
        payload: {
          position,
          kind: "golden",
          expiresAt: Date.now() + GOLDEN_APPLE_LIFESPAN,
        },
      });
    }

    lastScoreRef.current = score;
  }, [score, specialApple, dispatch, snakePositions, obstacles, applePosition, isGameOver]);

  useEffect(() => {
    const storedHighScore = Number(
      window.localStorage.getItem("snake.highScore") ?? "0"
    );
    if (storedHighScore > 0) {
      dispatch({ type: "SET_HIGH_SCORE", payload: storedHighScore });
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem("snake.highScore", String(highScore));
  }, [highScore]);

  return {
    snakesBodyPositions: bodyPositions,
    isGamePaused,
    gameSpeed,
  }
}