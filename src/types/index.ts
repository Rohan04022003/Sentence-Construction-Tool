
export interface buttonProps {
  text: string;
  link: string;
  buttonCSS: string;
}

export type ButtonStyleType = {
  first: string;
  second: string;
  third: string;
};

export type ScoreCircleProps = {
  score: number;
  total: number;
};


export type Question = {
  questionId: string;
  question: string;
  questionType: string;
  answerType: string;
  options: string[];
  correctAnswer: string[];
};

