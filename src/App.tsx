import { useEffect } from "react";

import { GAME_SPEED } from "./config";
import GameScreen from "./components/game-screen/game-screen";
import Snake from "./components/snake/snake";
import Apple from "./components/apple/apple";
import { useSnakePosition } from "./hooks/useSnakePosition";
import { useArrowKeys } from "./hooks/useArrowKeys";

import "./App.scss";
import Score from "./components/score/score";

function App() {
  const { position, moveSnake } = useSnakePosition();
  const direction = useArrowKeys();

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
      <Score />
      <div className="Game__wrapper">
        <GameScreen />
        <Snake position={[position.x, position.y]} />
        <Apple />
      </div>
    </div>
  );
}

export default App;
