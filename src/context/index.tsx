import { Dispatch, createContext } from "react";

export type Position = {
  x: number;
  y: number;
};

export type GlobalState = {
  snakePosition: Position;
  applePosition: Position;
  score: number;
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
};

export const globalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
