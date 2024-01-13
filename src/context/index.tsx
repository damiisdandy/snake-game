import { Dispatch, createContext } from "react";

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
};

export type Actions =
  | {
      type: "MOVE_SNAKE";
      payload: Position;
    }
  | {
      type: "EAT_APPLE";
    }
  | {
      type: "SET_APPLE_POSITION";
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
};

export const globalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
