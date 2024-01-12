import { useEffect } from "react";

import { GAME_SPEED } from "./config";
import GameScreen from "./components/game-screen/game-screen";
import Snake from "./components/snake/snake";
import Apples from "./components/apples/apples";
import { Direction, useSnakePosition } from "./hooks/useSnakePosition";
import { useArrowKeys } from "./hooks/useArrowKeys";

import "./App.scss";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const { position, moveSnake } = useSnakePosition();
  const directionRaw = useArrowKeys();
  const direction = useDebounce<Direction>(directionRaw, GAME_SPEED / 2);

  useEffect(() => {
    const timer = setInterval(() => {
      moveSnake(direction);
    }, GAME_SPEED);
    return () => {
      clearInterval(timer);
    };
  }, [moveSnake, direction]);

  return (
    <div className="App">
      <div className="Game__wrapper">
        <GameScreen />
        <Snake position={[position.x, position.y]} />
        <Apples />
      </div>
    </div>
  );
}

export default App;
