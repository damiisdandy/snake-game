import type { Actions, GlobalState } from ".";
import { INITIAL_STATE } from ".";
import {
  BASE_GAME_SPEED,
  MIN_GAME_SPEED,
  OBSTACLE_THRESHOLD_STEP,
  POINTS_PER_LEVEL,
  SPEED_STEP_PER_LEVEL,
} from "../config";
import {
  buildExclusionList,
  generateRandomPosition,
} from "../utils";

export const globalReducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case "MOVE_SNAKE": {
      const { position, growBy = 0 } = action.payload;
      const snakePositions = [position, ...state.snakePositions];
      let pendingGrowth = state.pendingGrowth + growBy;

      if (pendingGrowth > 0) {
        pendingGrowth -= 1;
      } else {
        snakePositions.pop();
      }

      return {
        ...state,
        snakePositions,
        pendingGrowth,
      };
    }
    case "SET_APPLE_POSITION": {
      const exclusions = buildExclusionList(
        state.snakePositions,
        state.obstacles,
        state.specialApple?.position
      );
      return {
        ...state,
        applePosition:
          action.payload?.position ?? generateRandomPosition(exclusions),
      };
    }
    case "EAT_APPLE": {
      const { kind } = action.payload;
      const scoreIncrement = kind === "golden" ? 5 : 1;
      const newScore = state.score + scoreIncrement;
      const level = Math.floor(newScore / POINTS_PER_LEVEL) + 1;
      const gameSpeed = Math.max(
        MIN_GAME_SPEED,
        BASE_GAME_SPEED - (level - 1) * SPEED_STEP_PER_LEVEL,
      );

      let applePosition = state.applePosition;
      let specialApple = state.specialApple;
      let obstacles = state.obstacles;
      let nextObstacleScore = state.nextObstacleScore;

      if (kind === "regular") {
        const exclusions = buildExclusionList(
          state.snakePositions,
          obstacles,
          specialApple?.position,
        );
        applePosition = generateRandomPosition(exclusions);
      } else {
        specialApple = null;
      }

      if (newScore >= nextObstacleScore) {
        const exclusions = buildExclusionList(
          state.snakePositions,
          obstacles,
          applePosition,
          specialApple?.position,
        );
        const obstaclePosition = generateRandomPosition(exclusions, {
          avoidEdges: false,
        });
        obstacles = [...obstacles, obstaclePosition];
        nextObstacleScore += OBSTACLE_THRESHOLD_STEP;
      }

      const highScore = Math.max(state.highScore, newScore);

      return {
        ...state,
        score: newScore,
        applePosition,
        specialApple,
        obstacles,
        nextObstacleScore,
        gameSpeed,
        level,
        highScore,
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
        isGamePaused: false,
      };
    }
    case "RESTART_GAME": {
      const applePosition = generateRandomPosition();
      return {
        ...INITIAL_STATE,
        applePosition,
        highScore: state.highScore,
        gameSpeed: BASE_GAME_SPEED,
      };
    }
    case "SPAWN_SPECIAL_APPLE": {
      return {
        ...state,
        specialApple: action.payload,
      };
    }
    case "DESPAWN_SPECIAL_APPLE": {
      return {
        ...state,
        specialApple: null,
      };
    }
    case "SET_HIGH_SCORE": {
      return {
        ...state,
        highScore: action.payload,
      };
    }
    default:
      return state;
  }
};
