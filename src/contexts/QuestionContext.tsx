import React, { createContext, useContext, useEffect, useState } from "react";
import { Question } from "../types";

type QuestionContextType = {
  questions: Question[];
  loading: boolean;
  error: string | null;
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: (string | null)[][];
  setUserAnswers: React.Dispatch<React.SetStateAction<(string | null)[][]>>;
};

const QuestionContext = createContext<QuestionContextType>({
  questions: [],
  loading: true,
  error: null,
  questionNumber: 0,
  setQuestionNumber: () => {},
  userAnswers: [],
  setUserAnswers: () => {},
});

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[][]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setQuestions(data.questions);
        setUserAnswers(Array(data.questions.length).fill([]));
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch questions");
        setLoading(false);
      });
  }, []);

  return (
    <QuestionContext.Provider
      value={{ questions, loading, error, questionNumber, setQuestionNumber, userAnswers, setUserAnswers }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);
