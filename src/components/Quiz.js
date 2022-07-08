import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import cx from "classnames";

export default function Quiz(props) {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  //call api
  useEffect(() => {
    const {trivia_category, trivia_difficulty, trivia_amount} = props.formData;
    const categoryParam = trivia_category === "any" ? '' : `&category=${trivia_category}`;
    const difficultyParam = trivia_difficulty === "any" ? '' : `&difficulty=${trivia_difficulty}`;
    
    const endpoint =
      `https://opentdb.com/api.php?amount=${trivia_amount}${categoryParam}${difficultyParam}&type=multiple`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const qArr = mapQuestions([...data.results]);
        setQuestionsArr(qArr);
      });
  }, []);

  //setting the array of object structure
  function mapQuestions(questions) {
    return questions.map((q) => {
      return {
        id: nanoid(),
        question: q.question,
        answers: [...q.incorrect_answers, q.correct_answer].sort(),
        correct_answer: q.correct_answer,
        selected_answer: "",
      };
    });
  }

  function handleSelectAnswer(e, id) {
    //if quiz is checked/submitted then should not be able to click answers
    if (isGameOver) return;
    console.log("handleSelectAnswer ");
    setQuestionsArr((prevQuestionArr) => {
      return prevQuestionArr.map((item) => {
        const answer = e.target.textContent;
        return item.id === id ? { ...item, selected_answer: answer } : item;
      });
    });
  }
  console.log("score: ", score);
  function handleSetScore() {
    questionsArr.forEach((qn) => {
      if (qn.selected_answer === decode(qn.correct_answer)) {
        setScore((prevScore) => prevScore + 1);
      }
    });
  }

  useEffect(() => {
    console.log("runs every update");
    handleIsAllAnswered();
  }, [questionsArr]);

  //watch when answer is clicked
  function handleIsAllAnswered() {
    const hasAnswers = questionsArr.filter((qn) => qn.selected_answer !== "");
    if (hasAnswers.length === questionsArr.length) {
      console.log("run when hasAnswerLength === qnArrLengths");
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

  function resetGame() {
    props.handleGameStart(false);
  }

  function renderButton() {
    if (questionsArr.length === 0) return;

    return (
      <button
        className={`button ${!isAllAnswered && "disabled"}`}
        onClick={!isGameOver ? checkAnswers : resetGame}
      >
        {!isGameOver ? "Check Anwers" : "Restart"}
      </button>
    );
  }

  // creates the question & answers element
  const elements = questionsArr.map((qn) => {
    const question = decode(qn.question);
    const possibleAnswers = qn.answers;

    //answers element
    const answerList = possibleAnswers.map((answer, i) => {
      answer = decode(answer);
      const answerClassNames = cx("quiz__answer", {
        selected: answer === qn.selected_answer,
        correct: isGameOver && answer === decode(qn.correct_answer),
        wrong: isGameOver && answer !== decode(qn.correct_answer),
      });

      return (
        <div
          className={answerClassNames}
          key={i}
          onClick={(e) => handleSelectAnswer(e, qn.id)}
        >
          {answer}
        </div>
      );
    });

    //return question and answers
    return (
      <div className="quiz" key={qn.id}>
        <p className="quiz__question">{question}</p>
        <div className="quiz__answers">{answerList}</div>
      </div>
    );
  });

  return (
    <div className={`quiz-container ${isGameOver ? "game_over" : ""}`}>
      {elements}
      <div className="quiz__btn-container">
        {isGameOver && (
          <p className="quiz__score">You scored {score}/5 correct answers</p>
        )}
        {renderButton()}
      </div>
    </div>
  );
}
