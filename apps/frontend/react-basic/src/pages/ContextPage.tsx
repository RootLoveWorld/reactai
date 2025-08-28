import React from 'react';
import ContextExample from '../components/ContextExample';

const ContextPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🌐 Context API (上下文)</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>全局状态管理：</strong> Context 提供了一种在组件树中传递数据的方法，避免手动逐层传递 props</li>
          <li><strong>Provider/Consumer 模式：</strong> 使用 Provider 提供数据，Consumer 或 useContext Hook 消费数据</li>
          <li><strong>响应式更新：</strong> 当 Context 值发生变化时，所有消费该 Context 的组件都会重新渲染</li>
          <li><strong>组合式设计：</strong> 可以创建多个 Context 来管理不同类型的全局状态</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>主题和样式配置（如深色/浅色模式）</li>
          <li>用户认证和权限管理</li>
          <li>语言国际化设置</li>
          <li>全局应用配置</li>
          <li>购物车、通知等跨组件共享状态</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 避免 Prop Drilling（属性向下穿透）</li>
          <li>✅ React 官方推荐的状态管理方案</li>
          <li>✅ 无需安装额外依赖</li>
          <li>✅ 与 React 生命周期完美集成</li>
          <li>✅ 支持 TypeScript 类型安全</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ Context 值变化会导致所有消费者重新渲染</li>
          <li>❗ 不适合频繁变化的状态</li>
          <li>❗ 过度使用可能导致组件耦合</li>
          <li>❗ 复杂状态管理建议使用专门的状态管理库</li>
        </ul>
      </div>

      <ContextExample />

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>🛠️ 实现步骤</h4>
        <ol style={{ color: '#6c757d', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>创建 Context：</strong> 使用 <code>React.createContext()</code> 创建上下文对象</li>
          <li><strong>定义 Provider：</strong> 创建 Provider 组件来管理和提供状态</li>
          <li><strong>包装组件树：</strong> 用 Provider 包装需要访问状态的组件</li>
          <li><strong>创建自定义 Hook：</strong> 封装 <code>useContext</code> 提供更好的开发体验</li>
          <li><strong>消费状态：</strong> 在子组件中使用自定义 Hook 获取和更新状态</li>
        </ol>
      </div>

      <div style={{
        background: '#e2f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0066cc', margin: '0 0 15px 0' }}>🎯 最佳实践</h4>
        <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>单一职责：</strong> 每个 Context 只管理相关的状态，避免创建"万能" Context</li>
          <li><strong>性能优化：</strong> 将频繁变化和不常变化的状态分离到不同的 Context</li>
          <li><strong>类型安全：</strong> 使用 TypeScript 定义清晰的 Context 类型接口</li>
          <li><strong>错误边界：</strong> 在自定义 Hook 中检查 Context 是否正确使用</li>
          <li><strong>默认值：</strong> 为 Context 提供合理的默认值</li>
          <li><strong>文档说明：</strong> 为 Context 和相关 Hook 提供清晰的使用文档</li>
        </ul>
      </div>

      <div style={{
        background: '#fff5f5',
        border: '1px solid #fed7d7',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#c53030', margin: '0 0 15px 0' }}>🤔 Context vs 其他方案</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <div>
            <strong style={{ color: '#c53030' }}>Context API:</strong>
            <ul style={{ color: '#822727', marginTop: '5px', paddingLeft: '20px' }}>
              <li>适合简单到中等复杂度的全局状态</li>
              <li>React 内置，无额外依赖</li>
              <li>学习成本低</li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#c53030' }}>Redux/Zustand:</strong>
            <ul style={{ color: '#822727', marginTop: '5px', paddingLeft: '20px' }}>
              <li>适合复杂的状态管理需求</li>
              <li>提供时间旅行、中间件等高级功能</li>
              <li>更好的开发工具支持</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextPage;