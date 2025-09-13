import React, { useEffect, useState } from "react";


class Test1 extends React.Component {
  state = {
    count: 0,
  };

  handleClick = () => {
    // 每次点击增加count
    this.setState({ count: this.state.count + 1 });

    setTimeout(() => {
      alert(this.state.count);
    }, 3000);
  };

  componentDidMount() {
    console.log("Test1 组件已挂载");
  }

  render(): React.ReactNode {
    return (
      <div>
{/*         <div>{this.state.count}</div> */}
        <button onClick={this.handleClick}>1点击测试{this.state.count}</button>
      </div>
    );
  }
}

export default Test1;
