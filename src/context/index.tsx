import { Dispatch, createContext } from "react";
import {
  BASE_GAME_SPEED,
  OBSTACLE_INITIAL_THRESHOLD,
} from "../config";

export type Position = {
  x: number;
  y: number;
};

export enum Direction {
  // eslint-disable-next-line no-unused-vars
  Up = "up",
  // eslint-disable-next-line no-unused-vars
  Down = "down",
  // eslint-disable-next-line no-unused-vars
  Left = "left",
  // eslint-disable-next-line no-unused-vars
  Right = "right",
}

export type GlobalState = {
  snakePositions: Position[];
  applePosition: Position;
  score: number;
  currentDirection: Direction;
  isGamePaused: boolean;
  isGameOver: boolean;
  pendingGrowth: number;
  gameSpeed: number;
  level: number;
  highScore: number;
  obstacles: Position[];
  nextObstacleScore: number;
  specialApple: SpecialApple | null;
};

export type SpecialApple = {
  position: Position;
  kind: "golden";
  expiresAt: number;
};

export type Actions =
  | {
      type: "MOVE_SNAKE";
      payload: {
        position: Position;
        growBy?: number;
      };
    }
  | {
      type: "EAT_APPLE";
      payload: {
        kind: "regular" | "golden";
      };
    }
  | {
      type: "SET_APPLE_POSITION";
      payload?: {
        position?: Position;
      };
    }
  | {
      type: "SET_DIRECTION";
      payload: Direction;
    }
  | {
      type: "SET_POSITION_OF_DIRECTION_CHANGE";
      payload: Position;
    }
  | {
      type: "TOGGLE_PAUSE_GAME";
    }
  | {
      type: "END_GAME";
    }
  | {
      type: "RESTART_GAME";
    }
  | {
      type: "SPAWN_SPECIAL_APPLE";
      payload: SpecialApple;
    }
  | {
      type: "DESPAWN_SPECIAL_APPLE";
    }
  | {
      type: "SET_HIGH_SCORE";
      payload: number;
    };

export const INITIAL_STATE: GlobalState = {
  snakePositions: [
    {
      x: 0,
      y: 0,
    },
  ],
  applePosition: {
    x: 1,
    y: 1,
  },
  score: 0,
  currentDirection: Direction.Right,
  isGameOver: false,
  isGamePaused: false,
  pendingGrowth: 0,
  gameSpeed: BASE_GAME_SPEED,
  level: 1,
  highScore: 0,
  obstacles: [],
  nextObstacleScore: OBSTACLE_INITIAL_THRESHOLD,
  specialApple: null,
};

export const globalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
