import React from 'react';
import ControlledComponent from '../components/ControlledComponent';

const ControlledPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🎛️ 受控组件 (Controlled Components)</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>状态驱动：</strong> 表单元素的值由 React 状态完全控制</li>
          <li><strong>实时同步：</strong> 每次用户输入都会触发状态更新和组件重新渲染</li>
          <li><strong>单一数据源：</strong> React 状态是表单数据的唯一来源</li>
          <li><strong>预测性强：</strong> 组件行为完全可预测和可控</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>需要实时表单验证</li>
          <li>输入格式化（如电话号码、金额）</li>
          <li>条件性显示/隐藏表单元素</li>
          <li>复杂的表单交互逻辑</li>
          <li>需要在多个组件间共享表单状态</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 实时数据验证和反馈</li>
          <li>✅ 容易实现复杂的表单逻辑</li>
          <li>✅ 状态可以轻松共享给其他组件</li>
          <li>✅ 支持撤销/重做功能</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 每次输入都会触发重新渲染</li>
          <li>❗ 大量输入字段时可能影响性能</li>
          <li>❗ 需要更多的代码来管理状态</li>
        </ul>
      </div>

      <ControlledComponent />

      <div style={{
        background: '#e7f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0066cc', margin: '0 0 15px 0' }}>💡 实现要点</h4>
        <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px' }}>
          <li><code>value</code> 属性绑定到 React 状态</li>
          <li><code>onChange</code> 事件处理器更新状态</li>
          <li>使用 <code>useState</code> Hook 管理表单状态</li>
          <li>状态更新是异步的，使用函数式更新确保正确性</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlledPage;