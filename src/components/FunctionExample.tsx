import { useState } from "react";
// 函数组件：打印触发事件时那次渲染的 count
function FunctionExample() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setTimeout(() => {
      // count 来自于那次渲染的闭包，是常量
     // setCount(count + 1);
      alert(count); // 3秒后显示的永远是点击那一刻的 count 值
    }, 3000);
  };
  return <button onClick={handleClick}>Show Count (Function)</button>;
}

export default FunctionExample;