import React from "react";
import { decode } from "html-entities";
import cx from "classnames";

const QuestionList = ({ questions, isGameOver, selectAnswer }) => {
  // creates the question & answers element
  const questionsListElement = questions.map((qn) => {
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
          onClick={(e) => selectAnswer(e, qn.id)}
        >
          {answer}
        </div>
      );
    });

    return (
      <div className="quiz" key={qn.id}>
        <p className="quiz__question">{question}</p>
        <div className="quiz__answers" data-question-id={qn.id}>
          {answerList}
        </div>
      </div>
    );
  });

  return questionsListElement;
};

export default QuestionList;
