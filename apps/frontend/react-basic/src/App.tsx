import React from 'react'
import ControlledComponent from './components/ControlledComponent'
import UncontrolledComponent from './components/UncontrolledComponent'

function App() {
  return (
    <div className="app">
      <h1 className="title">React 受控组件 vs 非受控组件示例</h1>
      
      <div className="difference">
        <h3>🤔 两者的主要区别：</h3>
        <ul>
          <li><strong>受控组件 (Controlled)：</strong> 表单数据由 React 状态管理，每次输入都会触发状态更新和重新渲染</li>
          <li><strong>非受控组件 (Uncontrolled)：</strong> 表单数据由 DOM 自身管理，React 通过 refs 在需要时获取值</li>
        </ul>
        
        <h4>使用场景推荐：</h4>
        <ul>
          <li><strong>受控组件：</strong> 需要实时验证、格式化输入、条件渲染等交互复杂的表单</li>
          <li><strong>非受控组件：</strong> 简单表单、性能要求高、与第三方 DOM 库集成等场景</li>
        </ul>
      </div>

      <ControlledComponent />
      <UncontrolledComponent />
    </div>
  )
}

export default App