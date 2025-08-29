import React, { useState, useRef, useEffect } from 'react';

interface UseStateVsUseRefComparisonProps {
  onLog: (message: string) => void;
}

const UseStateVsUseRefComparison: React.FC<UseStateVsUseRefComparisonProps> = ({ onLog }) => {
  // useState 示例
  const [stateCounter, setStateCounter] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  
  // useRef 示例
  const refCounter = useRef(0);
  const renderCountRef = useRef(0);
  const previousStateValue = useRef(stateCounter);
  
  // 性能测量
  const lastRenderTime = useRef(performance.now());
  const [avgRenderTime, setAvgRenderTime] = useState(0);
  const renderTimes = useRef<number[]>([]);

  // 每次渲染时更新计数器
  useEffect(() => {
    const currentTime = performance.now();
    const renderTime = currentTime - lastRenderTime.current;
    lastRenderTime.current = currentTime;
    
    renderCountRef.current += 1;
    setRenderCount(prev => prev + 1);
    
    // 记录渲染时间（跳过初始渲染）
    if (renderCountRef.current > 1) {
      renderTimes.current.push(renderTime);
      const avg = renderTimes.current.reduce((sum, time) => sum + time, 0) / renderTimes.current.length;
      setAvgRenderTime(avg);
    }

    // 检测 state 变化
    if (previousStateValue.current !== stateCounter) {
      onLog(`🔄 State 值从 ${previousStateValue.current} 变为 ${stateCounter} - 触发重渲染`);
      previousStateValue.current = stateCounter;
    }
  });

  // useState 操作
  const incrementState = () => {
    const oldValue = stateCounter;
    setStateCounter(prev => prev + 1);
    onLog(`📈 useState: ${oldValue} → ${oldValue + 1} (将触发重渲染)`);
  };

  // useRef 操作
  const incrementRef = () => {
    const oldValue = refCounter.current;
    refCounter.current += 1;
    onLog(`🔧 useRef: ${oldValue} → ${refCounter.current} (不触发重渲染)`);
  };

  // 强制更新以显示 ref 的当前值
  const forceUpdate = () => {
    setRenderCount(prev => prev + 1);
    onLog(`🔄 强制更新组件以显示 ref 当前值: ${refCounter.current}`);
  };

  // 重置所有值
  const resetAll = () => {
    setStateCounter(0);
    refCounter.current = 0;
    renderTimes.current = [];
    setAvgRenderTime(0);
    onLog('🔄 所有计数器已重置');
  };

  // 性能测试
  const performanceTest = () => {
    onLog('🧪 开始性能测试...');
    
    // useState 连续更新测试
    const startTime = performance.now();
    
    // 模拟多次 state 更新
    let tempState = stateCounter;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        tempState += 1;
        setStateCounter(tempState);
      }, i * 100);
    }
    
    // ref 连续更新测试
    for (let i = 0; i < 5; i++) {
      refCounter.current += 1;
    }
    
    const endTime = performance.now();
    onLog(`⚡ ref 更新耗时: ${(endTime - startTime).toFixed(2)}ms (即时完成)`);
    onLog(`⚡ state 更新将在 500ms 内完成 (异步更新)`);
  };

  return (
    <div style={{
      background: '#fff5f5',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#c53030' }}>
        ⚔️ useState vs useRef 深度对比
      </h4>

      {/* 状态显示面板 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginBottom: '15px'
      }}>
        {/* useState 面板 */}
        <div style={{
          background: 'white',
          border: '2px solid #4299e1',
          borderRadius: '6px',
          padding: '15px'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#2b6cb0' }}>📈 useState 状态</h5>
          <div style={{ fontSize: '14px', color: '#2d3748' }}>
            <p style={{ margin: '5px 0' }}>当前值: <strong>{stateCounter}</strong></p>
            <p style={{ margin: '5px 0' }}>渲染次数: <strong>{renderCount}</strong></p>
            <p style={{ margin: '5px 0' }}>平均渲染时间: <strong>{avgRenderTime.toFixed(2)}ms</strong></p>
          </div>
          <button 
            onClick={incrementState}
            className="button" 
            style={{ 
              fontSize: '12px', 
              padding: '6px 12px', 
              backgroundColor: '#4299e1',
              marginTop: '8px'
            }}
          >
            ➕ 增加 State
          </button>
        </div>

        {/* useRef 面板 */}
        <div style={{
          background: 'white',
          border: '2px solid #48bb78',
          borderRadius: '6px',
          padding: '15px'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#2f855a' }}>🔧 useRef 状态</h5>
          <div style={{ fontSize: '14px', color: '#2d3748' }}>
            <p style={{ margin: '5px 0' }}>当前值: <strong>{refCounter.current}</strong></p>
            <p style={{ margin: '5px 0' }}>ref 渲染计数: <strong>{renderCountRef.current}</strong></p>
            <p style={{ margin: '5px 0' }}>性能: <strong>即时更新</strong></p>
          </div>
          <div style={{ marginTop: '8px' }}>
            <button 
              onClick={incrementRef}
              className="button" 
              style={{ 
                fontSize: '12px', 
                padding: '6px 12px', 
                backgroundColor: '#48bb78',
                marginRight: '8px'
              }}
            >
              ➕ 增加 Ref
            </button>
            <button 
              onClick={forceUpdate}
              className="button" 
              style={{ 
                fontSize: '12px', 
                padding: '6px 12px', 
                backgroundColor: '#ed8936'
              }}
            >
              🔄 强制更新
            </button>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={performanceTest}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#9f7aea' }}
          >
            🧪 性能测试
          </button>
          
          <button 
            onClick={resetAll}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#6c757d' }}
          >
            🔄 重置所有
          </button>
        </div>
      </div>

      {/* 对比表格 */}
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '15px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f7fafc' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0', color: '#4a5568' }}>
                特性
              </th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#2b6cb0' }}>
                useState
              </th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e2e8f0', color: '#2f855a' }}>
                useRef
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                触发重渲染
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center', color: '#e53e3e' }}>
                ✅ 是
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center', color: '#38a169' }}>
                ❌ 否
              </td>
            </tr>
            <tr style={{ background: '#f9f9f9' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                更新性能
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                异步调度
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                同步即时
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                内存持久性
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                React 管理
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                手动引用
              </td>
            </tr>
            <tr style={{ background: '#f9f9f9' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                UI 响应
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                自动更新
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>
                需手动触发
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>
                使用场景
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                UI 状态管理
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                DOM 操作/缓存
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 核心原理说明 */}
      <div style={{
        background: '#edf2f7',
        border: '1px solid #cbd5e0',
        borderRadius: '4px',
        padding: '15px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#4a5568' }}>🧠 核心实现差异</h5>
        <div style={{ fontSize: '13px', color: '#2d3748', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '10px' }}>
            <strong>useState 内部机制：</strong>
            <pre style={{ 
              background: '#f7fafc', 
              padding: '8px', 
              borderRadius: '4px', 
              margin: '5px 0',
              fontSize: '12px',
              overflow: 'auto'
            }}>
{`// 简化版 useState 实现
function useState(initial) {
  const hook = getCurrentHook();
  if (!hook.state) {
    hook.state = initial;
  }
  const setState = (newValue) => {
    hook.state = newValue;
    scheduleRerender(); // 调度重新渲染
  };
  return [hook.state, setState];
}`}
            </pre>
          </div>
          
          <div>
            <strong>useRef 内部机制：</strong>
            <pre style={{ 
              background: '#f7fafc', 
              padding: '8px', 
              borderRadius: '4px', 
              margin: '5px 0',
              fontSize: '12px',
              overflow: 'auto'
            }}>
{`// 简化版 useRef 实现
function useRef(initial) {
  const hook = getCurrentHook();
  if (!hook.ref) {
    hook.ref = { current: initial };
  }
  return hook.ref; // 返回相同的对象引用
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseStateVsUseRefComparison;