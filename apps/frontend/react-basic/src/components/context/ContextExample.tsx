import React from 'react';
import { AppContextProvider } from '../../contexts/AppContext';
import SettingsPanel from './SettingsPanel';
import ThemeDisplay from './ThemeDisplay';
import UserProfile from './UserProfile';

const ContextExample: React.FC = () => {
  return (
    <AppContextProvider>
      <div>
        <div className="difference">
          <h3>🌐 Context API 全局状态管理示例</h3>
          <p><strong>核心概念：</strong></p>
          <ul>
            <li><strong>全局状态：</strong> Context 提供了一种在组件树中共享数据的方式，无需逐层传递 props</li>
            <li><strong>Provider 模式：</strong> 通过 Provider 组件向下传递状态，所有子组件都可以访问</li>
            <li><strong>消费者模式：</strong> 通过 useContext Hook 或 Consumer 组件消费 Context 中的数据</li>
            <li><strong>避免 Prop Drilling：</strong> 解决深层嵌套组件间传递数据的问题</li>
          </ul>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <SettingsPanel />
          <ThemeDisplay />
        </div>

        <UserProfile />

        <div style={{
          background: '#e8f4fd',
          border: '1px solid #bee5eb',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#0c5460', margin: '0 0 15px 0' }}>🔍 Context API 状态流</h4>
          <div style={{ textAlign: 'center', color: '#055160', lineHeight: '2' }}>
            <div style={{ marginBottom: '10px' }}>
              📦 <strong>AppContextProvider</strong> (提供全局状态)
            </div>
            <div style={{ margin: '10px 0', fontSize: '20px' }}>⬇️ Context Value ⬇️</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                ⚙️ <strong>SettingsPanel</strong>
              </div>
              <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                🎭 <strong>ThemeDisplay</strong>
              </div>
              <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                👤 <strong>UserProfile</strong>
              </div>
            </div>
            <div style={{ margin: '10px 0', fontSize: '20px' }}>⬆️ useAppContext Hook ⬆️</div>
            <div>🔄 <strong>状态更新和消费</strong></div>
          </div>
        </div>

        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#856404', margin: '0 0 15px 0' }}>💡 实现要点</h4>
          <ul style={{ color: '#856404', margin: 0, paddingLeft: '20px' }}>
            <li><strong>创建 Context:</strong> 使用 <code>createContext</code> 创建 Context 对象</li>
            <li><strong>Provider 包装:</strong> 用 Provider 组件包装需要访问状态的组件树</li>
            <li><strong>自定义 Hook:</strong> 创建 <code>useAppContext</code> Hook 简化状态消费</li>
            <li><strong>类型安全:</strong> 使用 TypeScript 定义 Context 的类型接口</li>
            <li><strong>错误处理:</strong> 在 Hook 中检查 Context 是否在 Provider 内使用</li>
          </ul>
        </div>

        <div style={{
          background: '#d1ecf1',
          border: '1px solid #bee5eb',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#0c5460', margin: '0 0 15px 0' }}>📋 使用场景</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <strong style={{ color: '#0c5460' }}>✅ 适合使用:</strong>
              <ul style={{ color: '#055160', marginTop: '5px', paddingLeft: '20px' }}>
                <li>主题切换</li>
                <li>用户认证状态</li>
                <li>语言国际化</li>
                <li>全局配置信息</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: '#721c24' }}>❌ 避免使用:</strong>
              <ul style={{ color: '#721c24', marginTop: '5px', paddingLeft: '20px' }}>
                <li>频繁变化的状态</li>
                <li>局部组件状态</li>
                <li>复杂业务逻辑状态</li>
                <li>性能敏感的场景</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default ContextExample;