import React, { useReducer } from 'react';

// 定义动作类型
type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_VALUE'; payload: number };

// 定义状态类型
interface CounterState {
  count: number;
  history: string[];
}

// 初始状态
const initialState: CounterState = {
  count: 0,
  history: ['初始值: 0']
};

// Reducer 函数 - 这是核心！
// 它接收当前状态和动作，返回新的状态
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, `+1 = ${state.count + 1}`]
      };
    
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, `-1 = ${state.count - 1}`]
      };
    
    case 'RESET':
      return {
        count: 0,
        history: [...state.history, '重置为 0']
      };
    
    case 'SET_VALUE':
      return {
        count: action.payload,
        history: [...state.history, `设置为 ${action.payload}`]
      };
    
    default:
      return state;
  }
}

const SimpleCounter: React.FC = () => {
  // 使用 useReducer Hook
  // state: 当前状态
  // dispatch: 发送动作的函数
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div style={{
      background: 'white',
      border: '2px solid #007acc',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#007acc' }}>
        🔢 简单计数器 (useReducer)
      </h3>

      {/* 显示当前数值 */}
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        {state.count}
      </div>

      {/* 操作按钮 */}
      <div style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="button"
          style={{ backgroundColor: '#dc3545' }}
        >
          ➖ -1
        </button>

        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="button"
          style={{ backgroundColor: '#28a745' }}
        >
          ➕ +1
        </button>

        <button
          onClick={() => dispatch({ type: 'SET_VALUE', payload: 10 })}
          className="button"
          style={{ backgroundColor: '#ffc107', color: '#333' }}
        >
          🎯 设为10
        </button>

        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="button"
          style={{ backgroundColor: '#6c757d' }}
        >
          🔄 重置
        </button>
      </div>

      {/* 操作历史 */}
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        padding: '15px',
        maxHeight: '150px',
        overflowY: 'auto'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>📜 操作历史:</h4>
        <div style={{ fontSize: '14px', color: '#6c757d' }}>
          {state.history.map((item, index) => (
            <div key={index} style={{ marginBottom: '5px' }}>
              {index + 1}. {item}
            </div>
          ))}
        </div>
      </div>

      {/* 说明 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#e7f3ff',
        borderRadius: '4px',
        border: '1px solid #b3d9ff'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>💡 useReducer 要点:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#004499' }}>
          <li><strong>Reducer 函数:</strong> 纯函数，接收 state 和 action，返回新 state</li>
          <li><strong>Dispatch 函数:</strong> 发送 action 来触发状态变更</li>
          <li><strong>Action 对象:</strong> 描述"要做什么"的指令</li>
          <li><strong>State 不可变:</strong> 总是返回新的状态对象</li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleCounter;