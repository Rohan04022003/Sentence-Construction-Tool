import { useState, useEffect } from "react";

interface TimerProps {
  initialTime?: number;
  onTimeUp?: () => void;
}

const Timer = ({ initialTime = 30, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onTimeUp]);

  // Format the time to always show two digits
  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-[1.2rem] font-semibold ${
          timeLeft <= 10 ? "text-red-500" : "text-[#7C8181]"
        }`}
      >
        0:{formattedTime}
      </span>
    </div>
  );
};

export default Timer;
