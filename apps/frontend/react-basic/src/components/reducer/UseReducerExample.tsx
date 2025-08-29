import React from 'react';
import SimpleCounter from './SimpleCounter';
import TodoList from './TodoList';
import UseStateVsUseReducer from './UseStateVsUseReducer';

const UseReducerExample: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🎛️ useReducer Hook 详解</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>Reducer 函数：</strong> 一个纯函数，接收当前状态和动作，返回新状态</li>
          <li><strong>Action 对象：</strong> 描述"要做什么"的指令，通常包含 type 字段</li>
          <li><strong>Dispatch 函数：</strong> 发送 action 到 reducer 来触发状态更新</li>
          <li><strong>不可变更新：</strong> 总是返回新的状态对象，而不是修改现有状态</li>
        </ul>
      </div>

      <SimpleCounter />
      <TodoList />
      <UseStateVsUseReducer />

      <div style={{
        background: '#f0f8f0',
        border: '1px solid #c3e6c3',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#2d7a2d', margin: '0 0 15px 0' }}>🔄 useReducer 工作流程</h4>
        <div style={{ textAlign: 'center', color: '#1a5a1a', lineHeight: '2' }}>
          <div style={{ marginBottom: '10px' }}>
            👆 <strong>用户操作</strong> (点击按钮)
          </div>
          <div style={{ margin: '10px 0', fontSize: '20px' }}>⬇️</div>
          <div style={{ marginBottom: '10px' }}>
            📤 <strong>dispatch(action)</strong> (发送动作)
          </div>
          <div style={{ margin: '10px 0', fontSize: '20px' }}>⬇️</div>
          <div style={{ marginBottom: '10px' }}>
            ⚙️ <strong>reducer(state, action)</strong> (处理动作)
          </div>
          <div style={{ margin: '10px 0', fontSize: '20px' }}>⬇️</div>
          <div style={{ marginBottom: '10px' }}>
            🔄 <strong>返回新状态</strong> (state更新)
          </div>
          <div style={{ margin: '10px 0', fontSize: '20px' }}>⬇️</div>
          <div>
            🖼️ <strong>组件重新渲染</strong> (UI更新)
          </div>
        </div>
      </div>

      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#856404', margin: '0 0 15px 0' }}>💡 useReducer 最佳实践</h4>
        <ul style={{ color: '#856404', margin: 0, paddingLeft: '20px' }}>
          <li><strong>保持 Reducer 纯净：</strong> 不要在 reducer 中产生副作用（API 调用、计时器等）</li>
          <li><strong>使用 TypeScript：</strong> 定义清晰的 Action 和 State 类型</li>
          <li><strong>动作命名：</strong> 使用大写常量命名动作类型，清晰描述意图</li>
          <li><strong>状态不可变：</strong> 总是返回新对象，使用展开运算符 <code>...</code></li>
          <li><strong>组合 Reducer：</strong> 对于复杂状态，可以将多个 reducer 组合使用</li>
        </ul>
      </div>

      <div style={{
        background: '#e8f4fd',
        border: '1px solid #bee5eb',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0c5460', margin: '0 0 15px 0' }}>📚 学习路径建议</h4>
        <ol style={{ color: '#055160', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>理解基本概念：</strong> 先掌握 state、action、reducer 的概念</li>
          <li><strong>从简单开始：</strong> 用简单的计数器理解 useReducer 工作原理</li>
          <li><strong>实践复杂场景：</strong> 尝试待办事项列表等有多种操作的场景</li>
          <li><strong>对比 useState：</strong> 理解什么时候用 useState，什么时候用 useReducer</li>
          <li><strong>学习进阶：</strong> 结合 Context API 实现全局状态管理</li>
        </ol>
      </div>
    </div>
  );
};

export default UseReducerExample;