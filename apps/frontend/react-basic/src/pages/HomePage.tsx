import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="component-section">
      <h2>🏠 欢迎来到 React 组件通信示例合集</h2>
      
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '28px' }}>
          React Component Communication Examples
        </h3>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
          学习 React 组件间通信的三种核心模式
        </p>
      </div>

      <div className="difference">
        <h3>📚 学习目标</h3>
        <p>通过这个示例合集，你将学会：</p>
        <ul>
          <li><strong>受控组件 (Controlled Components)</strong> - 理解 React 状态如何控制表单输入</li>
          <li><strong>非受控组件 (Uncontrolled Components)</strong> - 学习如何使用 refs 直接操作 DOM</li>
          <li><strong>状态提升 (State Lifting)</strong> - 掌握组件间共享状态的最佳实践</li>
          <li><strong>Context API</strong> - 学习全局状态管理和跨组件数据共享</li>
          <li><strong>useReducer Hook</strong> - 掌握复杂状态逻辑的管理方式</li>
          <li><strong>Refs</strong> - 学习 DOM 引用和命令式操作技巧</li>
        </ul>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          background: 'white',
          border: '2px solid #007acc',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎛️</div>
          <h4 style={{ color: '#007acc', margin: '0 0 10px 0' }}>受控组件</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            React 状态驱动的表单组件，实时响应用户输入，支持验证和格式化
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '2px solid #28a745',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔗</div>
          <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>非受控组件</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            DOM 自管理的表单组件，通过 refs 按需获取值，性能更优
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '2px solid #ffc107',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🚀</div>
          <h4 style={{ color: '#f57c00', margin: '0 0 10px 0' }}>状态提升</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            将共享状态提升到父组件，实现兄弟组件间的数据通信
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '2px solid #6f42c1',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌐</div>
          <h4 style={{ color: '#6f42c1', margin: '0 0 10px 0' }}>Context API</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            全局状态管理方案，避免 prop drilling，实现跨组件数据共享
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '2px solid #dc3545',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎛️</div>
          <h4 style={{ color: '#dc3545', margin: '0 0 10px 0' }}>useReducer</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            复杂状态管理 Hook，使用 Redux 模式处理复杂的状态逻辑
          </p>
        </div>

        <div style={{
          background: 'white',
          border: '2px solid #17a2b8',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔗</div>
          <h4 style={{ color: '#17a2b8', margin: '0 0 10px 0' }}>Refs</h4>
          <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
            DOM 引用和命令式操作，实现聚焦、滚动等直接 DOM 控制
          </p>
        </div>
      </div>

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '30px'
      }}>
        <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>🎯 使用指南</h4>
        <ol style={{ color: '#6c757d', paddingLeft: '20px' }}>
          <li>点击顶部导航菜单切换不同的示例</li>
          <li>每个示例都包含详细的代码解释和交互演示</li>
          <li>建议按顺序学习：受控组件 → 非受控组件 → 状态提升</li>
          <li>尝试修改代码，观察不同实现方式的差异</li>
        </ol>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>🚀 开始探索</h4>
        <p style={{ margin: 0, opacity: 0.9 }}>
          选择上方菜单中的任意示例开始学习！
        </p>
      </div>
    </div>
  );
};

export default HomePage;