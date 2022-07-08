import { useState } from "react";
import topImage from "./images/blob1.png";
import bottomImage from "./images/blob2.png";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  function handleGameStart() {
    setIsGameStarted((previsGameStarted) => !previsGameStarted);
  }

  return (
    <div className="container">
      <img src={topImage} className="blob1" />
      <img src={bottomImage} className="blob2" />
      {!isGameStarted ? <Welcome handleGameStart={handleGameStart} /> : <Quiz handleGameStart={handleGameStart}/>}
    </div>
  );
}
