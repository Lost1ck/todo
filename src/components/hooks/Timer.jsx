import React, { useState, useEffect, useCallback, useRef } from 'react';

const TodoItem = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerId = useRef(null);

  const updateTimer = useCallback((startTime) => {
    const frameFunc = () => {
      setElapsedTime(Date.now() - startTime);
      timerId.current = requestAnimationFrame(frameFunc);
    };
    return frameFunc;
  }, []);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      timerId.current = requestAnimationFrame(updateTimer(startTime));
    }

    return () => {
      if (timerId.current) {
        cancelAnimationFrame(timerId.current);
      }
    };
  }, [isRunning, elapsedTime, updateTimer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (timerId.current) {
      cancelAnimationFrame(timerId.current);
    }
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  return (
    <span className="description">
      <button onClick={startTimer} disabled={isRunning} className="icon icon-play"></button>
      <button onClick={stopTimer} disabled={!isRunning} className="icon icon-pause"></button>
      <span>{formatTime(elapsedTime)}</span>
    </span>
  );
};

export default TodoItem;
