import "./game-screen.scss";
import { useContext, useEffect, useMemo, useRef } from "react";
import {
  PIXEL_COUNT_PER_ROW,
  ROOT_FONT_SIZE,
  SCREEN_SIZE,
} from "../../config";
import { globalContext } from "../../context";

const CANVAS_BACKGROUND = "#0b0d11";
const GRID_STROKE = "rgba(148, 163, 184, 0.12)";
const SNAKE_HEAD_COLOR = "#38bdf8";
const APPLE_COLOR = "#f97316";
const OBSTACLE_COLOR = "#ef4444";

const toPixels = (unit: number, cellSize: number) => unit * cellSize;

const drawRoundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
  context.fill();
};

const GameScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    state: {
      snakePositions,
      applePosition,
      specialApple,
      obstacles,
      isGamePaused,
      isGameOver,
    },
  } = useContext(globalContext);

  const metrics = useMemo(() => {
    const sizePx = SCREEN_SIZE * ROOT_FONT_SIZE;
    const cellSize = sizePx / PIXEL_COUNT_PER_ROW;
    return { sizePx, cellSize };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const { sizePx } = metrics;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = sizePx * dpr;
    canvas.height = sizePx * dpr;
    canvas.style.width = `${SCREEN_SIZE}rem`;
    canvas.style.height = `${SCREEN_SIZE}rem`;

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.scale(dpr, dpr);
  }, [metrics]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { sizePx, cellSize } = metrics;

    context.save();

    context.clearRect(0, 0, sizePx, sizePx);

    context.fillStyle = CANVAS_BACKGROUND;
    context.fillRect(0, 0, sizePx, sizePx);

    context.strokeStyle = GRID_STROKE;
    context.lineWidth = 1;
    context.beginPath();
    for (let i = 0; i <= PIXEL_COUNT_PER_ROW; i += 1) {
      const offset = Math.round(i * cellSize) + 0.5;
      context.moveTo(offset, 0);
      context.lineTo(offset, sizePx);
      context.moveTo(0, offset);
      context.lineTo(sizePx, offset);
    }
    context.stroke();

    context.fillStyle = APPLE_COLOR;
    const appleX = toPixels(applePosition.x, cellSize);
    const appleY = toPixels(applePosition.y, cellSize);
    drawRoundedRect(context, appleX, appleY, cellSize, cellSize, cellSize * 0.25);

    if (specialApple) {
      const specialX = toPixels(specialApple.position.x, cellSize);
      const specialY = toPixels(specialApple.position.y, cellSize);
      const centerX = specialX + cellSize / 2;
      const centerY = specialY + cellSize / 2;
      const gradient = context.createRadialGradient(
        centerX,
        centerY,
        cellSize * 0.15,
        centerX,
        centerY,
        cellSize * 0.8,
      );
      gradient.addColorStop(0, "#fde68a");
      gradient.addColorStop(0.5, "#facc15");
      gradient.addColorStop(1, "rgba(250, 204, 21, 0.2)");
      context.fillStyle = gradient;
      context.shadowBlur = cellSize * 0.6;
      context.shadowColor = "rgba(250, 204, 21, 0.65)";
      drawRoundedRect(context, specialX, specialY, cellSize, cellSize, cellSize * 0.3);
      context.shadowBlur = 0;
      context.shadowColor = "transparent";
    }

    obstacles.forEach((obstacle) => {
      context.fillStyle = OBSTACLE_COLOR;
      const x = toPixels(obstacle.x, cellSize);
      const y = toPixels(obstacle.y, cellSize);
      drawRoundedRect(context, x, y, cellSize, cellSize, cellSize * 0.2);
    });

    const segmentCount = Math.max(snakePositions.length - 1, 1);

    snakePositions.forEach((segment, index) => {
      const x = toPixels(segment.x, cellSize);
      const y = toPixels(segment.y, cellSize);
      const progress = index / segmentCount;
      const hueStart = 160;
      const hueEnd = 190;
      const hue = hueStart + (hueEnd - hueStart) * (1 - progress);
      const lightness = 45 + 20 * (1 - progress);
      context.fillStyle = index === 0
        ? SNAKE_HEAD_COLOR
        : `hsl(${hue}, 85%, ${lightness}%)`;
      drawRoundedRect(context, x, y, cellSize, cellSize, cellSize * (index === 0 ? 0.35 : 0.25));

      if (index === 0) {
        const eyeSize = cellSize * 0.1;
        const eyeOffsetX = cellSize * 0.25;
        const eyeOffsetY = cellSize * 0.25;
        context.fillStyle = "#0f172a";
        context.beginPath();
        context.arc(x + eyeOffsetX, y + eyeOffsetY, eyeSize, 0, Math.PI * 2);
        context.arc(x + cellSize - eyeOffsetX, y + eyeOffsetY, eyeSize, 0, Math.PI * 2);
        context.fill();
      }
    });

    if (isGameOver || isGamePaused) {
      context.fillStyle = "rgba(15, 23, 42, 0.6)";
      context.fillRect(0, 0, sizePx, sizePx);
      context.fillStyle = "#f8fafc";
      context.font = `${Math.round(cellSize * 1.2)}px 'Fira Sans', sans-serif`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        isGameOver ? "Game Over" : "Paused",
        sizePx / 2,
        sizePx / 2,
      );
    }

    context.restore();
  }, [metrics, snakePositions, applePosition, specialApple, obstacles, isGamePaused, isGameOver]);

  return (
    <div className="GameScreen">
      <canvas ref={canvasRef} className="GameScreen__canvas" />
    </div>
  );
};

export default GameScreen;
