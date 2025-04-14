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
  setQuestionNumber: () => { },
  userAnswers: [],
  setUserAnswers: () => { },
  fetchData: () => { },
});

export const QuestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null); // Reset error before starting the fetch
    setQuestionNumber(0);

    fetch(`${import.meta.env.VITE_API_URL}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log(data); // Log the full API response to inspect its structure
        if (data && data.data && Array.isArray(data.data.questions)) {
          setQuestions(data.data.questions);  // Adjust based on actual structure
          setUserAnswers(Array(data.data.questions.length).fill([]));
        } else {
          setError("Invalid data format.");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch data.");
      })
      .finally(() => {
        setLoading(false);
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
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">Loading...</div> // Display loading while fetching data
      ) : error ? (
        <div className="w-screen h-screen flex justify-center items-center">{error}</div> // Show error message if fetching fails
      ) : (
        children
      )}
    </QuestionContext.Provider>
  );
};

export const useQuestions = () => useContext(QuestionContext);
