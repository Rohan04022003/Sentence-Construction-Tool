import React from "react";
import Button from "../components/Button";
import { IoIosArrowDown } from "react-icons/io";
import { useQuestions } from "../contexts/QuestionContext";
import { Link } from "react-router-dom";

const renderSentenceWithAnswers = (
  template: string,
  answers: (string | null)[] | null
): React.ReactNode[] => {
  const parts = template.split(/_{3,}/g);
  return parts.reduce((acc, part, index) => {
    acc.push(<span key={`text-${index}`}>{part}</span>);
    if (answers && index < answers.length) {
      acc.push(
        <span
          key={`answer-${index}`}
          className="inline-block min-w-[5rem] px-1 font-medium text-center"
        >
          {answers[index] || "_____________"}
        </span>
      );
    }
    return acc;
  }, [] as React.ReactNode[]);
};

const Result = () => {
  const { questions, userAnswers } = useQuestions();

  if (!questions || questions.length === 0) return null;

  const total = questions.length;

  const score = userAnswers.reduce((acc, userAnswer, index) => {
    const correctAnswer = questions[index]?.correctAnswer;
    if (JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = (score / total) * 100;

  let textColor = "text-green-600";
  let bgColor = "bg-green-100";
  let borderGradient = `conic-gradient(#16a34a ${percentage}%, #e5e7eb ${percentage}%)`;

  if (percentage < 55) {
    textColor = "text-red-600";
    bgColor = "bg-red-100";
    borderGradient = `conic-gradient(#dc2626 ${percentage}%, #e5e7eb ${percentage}%)`;
  } else if (percentage < 80) {
    textColor = "text-yellow-600";
    bgColor = "bg-yellow-100";
    borderGradient = `conic-gradient(#facc15 ${percentage}%, #e5e7eb ${percentage}%)`;
  }

  return (
    <div className="flex flex-col justify-center items-center py-28 bg-gray-100">
      <div
        className={`w-36 h-36 rounded-full flex justify-center items-center p-2`}
        style={{
          backgroundImage: borderGradient,
        }}
      >
        <div
          className={`w-full h-full rounded-full flex flex-col justify-center items-center ${bgColor} ${textColor}`}
        >
          <h2 className="text-2xl font-bold">
            {score}/{total}
          </h2>
          <p className="text-sm">Overall Score</p>
        </div>
      </div>

      <p className="text-center pt-14 2xl:px-100 px-2">While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.</p>

      <div className="py-20 flex flex-col justify-center items-center gap-10">
        <Link to={"/"}><Button text="Go To Dashboard" buttonCSS="first" /></Link>
        <IoIosArrowDown size={30} color="gray" />
      </div>

      <div className="xl:w-[50rem] w-[98%] flex flex-col justify-center items-center]">
        {questions.map((question, index) => (
          <div key={index} className="w-full shadow-xl rounded-lg bg-white overflow-hidden mb-5">
            <div className="flex flex-col gap-5 pb-5 p-3">
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-gray-200 rounded-lg text-sm">Prompt</span>
                <span className="text-sm text-gray-500">
                  <span className="text-black">{index + 1}</span>/{total}
                </span>
              </div>

              <div className="correct-answer text-gray-600">
                <div className="">
                  {renderSentenceWithAnswers(question.question, question.correctAnswer)}
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-gray-100">
              <div className="flex items-center gap-3 p-3">
                <h3 className="text-gray-700">Your Response</h3>
                <span
                  className={`answer-status ${JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer)
                    ? "text-green-700 bg-green-50"
                    : "text-red-700 bg-red-50"
                    } rounded-sm px-2 py-1`}
                >
                  {JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer)
                    ? "Correct"
                    : "Incorrect"}
                </span>
              </div>

              <div className="selected-answer p-3">
                <div className="">
                  {userAnswers[index] && userAnswers[index].length > 0 ? (
                    renderSentenceWithAnswers(question.question, userAnswers[index])
                  ) : (
                    <>
                      <p className="text-gray-500">Not Attempted</p>
                      <div className="inline-block min-w-[5rem] px-1 font-medium text-center">
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
