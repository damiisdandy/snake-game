export const SCREEN_SIZE = 70; // in rem
export const PIXEL_COUNT_PER_ROW = 40; // grid resolution (PIXEL_COUNT_PER_ROW ^ 2)
export const PIXEL_SIZE = SCREEN_SIZE / PIXEL_COUNT_PER_ROW; // in rem

export const ROOT_FONT_SIZE = 10; // html font-size in px (see App.scss)

export const BASE_GAME_SPEED = 120; // ms between ticks at level 1
export const MIN_GAME_SPEED = 45; // clamp lower-bound for speed ups
export const SPEED_STEP_PER_LEVEL = 5; // ms decrease per level
export const POINTS_PER_LEVEL = 5; // score needed to level up

export const GOLDEN_APPLE_CHANCE = 0.25; // probability after eating to spawn golden apple
export const GOLDEN_APPLE_LIFESPAN = 8000; // ms before golden apple expires

export const OBSTACLE_INITIAL_THRESHOLD = 6; // score needed before first obstacle
export const OBSTACLE_THRESHOLD_STEP = 4; // additional score needed between obstacle spawns