import { useState, useEffect, useCallback } from 'react';

function useTimer(initialTime = 0) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);
  
  // ✅ 提供完整控制接口
  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => setTime(initialTime), [initialTime]);
  
  return { time, isRunning, start, pause, reset };
}

export default useTimer;