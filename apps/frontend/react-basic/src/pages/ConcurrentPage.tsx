import React from 'react';
import { ConcurrentExample } from '../components/concurrent';

const ConcurrentPage: React.FC = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#9c27b0', 
        marginBottom: '30px',
        fontSize: '2.5em' 
      }}>
        ⚡ React 并发模式深入浅出
      </h1>

      {/* 核心概念介绍 */}
      <div style={{
        background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
        border: '1px solid #e1bee7',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#7b1fa2' }}>🎯 核心概念</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e1bee7' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#8e24aa' }}>🔄 可中断渲染</h3>
            <p style={{ margin: 0, color: '#4a148c', fontSize: '14px', lineHeight: '1.5' }}>
              React 可以暂停当前的渲染工作，处理更重要的任务（如用户输入），然后继续之前的渲染。
              这确保了 UI 始终保持响应性。
            </p>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e1bee7' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#8e24aa' }}>⚡ 优先级调度</h3>
            <p style={{ margin: 0, color: '#4a148c', fontSize: '14px', lineHeight: '1.5' }}>
              不同的更新有不同的优先级。用户交互（点击、输入）具有最高优先级，
              而数据获取或动画更新的优先级较低。
            </p>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e1bee7' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#8e24aa' }}>🎯 时间切片</h3>
            <p style={{ margin: 0, color: '#4a148c', fontSize: '14px', lineHeight: '1.5' }}>
              React 将长时间的渲染工作分解为小块，在每个时间片之间让出控制权给浏览器，
              避免阻塞主线程。
            </p>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e1bee7' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#8e24aa' }}>🚀 并发更新</h3>
            <p style={{ margin: 0, color: '#4a148c', fontSize: '14px', lineHeight: '1.5' }}>
              多个状态更新可以同时进行，React 会智能地协调这些更新，
              确保最终状态的一致性和最佳性能。
            </p>
          </div>
        </div>
      </div>

      {/* API 详解 */}
      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#495057' }}>📚 主要 API 详解</h2>

        {/* startTransition */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#6f42c1' }}>🔄 startTransition</h3>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #dee2e6' }}>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px', 
              fontSize: '14px',
              margin: '0 0 10px 0',
              overflowX: 'auto'
            }}>
{`import { startTransition } from 'react';

// 将非紧急更新标记为过渡
startTransition(() => {
  setSearchResults(expensiveComputation(query));
});

// 或使用 useTransition 获取 pending 状态
const [isPending, startTransition] = useTransition();`}
            </pre>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>用途：</strong> 标记非紧急的状态更新，这些更新可以被更高优先级的任务中断。
              适用于搜索过滤、数据展示等不需要立即响应的场景。
            </p>
          </div>
        </div>

        {/* useDeferredValue */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#6f42c1' }}>⏳ useDeferredValue</h3>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #dee2e6' }}>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px', 
              fontSize: '14px',
              margin: '0 0 10px 0',
              overflowX: 'auto'
            }}>
{`import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  // 延迟查询值，保持输入的响应性
  const deferredQuery = useDeferredValue(query);
  
  // 使用延迟值进行昂贵的计算
  const results = useMemo(() => 
    expensiveSearch(deferredQuery), [deferredQuery]
  );
  
  return <div>{results}</div>;
}`}
            </pre>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>用途：</strong> 延迟某个值的更新，让更重要的 UI（如输入框）保持响应。
              特别适用于实时搜索和过滤场景。
            </p>
          </div>
        </div>

        {/* Suspense */}
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#6f42c1' }}>📦 Suspense</h3>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #dee2e6' }}>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px', 
              fontSize: '14px',
              margin: '0 0 10px 0',
              overflowX: 'auto'
            }}>
{`import { Suspense, lazy } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`}
            </pre>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>用途：</strong> 处理异步组件和数据加载，提供统一的加载状态管理。
              支持代码分割和数据获取的优雅降级。
            </p>
          </div>
        </div>
      </div>

      {/* 使用场景 */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c8 100%)',
        border: '1px solid #c8e6c8',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#2e7d32' }}>🎪 实际使用场景</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #c8e6c8' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1b5e20' }}>🔍 实时搜索</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#2e7d32' }}>
              用户在搜索框输入时，使用 useDeferredValue 延迟搜索结果的更新，
              确保输入框始终响应，而搜索结果在用户停止输入后更新。
            </p>
            <div style={{ fontSize: '12px', color: '#4caf50', fontFamily: 'monospace' }}>
              useTransition + useDeferredValue
            </div>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #c8e6c8' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1b5e20' }}>📊 大数据展示</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#2e7d32' }}>
              渲染大量数据列表时，使用 startTransition 标记数据更新为非紧急，
              让用户的滚动、点击等操作具有更高优先级。
            </p>
            <div style={{ fontSize: '12px', color: '#4caf50', fontFamily: 'monospace' }}>
              startTransition + 虚拟滚动
            </div>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #c8e6c8' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1b5e20' }}>🎨 复杂动画</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#2e7d32' }}>
              在执行复杂动画或渲染密集型组件时，通过优先级调度，
              确保关键用户交互不会被动画阻塞。
            </p>
            <div style={{ fontSize: '12px', color: '#4caf50', fontFamily: 'monospace' }}>
              时间切片 + requestIdleCallback
            </div>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #c8e6c8' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1b5e20' }}>📦 代码分割</h4>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#2e7d32' }}>
              结合 React.lazy 和 Suspense，实现按需加载组件，
              提高应用启动速度和用户体验。
            </p>
            <div style={{ fontSize: '12px', color: '#4caf50', fontFamily: 'monospace' }}>
              Suspense + React.lazy
            </div>
          </div>
        </div>
      </div>

      {/* 交互示例 */}
      <ConcurrentExample />

      {/* 性能优化建议 */}
      <div style={{
        background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)',
        border: '1px solid #ffcc80',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#e65100' }}>⚡ 性能优化建议</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #ffcc80' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#bf360c' }}>✅ 应该使用</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#e65100', fontSize: '14px', lineHeight: '1.6' }}>
              <li>用户输入导致的昂贵计算</li>
              <li>大列表渲染和过滤</li>
              <li>非关键的数据更新</li>
              <li>复杂图表或可视化</li>
              <li>代码分割的懒加载</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #ffcc80' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#bf360c' }}>❌ 不应使用</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#e65100', fontSize: '14px', lineHeight: '1.6' }}>
              <li>简单的状态更新</li>
              <li>关键的用户反馈</li>
              <li>错误处理和验证</li>
              <li>导航和路由变化</li>
              <li>安全相关的更新</li>
            </ul>
          </div>

          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #ffcc80' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#bf360c' }}>🎯 最佳实践</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#e65100', fontSize: '14px', lineHeight: '1.6' }}>
              <li>配合 React.memo 使用</li>
              <li>合理设置 Suspense 边界</li>
              <li>避免过度包装</li>
              <li>监控性能指标</li>
              <li>渐进式采用策略</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 总结 */}
      <div style={{
        background: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
        border: '1px solid #90caf9',
        borderRadius: '8px',
        padding: '25px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#0d47a1' }}>🎉 总结</h2>
        <p style={{ 
          margin: '0', 
          color: '#1565c0', 
          fontSize: '18px', 
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          React 并发模式通过<strong>可中断渲染</strong>、<strong>优先级调度</strong>和<strong>时间切片</strong>技术，
          让应用在处理复杂任务时仍能保持响应性。合理使用 <code style={{background: 'white', padding: '2px 4px', borderRadius: '3px'}}>startTransition</code>、
          <code style={{background: 'white', padding: '2px 4px', borderRadius: '3px'}}>useDeferredValue</code> 和 
          <code style={{background: 'white', padding: '2px 4px', borderRadius: '3px'}}>Suspense</code>，
          可以显著提升用户体验，让你的 React 应用更快、更流畅！
        </p>
      </div>
    </div>
  );
};

export default ConcurrentPage;