import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import QuestionsList from "../components/QuestionsList";
import Loader from "../components/Loader"

export default function Quiz(props) {
  const [questions, setQuestions] = useState([]);
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  console.log(questions);
  //call api
  useEffect(() => {
    const { trivia_category, trivia_difficulty, trivia_amount } =
      props.formData;
    const categoryParam =
      trivia_category === "any" ? "" : `&category=${trivia_category}`;
    const difficultyParam =
      trivia_difficulty === "any" ? "" : `&difficulty=${trivia_difficulty}`;

    const endpoint = `https://opentdb.com/api.php?amount=${trivia_amount}${categoryParam}${difficultyParam}&type=multiple`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const questionsData = mapArr([...data.results]);
        setQuestions(questionsData);
      });
  }, []);

  //setting the array of object structure
  function mapArr(arr) {
    return arr.map((q) => {
      return {
        id: nanoid(),
        question: q.question,
        answers: [...q.incorrect_answers, q.correct_answer].sort(),
        correct_answer: q.correct_answer,
        selected_answer: "",
      };
    });
  }

  function handleSetScore() {
    questions.forEach((qn) => {
      if (qn.selected_answer === decode(qn.correct_answer)) {
        setScore((prevScore) => prevScore + 1);
      }
    });
  }

  useEffect(() => {
    handleIsAllAnswered();
  }, [questions]);

  //watch when answer is clicked
  function handleIsAllAnswered() {
    const hasAnswers = questions.filter((qn) => qn.selected_answer !== "");
    if (hasAnswers.length === questions.length) {
      setIsAllAnswered(true);
      return;
    }
    setIsAllAnswered(false);
    return;
  }

  function checkAnswers() {
    //if has blank answer then return
    if (!isAllAnswered) return;
    //set isGameOver = true
    setIsGameOver(true);
    //set score
    handleSetScore();
  }

  function isSameAnswer(answerEvent) {
    const selectedQuestionId =
      answerEvent.target.parentElement.getAttribute("data-question-id");
    const selectedQuestion = questions.find(
      (qn) => qn.id === selectedQuestionId
    );
    const oldAnswer = selectedQuestion.selected_answer;
    const newAnswer = answerEvent.target.textContent;
    if (oldAnswer === newAnswer) return true;
    return false;
  }

  function selectAnswer(event, id) {
    if (isGameOver) return; //will not be able to select answer if game is over

    // if selected answer is the same, then setQuestions won't be invoke and will not cause re-render
    if (isSameAnswer(event)) return;

    setQuestions((prevQuestionArr) => {
      return prevQuestionArr.map((item) => {
        const answer = event.target.textContent;
        return item.id === id ? { ...item, selected_answer: answer } : item;
      });
    });
  }

  function resetGame() {
    props.setIsGameStarted(false);
  }

  function renderButton() {
    if (questions.length === 0) return;

    return (
      <button
        className={`button ${!isAllAnswered && "disabled"}`}
        onClick={!isGameOver ? checkAnswers : resetGame}
      >
        {!isGameOver ? "Check Anwers" : "Restart"}
      </button>
    );
  }

  return (
    <div className={`quiz-container ${isGameOver ? "game_over" : ""}`}>
      {questions.length === 0 && <Loader />}
      <QuestionsList
        questions={questions}
        isGameOver={isGameOver}
        selectAnswer={selectAnswer}
      />

      <div className="quiz__btn-container">
        {isGameOver && (
          <p className="quiz__score">You scored {score}/5 correct answers</p>
        )}
        {renderButton()}
      </div>
    </div>
  );
}
