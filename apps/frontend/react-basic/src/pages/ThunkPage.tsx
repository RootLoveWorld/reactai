import React from 'react';
import { ThunkExample } from '../components';

const ThunkPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>⚡ Redux-Thunk 示例</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>异步操作：</strong> 允许 Action Creator 返回函数而非普通对象</li>
          <li><strong>中间件：</strong> 在 Action 分发和 Reducer 处理之间执行逻辑</li>
          <li><strong>副作用处理：</strong> 处理 API 调用、定时器等副作用</li>
          <li><strong>链式操作：</strong> 支持多个异步操作的链式调用</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>API 数据获取</li>
          <li>复杂的异步流程</li>
          <li>条件性分发 Actions</li>
          <li>错误处理和重试逻辑</li>
          <li>需要访问 Store 状态的异步操作</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 简单易学，API 简洁</li>
          <li>✅ 与 Redux 深度集成</li>
          <li>✅ 支持同步和异步操作</li>
          <li>✅ 易于测试</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 对于复杂异步流程可能不够强大</li>
          <li>❗ 错误处理需要手动实现</li>
          <li>❗ 不支持取消操作</li>
        </ul>
      </div>

      <ThunkExample />

      <div style={{
        background: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#16a34a', margin: '0 0 15px 0' }}>💡 实现要点</h4>
        <ul style={{ color: '#15803d', margin: 0, paddingLeft: '20px' }}>
          <li>Action Creator 可以返回函数，接收 <code>dispatch</code> 和 <code>getState</code> 参数</li>
          <li>在异步操作完成后手动分发普通 Actions</li>
          <li>支持条件逻辑和错误处理</li>
          <li>可以组合多个异步操作</li>
        </ul>
      </div>
    </div>
  );
};

export default ThunkPage;