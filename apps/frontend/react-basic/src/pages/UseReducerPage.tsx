import React from 'react';
import { UseReducerExample } from '../components';

const UseReducerPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🎛️ useReducer Hook</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>状态管理升级版：</strong> useReducer 是 useState 的替代方案，适用于更复杂的状态逻辑</li>
          <li><strong>Redux 模式：</strong> 使用类似 Redux 的模式：dispatch(action) → reducer → newState</li>
          <li><strong>集中式逻辑：</strong> 将所有状态更新逻辑集中在 reducer 函数中管理</li>
          <li><strong>可预测性：</strong> 通过 action 类型明确描述状态变化，代码更易理解和调试</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>状态对象包含多个子值且它们相互关联</li>
          <li>有多种方式更新状态（多个 action 类型）</li>
          <li>状态更新逻辑比较复杂</li>
          <li>需要对状态更新进行集中管理</li>
          <li>组件的状态更新逻辑在多个地方重复使用</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 状态更新逻辑集中管理，易于维护</li>
          <li>✅ 代码更加可预测和可调试</li>
          <li>✅ 支持复杂的状态更新逻辑</li>
          <li>✅ reducer 函数易于测试</li>
          <li>✅ 与 Redux DevTools 兼容</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 学习成本比 useState 高</li>
          <li>❗ 简单状态使用会显得过度设计</li>
          <li>❗ 需要更多的样板代码</li>
          <li>❗ reducer 函数必须是纯函数</li>
        </ul>
      </div>

      <UseReducerExample />

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>🛠️ 基本语法</h4>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          <div>const [state, dispatch] = useReducer(reducer, initialState);</div>
          <br />
          <div>// reducer 函数</div>
          <div>function reducer(state, action) {`{`}</div>
          <div>&nbsp;&nbsp;switch (action.type) {`{`}</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;case 'ACTION_TYPE':</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return {`{`}...state, someField: newValue{`}`};</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;default:</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return state;</div>
          <div>&nbsp;&nbsp;{`}`}</div>
          <div>{`}`}</div>
          <br />
          <div>// 触发状态更新</div>
          <div>dispatch({`{`}type: 'ACTION_TYPE', payload: data{`}`});</div>
        </div>

        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>📝 关键参数说明：</h5>
        <ul style={{ color: '#6c757d', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>reducer:</strong> 纯函数，接收 (state, action) 参数，返回新状态</li>
          <li><strong>initialState:</strong> 初始状态值</li>
          <li><strong>state:</strong> 当前状态值</li>
          <li><strong>dispatch:</strong> 发送 action 的函数</li>
          <li><strong>action:</strong> 描述状态如何变化的对象，通常包含 type 和 payload</li>
        </ul>
      </div>

      <div style={{
        background: '#e2f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0066cc', margin: '0 0 15px 0' }}>🎯 设计模式</h4>
        
        <h5 style={{ color: '#0066cc', margin: '15px 0 10px 0' }}>1. Action 设计模式</h5>
        <div style={{
          background: '#f8f9fa',
          padding: '10px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px',
          marginBottom: '10px'
        }}>
          {`// 简单 action
{ type: 'INCREMENT' }

// 带数据的 action
{ type: 'SET_VALUE', payload: 42 }

// 复杂 action
{ type: 'UPDATE_USER', payload: { id: 1, name: 'John' } }`}
        </div>

        <h5 style={{ color: '#0066cc', margin: '15px 0 10px 0' }}>2. State 设计模式</h5>
        <div style={{
          background: '#f8f9fa',
          padding: '10px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px',
          marginBottom: '10px'
        }}>
          {`// 简单状态
const state = 0;

// 对象状态
const state = {
  count: 0,
  loading: false,
  error: null
};`}
        </div>

        <h5 style={{ color: '#0066cc', margin: '15px 0 10px 0' }}>3. Reducer 设计模式</h5>
        <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
          <li>使用 switch 语句处理不同的 action 类型</li>
          <li>总是返回新的状态对象（不可变更新）</li>
          <li>为未知的 action 类型返回当前状态</li>
          <li>保持 reducer 函数的纯净性（无副作用）</li>
        </ul>
      </div>

      <div style={{
        background: '#fff5f5',
        border: '1px solid #fed7d7',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#c53030', margin: '0 0 15px 0' }}>🤔 useState vs useReducer 选择指南</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
          <div>
            <h5 style={{ color: '#c53030' }}>选择 useState 当：</h5>
            <ul style={{ color: '#822727', marginTop: '5px', paddingLeft: '20px', fontSize: '14px' }}>
              <li>状态是简单的原始值</li>
              <li>状态更新逻辑简单</li>
              <li>组件较小且逻辑不复杂</li>
              <li>不需要复杂的状态依赖关系</li>
            </ul>
          </div>
          <div>
            <h5 style={{ color: '#c53030' }}>选择 useReducer 当：</h5>
            <ul style={{ color: '#822727', marginTop: '5px', paddingLeft: '20px', fontSize: '14px' }}>
              <li>状态对象结构复杂</li>
              <li>有多种状态更新方式</li>
              <li>状态更新逻辑复杂</li>
              <li>需要基于前一个状态计算新状态</li>
              <li>状态更新逻辑可能被重用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseReducerPage;