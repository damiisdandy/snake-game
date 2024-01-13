import type { Actions, GlobalState } from ".";
import { INITIAL_STATE } from ".";
import { generateRandomPosition } from "../utils";

export const globalReducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case "MOVE_SNAKE": {
      const currentSnakePositions = state.snakePositions;
      const snakePositions = [action.payload, ...currentSnakePositions];
      snakePositions.pop();
      return {
        ...state,
        snakePositions,
      };
    }
    case "SET_APPLE_POSITION": {
      return {
        ...state,
        applePosition: generateRandomPosition()
      };
    }
    case "EAT_APPLE": {
      const { snakePositions: currentSnakePositions } = state;
      const snakesTail = currentSnakePositions[currentSnakePositions.length - 1];
      const snakePositions = [...currentSnakePositions, snakesTail];

      return {
        ...state,
        snakePositions,
        applePosition: generateRandomPosition(),
        score: state.score + 1,
      };
    }
    case "SET_DIRECTION": {
      if (state.isGamePaused || state.isGameOver) {
        return state;
      }
      return {
        ...state,
        currentDirection: action.payload,
      };
    }
    case "TOGGLE_PAUSE_GAME": {
      return {
        ...state,
        isGamePaused: !state.isGamePaused,
      };
    }
    case "END_GAME": {
      return {
        ...state,
        isGameOver: true,
      };
    }
    case "RESTART_GAME": {
      return {
        ...INITIAL_STATE,
        applePosition: generateRandomPosition()
      };
    }
    default:
      return state;
  }
};
