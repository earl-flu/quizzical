export default function Welcome(props) {
    
  return (
    <div className="quizzical">
      <h1 className="quizzical__title">Quizzical</h1>
      <p className="quizzical__subtext">Lorem ipsum dolor sit amet</p>
      <button className="button" onClick={props.handleGameStart}>Start Quiz</button>
    </div>
  );
}
