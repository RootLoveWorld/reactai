import React from 'react';
import { SagaExample } from '../components';

const SagaPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🐉 Redux-Saga 示例</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>Generator 函数：</strong> 使用 ES6 Generator 函数处理异步操作</li>
          <li><strong>Effect：</strong> 通过声明式 Effect 描述副作用</li>
          <li><strong>可测试性：</strong> 异步流程易于测试</li>
          <li><strong>复杂流程：</strong> 适合处理复杂的异步流程</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>复杂的异步操作流程</li>
          <li>需要取消的异步操作</li>
          <li>复杂的业务逻辑</li>
          <li>需要精确控制的副作用</li>
          <li>大型应用的状态管理</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 强大的异步流程控制</li>
          <li>✅ 易于测试的声明式 Effects</li>
          <li>✅ 支持并发操作</li>
          <li>✅ 支持取消操作</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 学习曲线较陡峭</li>
          <li>❗ Generator 函数语法相对复杂</li>
          <li>❗ 对于简单异步操作可能过于复杂</li>
        </ul>
      </div>

      <SagaExample />

      <div style={{
        background: '#fdf4ff',
        border: '1px solid #f0abfc',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#c026d3', margin: '0 0 15px 0' }}>💡 实现要点</h4>
        <ul style={{ color: '#a21caf', margin: 0, paddingLeft: '20px' }}>
          <li>使用 Generator 函数创建 Sagas</li>
          <li>通过 <code>takeEvery</code>、<code>takeLatest</code> 监听 Actions</li>
          <li>使用 Effects（如 <code>call</code>、<code>put</code>、<code>fork</code>）描述副作用</li>
          <li>通过 <code>fork</code> 和 <code>cancel</code> 实现任务取消</li>
        </ul>
      </div>
    </div>
  );
};

export default SagaPage;