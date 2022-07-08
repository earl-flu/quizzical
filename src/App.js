import { useState } from "react";
import topImage from "./images/blob1.png";
import bottomImage from "./images/blob2.png";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [formData, setFormData] = useState({
    trivia_amount: 5,
    trivia_category: "any",
    trivia_difficulty: "hard",
  });

  function handleFormChange(e) {
    const {value, name} = e.target;
    setFormData(prevFormData => {
      return {...prevFormData, [name]: value}
    })
  }
  console.log(formData)
  function handleGameStart() {
    setIsGameStarted((previsGameStarted) => !previsGameStarted);
  }

  return (
    <div className="container">
      <img src={topImage} className="blob1" />
      <img src={bottomImage} className="blob2" />
      {!isGameStarted ? (
        <Welcome
          handleGameStart={handleGameStart}
          handleFormChange={handleFormChange}
          formData={formData}
        />
      ) : (
        <Quiz formData={formData} handleGameStart={handleGameStart} />
      )}
    </div>
  );
}
