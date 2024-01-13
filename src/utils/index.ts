import { PIXEL_COUNT_PER_ROW } from "../config";
import { Position } from "../context";

export const generateRandomPosition = (): Position => {
  // avoiding apples on the edges
  const MIN_BOUND = 1
  const MAX_BOUND = PIXEL_COUNT_PER_ROW - 1
  // numbers range from 1 to 
  const getRandomNumber = () => Math.min(Math.floor(Math.random() * MAX_BOUND) + MIN_BOUND, MAX_BOUND - 1);
  const x = getRandomNumber();
  const y = getRandomNumber();
  return {
    x, y
  };

};
