import React from "react";
// 类组件：打印最新的 count
class ClassExample extends React.Component {
  state = { count: 0 };
  handleClick = () => {
    setTimeout(() => {
      // this 是可变的，总是获取最新的值
     // this.setState({ count: this.state.count + 1 });
      alert(this.state.count); // 3秒后点击的是几，显示的就是几
    }, 3000);
  };
  render() {
    return <button onClick={this.handleClick}>Show Count (Class)</button>;
  }
}


export default ClassExample; // 导出 ClassExample 组件