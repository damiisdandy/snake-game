import { Dispatch, createContext } from "react";

export type Position = {
  x: number;
  y: number;
};

export type GlobalState = {
  snakePosition: Position;
};

export type Actions = {
  type: "MOVE_SNAKE";
  payload: Position;
};

export const INITIAL_STATE: GlobalState = {
  snakePosition: {
    x: 0,
    y: 0,
  },
};

export const globalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});
