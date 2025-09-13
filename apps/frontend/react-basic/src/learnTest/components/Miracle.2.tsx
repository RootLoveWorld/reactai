import React, { useEffect, useState } from "react";
import useWindowSize from "./../../hooks/useWindowSize";
import useTimer from "../../hooks/useTimer";
import useMousePosition from "../../hooks/useMousePosition";

function Test2() {
  const [count, setCount] = useState(0);
  const { width, height } = useWindowSize();
  const { time, isRunning, start, pause, reset } = useTimer(0);
  const { x, y } = useMousePosition();

  const handleClick = () => {
    setCount(count + 1);
    setTimeout(() => {
      alert(count);
    }, 3000);
  };

  useEffect(() => {
    console.log("Test2 组件已挂载");
    start();
  }, []);

  return (
    <div>
      <div>窗口尺寸: {width} x {height}</div>
      <div>鼠标位置: {x} x {y}</div>
      <div> { isRunning ? '(运行中)':'(已停止)' } 计时器: {time}</div>
      <button onClick={start}>开始</button>
      <button onClick={pause}>暂停</button>
      <button onClick={reset}>重置</button>
      <br/>
      <button onClick={handleClick}>2点击测试{count}</button>
    </div>
  );
}

export default Test2;
