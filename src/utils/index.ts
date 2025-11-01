import { PIXEL_COUNT_PER_ROW } from "../config";
import { Position } from "../context";

export const positionsEqual = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

const keyFromPosition = (position: Position) => `${position.x}:${position.y}`;

const getRandomIntInclusive = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type GeneratePositionOptions = {
  avoidEdges?: boolean;
  maxAttempts?: number;
};

export const generateRandomPosition = (
  exclude: Position[] = [],
  options: GeneratePositionOptions = {}
): Position => {
  const {
    avoidEdges = true,
    maxAttempts = 200,
  } = options;

  const minBound = avoidEdges ? 1 : 0;
  const maxBound = PIXEL_COUNT_PER_ROW - (avoidEdges ? 2 : 1);

  const excluded = new Set(exclude.map(keyFromPosition));

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const x = getRandomIntInclusive(minBound, maxBound);
    const y = getRandomIntInclusive(minBound, maxBound);
    const key = `${x}:${y}`;
    if (!excluded.has(key)) {
      return { x, y };
    }
  }

  for (let y = minBound; y <= maxBound; y += 1) {
    for (let x = minBound; x <= maxBound; x += 1) {
      const key = `${x}:${y}`;
      if (!excluded.has(key)) {
        return { x, y };
      }
    }
  }

  return { x: minBound, y: minBound };
};

export const buildExclusionList = (
  ...groups: Array<Position | Position[] | null | undefined>
): Position[] => {
  const positions: Position[] = [];
  groups.forEach((group) => {
    if (!group) {
      return;
    }
    if (Array.isArray(group)) {
      positions.push(...group);
    } else {
      positions.push(group);
    }
  });
  return positions;
};
