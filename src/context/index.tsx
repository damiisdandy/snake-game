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
  snakePosition: Position;
  applePosition: Position;
  score: number;
  currentDirection: Direction;
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
    };

export const INITIAL_STATE: GlobalState = {
  snakePosition: {
    x: 0,
    y: 0,
  },
  applePosition: {
    x: 1,
    y: 1,
  },
  score: 0,
  currentDirection: Direction.Right,
};

export const globalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
