import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function FocusMode({ isMobile }) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Switch between focus and break
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60); // 25 min focus or 5 min break
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  return (
    <div className={`${isMobile ? "p-4" : "p-8"} max-w-2xl mx-auto`}>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">Focus Mode</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="text-6xl font-mono font-bold mb-6">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xl mb-6">
            {isBreak ? "Break Time" : "Focus Time"}
          </div>
          <div className="space-x-4">
            <button
              onClick={toggleTimer}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Task</h2>
          <p className="text-gray-600">
            Focus on your most important task for this session
          </p>
        </div>
      </div>
    </div>
  );
}

FocusMode.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default FocusMode;
