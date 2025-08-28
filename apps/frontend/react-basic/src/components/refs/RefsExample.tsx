import React from 'react';
import BasicRefExamples from './BasicRefExamples';
import ForwardRefExamples from './ForwardRefExamples';

const RefsExample: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🔗 React Refs 完整指南</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>useRef Hook：</strong> 在函数组件中创建可变的引用对象</li>
          <li><strong>DOM 访问：</strong> 直接访问和操作 DOM 元素</li>
          <li><strong>值持久化：</strong> 在重新渲染之间保持值，且不触发重新渲染</li>
          <li><strong>forwardRef：</strong> 允许组件向上暴露 DOM 节点给父组件</li>
          <li><strong>useImperativeHandle：</strong> 自定义通过 ref 暴露给父组件的实例值</li>
        </ul>
      </div>

      <BasicRefExamples />
      <ForwardRefExamples />

      <div style={{
        background: '#f0f8f0',
        border: '1px solid #c3e6c3',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#2d7a2d', margin: '0 0 15px 0' }}>🔄 Refs 使用模式总结</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #c3e6c3'
          }}>
            <h5 style={{ color: '#2d7a2d', margin: '0 0 10px 0' }}>🎯 useRef 基础用法</h5>
            <ul style={{ color: '#1a5a1a', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>访问 DOM 元素</li>
              <li>存储可变值</li>
              <li>缓存昂贵的计算结果</li>
              <li>存储定时器引用</li>
            </ul>
          </div>

          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #c3e6c3'
          }}>
            <h5 style={{ color: '#2d7a2d', margin: '0 0 10px 0' }}>🔄 forwardRef 场景</h5>
            <ul style={{ color: '#1a5a1a', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>自定义输入组件</li>
              <li>复用组件库</li>
              <li>第三方库集成</li>
              <li>复杂组件封装</li>
            </ul>
          </div>

          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #c3e6c3'
          }}>
            <h5 style={{ color: '#2d7a2d', margin: '0 0 10px 0' }}>⚙️ useImperativeHandle</h5>
            <ul style={{ color: '#1a5a1a', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>自定义暴露的方法</li>
              <li>组件实例控制</li>
              <li>封装复杂逻辑</li>
              <li>API 简化</li>
            </ul>
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
        <h4 style={{ color: '#856404', margin: '0 0 15px 0' }}>💡 Refs 最佳实践</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <h5 style={{ color: '#856404', margin: '0 0 10px 0' }}>✅ 推荐用法：</h5>
            <ul style={{ color: '#856404', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>聚焦、滚动、媒体播放控制</li>
              <li>触发命令式动画</li>
              <li>集成第三方 DOM 库</li>
              <li>存储不影响渲染的值</li>
            </ul>
          </div>
          
          <div>
            <h5 style={{ color: '#856404', margin: '0 0 10px 0' }}>❌ 避免用法：</h5>
            <ul style={{ color: '#856404', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>能用 props 解决的问题</li>
              <li>过度使用导致组件耦合</li>
              <li>在渲染期间读取或写入 ref</li>
              <li>替代状态管理</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        background: '#e8f4fd',
        border: '1px solid #bee5eb',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0c5460', margin: '0 0 15px 0' }}>🎓 学习路径建议</h4>
        <ol style={{ color: '#055160', margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><strong>掌握 useRef 基础：</strong> 理解 ref 的创建、访问和DOM操作</li>
          <li><strong>实践常见场景：</strong> 输入框聚焦、滚动控制、定时器管理</li>
          <li><strong>学习 forwardRef：</strong> 理解组件间 ref 传递的机制</li>
          <li><strong>掌握 useImperativeHandle：</strong> 学会自定义暴露的组件接口</li>
          <li><strong>了解最佳实践：</strong> 知道什么时候用 ref，什么时候用 state</li>
        </ol>
      </div>

      <div style={{
        background: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#2d3748', margin: '0 0 15px 0' }}>🔄 与其他 Hook 的关系</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0'
          }}>
            <h5 style={{ color: '#2d3748', margin: '0 0 10px 0' }}>🆚 useRef vs useState</h5>
            <ul style={{ color: '#4a5568', margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
              <li><strong>useRef:</strong> 不触发重新渲染，存储可变值</li>
              <li><strong>useState:</strong> 触发重新渲染，管理组件状态</li>
            </ul>
          </div>

          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0'
          }}>
            <h5 style={{ color: '#2d3748', margin: '0 0 10px 0' }}>🤝 与 useEffect 配合</h5>
            <ul style={{ color: '#4a5568', margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
              <li>在 effect 中访问最新的 ref 值</li>
              <li>清理定时器、事件监听器等副作用</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefsExample;