import React from 'react';
import UncontrolledComponent from '../components/UncontrolledComponent';

const UncontrolledPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🔗 非受控组件 (Uncontrolled Components)</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>DOM 主导：</strong> 表单元素的值由 DOM 自身管理，而不是 React 状态</li>
          <li><strong>按需访问：</strong> 通过 refs 在需要时（如表单提交）获取值</li>
          <li><strong>更接近传统：</strong> 类似于传统 HTML 表单的工作方式</li>
          <li><strong>性能优化：</strong> 减少不必要的重新渲染</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>简单的表单提交（不需要实时验证）</li>
          <li>文件上传组件</li>
          <li>性能敏感的大型表单</li>
          <li>与第三方 DOM 库集成</li>
          <li>快速原型开发</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 性能更好（减少重新渲染）</li>
          <li>✅ 代码更简洁</li>
          <li>✅ 更容易与第三方库集成</li>
          <li>✅ 更接近原生 HTML 表单行为</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 无法实时验证输入</li>
          <li>❗ 难以实现复杂的表单交互</li>
          <li>❗ 状态不易在组件间共享</li>
          <li>❗ 调试相对困难</li>
        </ul>
      </div>

      <UncontrolledComponent />

      <div style={{
        background: '#f0f8f0',
        border: '1px solid #c3e6c3',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#2d7a2d', margin: '0 0 15px 0' }}>💡 实现要点</h4>
        <ul style={{ color: '#1a5a1a', margin: 0, paddingLeft: '20px' }}>
          <li>使用 <code>useRef</code> Hook 创建引用</li>
          <li>使用 <code>defaultValue</code> 而不是 <code>value</code> 设置初始值</li>
          <li>通过 <code>ref.current.value</code> 获取当前值</li>
          <li>在需要时（如提交、点击按钮）才访问 DOM 值</li>
          <li>可以直接操作 DOM 元素（如清空表单）</li>
        </ul>
      </div>

      <div style={{
        background: '#fff8dc',
        border: '1px solid #f5deb3',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#b8860b', margin: '0 0 15px 0' }}>🤔 何时选择非受控组件？</h4>
        <p style={{ color: '#8b7500', margin: 0 }}>
          当你的表单逻辑简单，不需要实时反馈，或者性能是主要考虑因素时，非受控组件是一个很好的选择。
          它们特别适合一次性数据收集的场景，比如登录表单、注册表单等。
        </p>
      </div>
    </div>
  );
};

export default UncontrolledPage;