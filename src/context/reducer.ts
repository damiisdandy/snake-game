import type { Actions, GlobalState } from ".";

export const globalReducer = (state: GlobalState, action: Actions) => {
  switch (action.type) {
    case "MOVE_SNAKE":
      return {
        ...state,
        snakePosition: action.payload,
      };
    default:
      return state;
  }
};
