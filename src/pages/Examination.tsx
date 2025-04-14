import React, { useState, useEffect } from "react";
import { useQuestions } from "../contexts/QuestionContext";
import Button from "../components/Button";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

const Examination = () => {
  const { questions, questionNumber, setQuestionNumber, userAnswers, setUserAnswers } = useQuestions();
  const navigate = useNavigate();
  const [timerKey, setTimerKey] = useState<number>(Date.now());
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>([]);

  const currentQuestion = questions[questionNumber];
  const parts = currentQuestion?.question?.split(/_{3,}/g) || [];

  useEffect(() => {
    if (parts.length > 1) {
      setSelectedWords(new Array(parts.length - 1).fill(null));
    }
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionNumber] = selectedWords;
    setUserAnswers(updatedAnswers);

    if (questionNumber < questions.length - 1) {
      setQuestionNumber((prev) => prev + 1);
      setTimerKey(Date.now());
    } else {
      navigate("/result");
    }
  };

  const handleOptionClick = (word: string) => {
    const index = selectedWords.findIndex((val) => val === null);
    if (index !== -1) {
      const updated = [...selectedWords];
      updated[index] = word;
      setSelectedWords(updated);
    }
  };

  const handleBlankClick = (index: number) => {
    const updated = [...selectedWords];
    updated[index] = null;
    setSelectedWords(updated);
  };

  const allBlanksFilled = selectedWords.every((val) => val !== null);

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="w-screen h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-[60rem] h-auto rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-5">
          <Timer key={timerKey} initialTime={30} onTimeUp={handleNextQuestion} />
          <Button text="Quit" link="/result" buttonCSS="third" />
        </div>

        <div className="question-progress-bar flex justify-between items-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-full sm:w-[calc(100%/10)] md:w-[calc(100%/10)] lg:w-[calc(100%/10)] h-1 rounded-full ${
                index <= questionNumber ? "bg-yellow-400" : "bg-gray-300"
              }`}
              title={`Question ${index + 1}`}
            ></div>
          ))}
        </div>

        <div className="text-center text-lg pt-8 text-[#7C8181] font-semibold">
          Select the missing words in the correct order
        </div>

        <div className="text-xl px-4 sm:px-12 pt-6 xl:leading-8 text-center font-semibold text-gray-700 flex flex-wrap justify-center gap-2">
          {parts.map((part, i) => (
            <React.Fragment key={i}>
              <span>{part}</span>
              {i < selectedWords.length && (
                <span
                  onClick={() => handleBlankClick(i)}
                  className="min-w-[6rem] sm:min-w-[8rem] px-2 py-1 border-b-2 border-gray-500 cursor-pointer text-center"
                >
                  {selectedWords[i]}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="options-div flex justify-center items-center gap-2 py-8 flex-wrap">
          {currentQuestion.options
            .filter((opt) => !selectedWords.includes(opt))
            .map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="px-3 py-1 rounded-lg border border-[#9c9c9c] cursor-pointer text-[#585858] font-semibold"
              >
                {option}
              </button>
            ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleNextQuestion}
            disabled={!allBlanksFilled}
            className={`p-5 border rounded-lg ${
              allBlanksFilled
                ? "border-[#e4e4e4] cursor-pointer"
                : "border-gray-300 opacity-50 cursor-not-allowed"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                fill="#DFE3E3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Examination;
