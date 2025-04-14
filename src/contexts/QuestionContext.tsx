import React, { createContext, useContext, useEffect, useState } from "react";
import { Question } from "../types";

type QuestionContextType = {
  questions: Question[];
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: (string | null)[][];
  setUserAnswers: React.Dispatch<React.SetStateAction<(string | null)[][]>>;
  fetchData: () => void;
};

const QuestionContext = createContext<QuestionContextType>({
  questions: [],
  questionNumber: 0,
  setQuestionNumber: () => {},
  userAnswers: [],
  setUserAnswers: () => {},
  fetchData: () => {},
});

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[][]>([]);

  const fetchData = () => {
    setQuestionNumber(0);
    fetch(`${import.meta.env.VITE_API_URL}/data`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setQuestions(data.questions);
        setUserAnswers(Array(data.questions.length).fill([]));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        questionNumber,
        setQuestionNumber,
        userAnswers,
        setUserAnswers,
        fetchData,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);
