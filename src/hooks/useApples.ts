import { useContext, useEffect } from "react";
import { globalContext } from "../context";


export const useApples = () => {
  const { state, dispatch } = useContext(globalContext);

  const { applePosition } = state;

  useEffect(() => {
    // set initial apple position
    dispatch({
      type: "SET_APPLE_POSITION",
    });
  }, [dispatch]);

  const eatApple = () => {
    dispatch({
      type: "EAT_APPLE",
    })
  };

  return {
    position: applePosition,
    eatApple,
  };
}