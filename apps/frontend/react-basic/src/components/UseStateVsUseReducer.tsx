import React, { useState, useReducer } from 'react';

// useState 版本的计数器
const UseStateCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<string[]>(['初始值: 0']);

  const increment = () => {
    setCount(prev => prev + 1);
    setHistory(prev => [...prev, `+1 = ${count + 1}`]);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
    setHistory(prev => [...prev, `-1 = ${count - 1}`]);
  };

  const reset = () => {
    setCount(0);
    setHistory(prev => [...prev, '重置为 0']);
  };

  return (
    <div style={{
      background: 'white',
      border: '2px solid #ffc107',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#f57c00' }}>
        🔢 useState 版本
      </h4>

      <div style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '15px',
        background: '#fff8dc',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        {count}
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '15px' }}>
        <button onClick={decrement} className="button" style={{ backgroundColor: '#dc3545', fontSize: '12px', padding: '6px 12px' }}>-1</button>
        <button onClick={increment} className="button" style={{ backgroundColor: '#28a745', fontSize: '12px', padding: '6px 12px' }}>+1</button>
        <button onClick={reset} className="button" style={{ backgroundColor: '#6c757d', fontSize: '12px', padding: '6px 12px' }}>重置</button>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '4px',
        maxHeight: '100px',
        overflowY: 'auto'
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {history.slice(-3).map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

// useReducer 版本的计数器（简化版）
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

interface State {
  count: number;
  history: string[];
}

const reducer = (state: State, action: Action): State => {
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
    default:
      return state;
  }
};

const UseReducerCounter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    history: ['初始值: 0']
  });

  return (
    <div style={{
      background: 'white',
      border: '2px solid #007acc',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#007acc' }}>
        🎛️ useReducer 版本
      </h4>

      <div style={{
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '15px',
        background: '#e7f3ff',
        borderRadius: '4px',
        marginBottom: '15px'
      }}>
        {state.count}
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '15px' }}>
        <button onClick={() => dispatch({ type: 'DECREMENT' })} className="button" style={{ backgroundColor: '#dc3545', fontSize: '12px', padding: '6px 12px' }}>-1</button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })} className="button" style={{ backgroundColor: '#28a745', fontSize: '12px', padding: '6px 12px' }}>+1</button>
        <button onClick={() => dispatch({ type: 'RESET' })} className="button" style={{ backgroundColor: '#6c757d', fontSize: '12px', padding: '6px 12px' }}>重置</button>
      </div>

      <div style={{
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '4px',
        maxHeight: '100px',
        overflowY: 'auto'
      }}>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {state.history.slice(-3).map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

const UseStateVsUseReducer: React.FC = () => {
  return (
    <div style={{
      background: 'white',
      border: '2px solid #6f42c1',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#6f42c1' }}>
        ⚖️ useState vs useReducer 对比
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <UseStateCounter />
        <UseReducerCounter />
      </div>

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>🤔 什么时候用哪个？</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <h5 style={{ color: '#f57c00', margin: '0 0 10px 0' }}>💛 使用 useState 当:</h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
              <li>状态简单（字符串、数字、布尔值）</li>
              <li>状态变更逻辑简单</li>
              <li>组件较小，逻辑不复杂</li>
              <li>不需要复杂的状态更新</li>
            </ul>
          </div>

          <div>
            <h5 style={{ color: '#007acc', margin: '0 0 10px 0' }}>💙 使用 useReducer 当:</h5>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
              <li>状态对象复杂（多个相关字段）</li>
              <li>有多种状态更新方式</li>
              <li>状态变更逻辑复杂</li>
              <li>需要集中管理状态逻辑</li>
            </ul>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#e2f3ff',
          borderRadius: '4px',
          border: '1px solid #b3d9ff'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>💡 核心区别:</h5>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#004499' }}>
            <li><strong>useState:</strong> 直接设置新状态值 → <code>setState(newValue)</code></li>
            <li><strong>useReducer:</strong> 发送动作描述 → <code>dispatch({`{type: 'ACTION'}`})</code></li>
            <li><strong>useReducer 优势:</strong> 状态更新逻辑集中，易于测试和维护</li>
            <li><strong>useState 优势:</strong> 简单直接，适合简单状态</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseStateVsUseReducer;