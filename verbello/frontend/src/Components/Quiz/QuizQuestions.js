import React, { useState, useEffect } from "react";
//import { useLocation } from "react-router-dom";

import questions from "../../questions";
import "./QuizQuestions.css";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import { useParams } from "react-router-dom";

const QuizQuestions = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const correctAnswerAudioRef = React.useRef(null);
  const lessonCompletedAudioRef = React.useRef(null);
  const { lessonName } = useParams();

  /** Navneet's useStates */
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    console.log("isAnsweredCorrectly? ", isAnsweredCorrectly);
    if (isAnsweredCorrectly) {
      playSuccessAudio();
    }
  }, [isAnsweredCorrectly]);

  const playSuccessAudio = () => {
    correctAnswerAudioRef.current.play();
  };

  const playLessonCompletedAudio = () => {
    lessonCompletedAudioRef.current.play();
  };

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;
    setIsAnsweredCorrectly(isCorrect);
  };

  const handleNextClick = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
        //setShowCorrectAnswer(true);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        //setShowCorrectAnswer(false);

        // Clear the class styling for the options
        const optionElements = document.querySelectorAll(".option");
        optionElements.forEach((element) => {
          element.classList.remove("selected", "correct", "incorrect");
        });
        setIsAnsweredCorrectly(false);
      } else {
        handleCompleteQuiz();
      }
    }
  };

  const renderOptions = () => {
    return questions[currentQuestion].options.map((option, index) => (
      <div
        key={index}
        className={`option m-2 ${
          selectedOption === index
            ? isAnsweredCorrectly
              ? "correct"
              : "incorrect"
            : "null"
        }`}
        onClick={() => handleOptionClick(index)}
      >
        {option}
      </div>
    ));
  };

  const handleCompleteQuiz = () => {
    console.log("Quiz Completed!");
    setIsQuizCompleted(true);
    playLessonCompletedAudio();
    //make api call to user and update lessons completed info
  };

  return (
    <>
      <Navbar />

      {isQuizCompleted ? (
        <>
          <div className="d-flex align-items-center mx-auto">
            <img
              src="/images/mascot/pingu-speaking.jpeg"
              alt="Mascot congratulating."
              className="mascot-speaking"
            />
            <div className="text-center p-5">
              <h2 className="mb-4">Kudos! You've done Amazing!</h2>
              <button className="btn btn-outline-primary btn-lg">
                Take Next Lesson
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {selectedOption !== null ? (
            isAnsweredCorrectly ? (
              <div className="alert alert-success mx-auto mt-2" role="alert">
                Great job!
              </div>
            ) : (
              <div className="alert alert-danger mx-auto mt-2" role="alert">
                Incorrect answer! Please try again.
              </div>
            )
          ) : null}

          <h4 className="p-3">Quiz: {lessonName}</h4>

          <div className="row">
            <div className="quiz-container card m-5 mx-auto">
              <div className="card-body">
                <div className="question font-weight-bold">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="question-and-options">
                  <div className="question-text">
                    {questions[currentQuestion].question}
                  </div>
                  <div className="options">{renderOptions()}</div>
                </div>
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNextClick}
                    className="btn btn-primary m-2 mt-4"
                    disabled={!isAnsweredCorrectly}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleCompleteQuiz}
                    className="btn btn-success mt-3"
                    disabled={!isAnsweredCorrectly}
                  >
                    Complete Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <audio ref={correctAnswerAudioRef}>
        <source src="./media/success-correct-answer.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio ref={lessonCompletedAudioRef}>
        <source src="./media/success-lesson-completed.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {selectedOption !== null ? (
        isAnsweredCorrectly ? (
          <div className="alert alert-success mx-auto mt-2" role="alert">
            Great job!
          </div>
        ) : (
          <div className="alert alert-danger mx-auto mt-2" role="alert">
            Incorrect answer! Please try again.
          </div>
        )
      ) : null}

      <h4 className="p-3 m-3">Quiz: {lessonName}</h4>

      <div className="row">
        <div className="quiz-container card m-5 mx-auto">
          <div className="card-body">
            <div className="question font-weight-bold">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-and-options">
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>
              <div className="options">{renderOptions()}</div>
            </div>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextClick}
                className="btn btn-primary m-2 mt-4"
                disabled={!isAnsweredCorrectly}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCompleteQuiz}
                className="btn btn-success mt-3"
                disabled={!isAnsweredCorrectly}
              >
                Complete Quiz
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuizQuestions;