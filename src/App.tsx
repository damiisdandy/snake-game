import GameScreen from "./components/game-screen/game-screen";
import Snake from "./components/snake/snake";
import Apple from "./components/apple/apple";

import "./App.scss";
import Score from "./components/score/score";
import { useGameInitialization } from "./hooks/useGameInitialization";

function App() {
  const { snakesBodyPositions, isGamePaused } = useGameInitialization();

  return (
    <div className="App">
      <Score isGamePaused={isGamePaused} />
      <div className="Game__wrapper">
        <GameScreen />
        <Snake bodyPositions={snakesBodyPositions} />
        <Apple />
      </div>
    </div>
  );
}

export default App;
