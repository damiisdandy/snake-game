import GameScreen from "./components/game-screen/game-screen";

import "./App.scss";
import Score from "./components/score/score";
import { useGameInitialization } from "./hooks/useGameInitialization";

function App() {
  const { isGamePaused } = useGameInitialization();

  return (
    <div className="App">
      <Score isGamePaused={isGamePaused} />
      <div className="Game__wrapper">
        <GameScreen />
      </div>
    </div>
  );
}

export default App;
