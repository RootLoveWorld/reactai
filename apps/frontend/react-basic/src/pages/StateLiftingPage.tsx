import React from 'react';
import StateLiftingExample from '../components/StateLiftingExample';

const StateLiftingPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🚀 状态提升 (State Lifting)</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>状态上移：</strong> 将多个组件需要的共享状态移动到它们的最近公共父组件</li>
          <li><strong>单向数据流：</strong> 数据从父组件流向子组件（通过 props）</li>
          <li><strong>事件冒泡：</strong> 子组件通过回调函数将事件传递给父组件</li>
          <li><strong>集中管理：</strong> 在一个地方管理相关状态，避免状态分散</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>兄弟组件之间需要共享数据</li>
          <li>多个组件需要响应同一个状态变化</li>
          <li>购物车、用户信息等全局状态管理</li>
          <li>表单数据需要在多个步骤间传递</li>
          <li>实时同步的用户界面（如聊天应用）</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 数据流清晰，易于理解和调试</li>
          <li>✅ 状态集中管理，避免数据不一致</li>
          <li>✅ 符合 React 的设计理念</li>
          <li>✅ 便于测试和维护</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 可能导致父组件变得复杂</li>
          <li>❗ 深层嵌套时需要层层传递 props</li>
          <li>❗ 需要仔细设计组件结构</li>
        </ul>
      </div>

      <StateLiftingExample />

      <div style={{
        background: '#fff5f5',
        border: '1px solid #fed7d7',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#c53030', margin: '0 0 15px 0' }}>💡 实现原则</h4>
        <ul style={{ color: '#822727', margin: 0, paddingLeft: '20px' }}>
          <li><strong>找到共同祖先：</strong> 确定需要共享状态的组件的最近公共父组件</li>
          <li><strong>状态定义：</strong> 在父组件中使用 <code>useState</code> 定义共享状态</li>
          <li><strong>向下传递：</strong> 通过 props 将状态和修改函数传递给子组件</li>
          <li><strong>向上通信：</strong> 子组件通过调用父组件传递的回调函数来修改状态</li>
        </ul>
      </div>

      <div style={{
        background: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#2d3748', margin: '0 0 15px 0' }}>🔄 数据流示意</h4>
        <div style={{ textAlign: 'center', color: '#4a5568' }}>
          <div style={{ marginBottom: '10px' }}>
            📦 <strong>父组件</strong> (管理状态)
          </div>
          <div style={{ margin: '10px 0', fontSize: '20px' }}>⬇️ props ⬇️</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            <div>👶 <strong>子组件A</strong></div>
            <div>👶 <strong>子组件B</strong></div>
          </div>
          <div style={{ margin: '10px 0', fontSize: '20px' }}>⬆️ callbacks ⬆️</div>
          <div>🔄 <strong>状态更新</strong></div>
        </div>
      </div>

      <div style={{
        background: '#e6fffa',
        border: '1px solid #81e6d9',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#234e52', margin: '0 0 15px 0' }}>🎯 最佳实践</h4>
        <ul style={{ color: '#2c5f5f', margin: 0, paddingLeft: '20px' }}>
          <li>只在必要时进行状态提升，避免过度设计</li>
          <li>考虑使用 Context API 处理深层嵌套的 prop 传递</li>
          <li>对于复杂的全局状态，考虑使用状态管理库（如 Redux、Zustand）</li>
          <li>保持回调函数的命名清晰和一致</li>
        </ul>
      </div>
    </div>
  );
};

export default StateLiftingPage;