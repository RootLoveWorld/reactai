import React, { useEffect, useState } from "react";

function Test2() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setTimeout(() => {
      alert(count);
    }, 3000);
  };

  useEffect(() => {
    console.log("Test2 组件已挂载");
  }, []);

  return (
    <div>
{/*       <div>{count}</div> */}
      <button onClick={handleClick}>2点击测试{count}</button>
    </div>
  );
}

export default Test2;
