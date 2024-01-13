import { FC, ReactNode, useReducer } from "react";
import { globalReducer } from "./reducer";
import { INITIAL_STATE, globalContext } from ".";

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, INITIAL_STATE);

  return (
    <globalContext.Provider value={{ state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};
