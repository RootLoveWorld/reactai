import React from 'react';
import RefsExample from '../components/RefsExample';

const RefsPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🔗 React Refs</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>引用系统：</strong> Refs 提供了一种访问 DOM 节点或组件实例的方式</li>
          <li><strong>逃生舱口：</strong> 当声明式的 React 无法满足需求时，refs 提供了命令式的解决方案</li>
          <li><strong>可变容器：</strong> ref 对象的 .current 属性是可变的，可以保存任何值</li>
          <li><strong>跨渲染持久：</strong> ref 的值在组件的整个生命周期内保持，不会因重新渲染而丢失</li>
        </ul>
        
        <h4>📋 主要使用场景：</h4>
        <ul>
          <li>管理焦点、文本选择或媒体播放</li>
          <li>触发命令式动画</li>
          <li>集成第三方 DOM 库</li>
          <li>存储计时器 ID、DOM 元素等</li>
          <li>在函数组件间传递 DOM 引用</li>
        </ul>

        <h4>⚡ 三种主要的 Ref 模式：</h4>
        <ul>
          <li>✅ <strong>useRef：</strong> 在函数组件中创建和使用 refs</li>
          <li>✅ <strong>forwardRef：</strong> 将 ref 从父组件传递到子组件</li>
          <li>✅ <strong>useImperativeHandle：</strong> 自定义暴露给父组件的实例值</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ 不要在渲染期间读写 ref.current</li>
          <li>❗ 避免过度使用，优先考虑 props 和 state</li>
          <li>❗ ref 变化不会触发重新渲染</li>
          <li>❗ 在 StrictMode 下可能会有不同行为</li>
        </ul>
      </div>

      <RefsExample />

      <div style={{
        background: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#495057', margin: '0 0 15px 0' }}>🛠️ 基本语法和模式</h4>
        
        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>1. useRef 基础语法</h5>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          <div>// 创建 ref</div>
          <div>const myRef = useRef&lt;HTMLInputElement&gt;(null);</div>
          <br />
          <div>// 绑定到 DOM</div>
          <div>&lt;input ref={`{myRef}`} /&gt;</div>
          <br />
          <div>// 访问 DOM 元素</div>
          <div>myRef.current?.focus();</div>
        </div>

        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>2. forwardRef 语法</h5>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          <div>const MyComponent = forwardRef&lt;HTMLInputElement, Props&gt;(</div>
          <div>&nbsp;&nbsp;(props, ref) =&gt; {`{`}</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;return &lt;input ref=&#123;ref&#125; &#123;...props&#125; /&gt;;</div>
          <div>&nbsp;&nbsp;{`}`}</div>
          <div>);</div>
        </div>

        <h5 style={{ color: '#495057', margin: '15px 0 10px 0' }}>3. useImperativeHandle 语法</h5>
        <div style={{
          background: '#f1f1f1',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <div>useImperativeHandle(ref, () =&gt; ({`{`}</div>
          <div>&nbsp;&nbsp;focus: () =&gt; inputRef.current?.focus(),</div>
          <div>&nbsp;&nbsp;clear: () =&gt; inputRef.current && (inputRef.current.value = '')</div>
          <div>{`}`}));</div>
        </div>
      </div>

      <div style={{
        background: '#e2f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0066cc', margin: '0 0 15px 0' }}>🎯 实际应用场景</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '15px'
        }}>
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h5 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>🎯 焦点管理</h5>
            <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>自动聚焦表单字段</li>
              <li>键盘导航支持</li>
              <li>模态框焦点陷阱</li>
              <li>无障碍性改进</li>
            </ul>
          </div>

          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h5 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>📱 媒体控制</h5>
            <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>视频播放/暂停</li>
              <li>音频音量控制</li>
              <li>画布绘图操作</li>
              <li>文件上传进度</li>
            </ul>
          </div>

          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h5 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>🔧 第三方集成</h5>
            <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>图表库初始化</li>
              <li>地图组件集成</li>
              <li>富文本编辑器</li>
              <li>动画库控制</li>
            </ul>
          </div>

          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h5 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>💾 值存储</h5>
            <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>定时器 ID 存储</li>
              <li>前一次的 props/state</li>
              <li>计算结果缓存</li>
              <li>DOM 尺寸信息</li>
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
        <h4 style={{ color: '#c53030', margin: '0 0 15px 0' }}>🤔 设计决策指南</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <h5 style={{ color: '#c53030', margin: '0 0 10px 0' }}>🎯 何时使用 Refs：</h5>
            <ul style={{ color: '#822727', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>需要命令式 DOM 操作</li>
              <li>触发焦点、滚动、选择</li>
              <li>集成非 React 库</li>
              <li>测量 DOM 节点</li>
              <li>存储不影响渲染的值</li>
            </ul>
          </div>
          
          <div>
            <h5 style={{ color: '#c53030', margin: '0 0 10px 0' }}>🚫 何时避免 Refs：</h5>
            <ul style={{ color: '#822727', margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
              <li>能通过 props 传递的数据</li>
              <li>应该触发重新渲染的状态</li>
              <li>声明式方法能解决的问题</li>
              <li>子组件的内部状态管理</li>
              <li>组件间的数据流控制</li>
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
          <li><strong>Ref 回调：</strong> 使用函数形式的 ref 来执行副作用</li>
          <li><strong>条件性 ref：</strong> 根据条件动态绑定不同的 ref</li>
          <li><strong>Ref 数组：</strong> 管理动态列表中的多个 DOM 元素</li>
          <li><strong>自定义 Hook：</strong> 封装常见的 ref 使用模式</li>
          <li><strong>TypeScript 集成：</strong> 充分利用类型系统确保类型安全</li>
        </ul>
      </div>
    </div>
  );
};

export default RefsPage;