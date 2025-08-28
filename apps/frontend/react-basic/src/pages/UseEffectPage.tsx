import React from 'react';
import { UseEffectExample } from '../components';

const UseEffectPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🔄 useEffect Hook</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>副作用管理：</strong> useEffect 让你能在函数组件中执行副作用操作</li>
          <li><strong>生命周期替代：</strong> 相当于 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合</li>
          <li><strong>声明式思维：</strong> 告诉 React 组件渲染后需要做什么，而不是何时做</li>
          <li><strong>依赖追踪：</strong> 通过依赖数组控制 effect 的执行时机</li>
        </ul>
        
        <h4>📋 主要使用场景：</h4>
        <ul>
          <li>数据获取 (API 调用、数据库查询)</li>
          <li>设置订阅 (WebSocket、事件监听器)</li>
          <li>手动更改 DOM (第三方库集成)</li>
          <li>定时器和间隔器管理</li>
          <li>清理资源 (取消网络请求、移除监听器)</li>
        </ul>

        <h4>⚡ 三种主要模式：</h4>
        <ul>
          <li>✅ <strong>无依赖数组：</strong> 每次渲染后都执行</li>
          <li>✅ <strong>空依赖数组 []：</strong> 仅在挂载时执行一次</li>
          <li>✅ <strong>有依赖数组 [dep1, dep2]：</strong> 仅在依赖变化时执行</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 避免在 effect 内部直接修改依赖的状态</li>
          <li>❗ 必须在 effect 中包含所有使用的外部变量</li>
          <li>❗ 清理函数很重要，避免内存泄漏</li>
          <li>❗ effect 是异步执行的，不会阻塞浏览器渲染</li>
        </ul>
      </div>

      <UseEffectExample />

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>🛠️ 基本语法和模式</h4>
        
        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>1. 基础语法</h5>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          <div>useEffect(() =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;// 副作用代码</div>
          <div>&nbsp;&nbsp;console.log('Effect 执行了');</div>
          <br />
          <div>&nbsp;&nbsp;// 返回清理函数（可选）</div>
          <div>&nbsp;&nbsp;return () =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;console.log('清理代码');</div>
          <div>&nbsp;&nbsp;{`}`};</div>
          <div>{`}`}, [dependency]); // 依赖数组</div>
        </div>

        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>2. 三种执行模式</h5>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          <div>// 每次渲染后执行</div>
          <div>useEffect(() =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;console.log('每次渲染后执行');</div>
          <div>{`}`}); // 无依赖数组</div>
          <br />
          <div>// 仅挂载时执行</div>
          <div>useEffect(() =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;console.log('仅挂载时执行');</div>
          <div>{`}`}, []); // 空依赖数组</div>
          <br />
          <div>// 依赖变化时执行</div>
          <div>useEffect(() =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;console.log('count 变化了');</div>
          <div>{`}`}, [count]); // 有依赖</div>
        </div>

        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>3. 清理函数模式</h5>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <div>useEffect(() =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;const timer = setInterval(() =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;// 定时任务</div>
          <div>&nbsp;&nbsp;{`}`}, 1000);</div>
          <br />
          <div>&nbsp;&nbsp;// 清理函数</div>
          <div>&nbsp;&nbsp;return () =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;clearInterval(timer);</div>
          <div>&nbsp;&nbsp;{`}`};</div>
          <div>{`}`}, []);</div>
        </div>
      </div>

      <div style={{
        background: '#e2f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0066cc', margin: '0 0 15px 0' }}>🎯 实践指南</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h5 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>✅ 正确的做法</h5>
            <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>总是包含 effect 中使用的所有依赖</li>
              <li>使用多个 effect 分离不同的关注点</li>
              <li>在清理函数中取消订阅和清理资源</li>
              <li>使用 useCallback 稳定函数引用</li>
              <li>将 effect 逻辑提取为自定义 Hook</li>
            </ul>
          </div>
          
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h5 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>❌ 常见陷阱</h5>
            <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>忘记包含依赖导致闭包陷阱</li>
              <li>在 effect 中直接修改依赖状态</li>
              <li>忘记清理定时器和事件监听器</li>
              <li>过度使用 effect 处理简单状态</li>
              <li>在 effect 中使用过时的状态值</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        background: '#fff5f5',
        border: '1px solid #fed7d7',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#c53030', margin: '0 0 15px 0' }}>🔄 Effect 执行时机</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '15px'
        }}>
          <div>
            <h5 style={{ color: '#c53030', margin: '0 0 10px 0' }}>⏰ 执行顺序：</h5>
            <ol style={{ color: '#822727', margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
              <li>组件渲染到屏幕</li>
              <li>DOM 更新完成</li>
              <li>浏览器绘制完成</li>
              <li>useEffect 回调执行</li>
              <li>下次更新前执行清理函数</li>
            </ol>
          </div>
          
          <div>
            <h5 style={{ color: '#c53030', margin: '0 0 10px 0' }}>🎯 执行条件：</h5>
            <ul style={{ color: '#822727', margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
              <li><strong>无依赖：</strong>每次渲染后执行</li>
              <li><strong>空数组：</strong>仅挂载时执行</li>
              <li><strong>有依赖：</strong>依赖变化时执行</li>
              <li><strong>清理函数：</strong>卸载前或依赖变化前执行</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        background: '#e6fffa',
        border: '1px solid #81e6d9',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#234e52', margin: '0 0 15px 0' }}>🔥 高级技巧</h4>
        <ul style={{ color: '#2c5f5f', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>自定义 Hook：</strong> 将复杂的 effect 逻辑封装为可重用的 Hook</li>
          <li><strong>useLayoutEffect：</strong> 同步执行，适用于 DOM 操作</li>
          <li><strong>竞态条件处理：</strong> 使用取消标记避免过期的异步操作</li>
          <li><strong>依赖优化：</strong> 使用 useCallback 和 useMemo 稳定依赖</li>
          <li><strong>错误边界：</strong> 结合错误边界处理 effect 中的异常</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectPage;