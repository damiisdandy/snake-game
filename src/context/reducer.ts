import type { Actions, GlobalState } from ".";
import { generateRandomPosition } from "../utils";

export const globalReducer = (state: GlobalState, action: Actions): GlobalState => {
  switch (action.type) {
    case "MOVE_SNAKE":
      return {
        ...state,
        snakePosition: action.payload,
      };
    case "SET_APPLE_POSITION":
      return {
        ...state,
        applePosition: generateRandomPosition()
      };
    case "EAT_APPLE":
      return {
        ...state,
        applePosition: generateRandomPosition(),
        score: state.score + 1,
      };
    default:
      return state;
  }
};
