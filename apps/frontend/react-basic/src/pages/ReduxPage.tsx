import React from 'react';
import { ReduxExample } from '../components';

const ReduxPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🔄 React-Redux 示例</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>单一数据源：</strong> 整个应用的状态存储在单一的 Store 中</li>
          <li><strong>状态只读：</strong> 唯一改变状态的方式是触发 Action</li>
          <li><strong>纯函数更新：</strong> 使用 Reducer 纯函数执行状态更新</li>
          <li><strong>可预测性：</strong> 状态变化是可预测和可追踪的</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>复杂的状态管理需求</li>
          <li>多组件间共享状态</li>
          <li>需要状态持久化</li>
          <li>大型应用开发</li>
          <li>团队协作开发</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 集中管理应用状态</li>
          <li>✅ 状态变化可预测</li>
          <li>✅ 便于调试和测试</li>
          <li>✅ 支持时间旅行调试</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 对于简单应用可能过于复杂</li>
          <li>❗ 学习曲线较陡峭</li>
          <li>❗ 可能影响性能（如果没有正确使用）</li>
        </ul>
      </div>

      <ReduxExample />

      <div style={{
        background: '#fff7ed',
        border: '1px solid #fed7aa',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#ea580c', margin: '0 0 15px 0' }}>💡 实现要点</h4>
        <ul style={{ color: '#c2410c', margin: 0, paddingLeft: '20px' }}>
          <li>使用 <code>useSelector</code> 从 Store 中读取状态</li>
          <li>使用 <code>useDispatch</code> 分发 Actions</li>
          <li>通过 <code>createSlice</code> 或 <code>combineReducers</code> 组织 Reducers</li>
          <li>使用 <code>Provider</code> 组件包装应用以提供 Store</li>
        </ul>
      </div>
    </div>
  );
};

export default ReduxPage;