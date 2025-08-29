import React, { useState, useTransition, startTransition } from 'react';

interface ConcurrentRenderingExampleProps {
  onLog: (message: string) => void;
}

// 一个昂贵的渲染组件
const ExpensiveComponent: React.FC<{ 
  items: number; 
  highlight: string; 
  renderMode: 'sync' | 'concurrent' 
}> = ({ items, highlight, renderMode }) => {
  const startTime = performance.now();
  
  // 生成大量元素
  const elements = [];
  for (let i = 0; i < items; i++) {
    // 模拟一些计算
    const value = Math.sin(i) * Math.cos(i) * 1000;
    const isHighlighted = highlight && i.toString().includes(highlight);
    
    elements.push(
      <div 
        key={i} 
        style={{
          padding: '2px 5px',
          margin: '1px',
          background: isHighlighted ? '#ffeb3b' : '#f5f5f5',
          border: isHighlighted ? '1px solid #fbc02d' : '1px solid #e0e0e0',
          borderRadius: '2px',
          fontSize: '11px',
          display: 'inline-block'
        }}
      >
        {i}: {value.toFixed(2)}
      </div>
    );
  }

  const renderTime = (performance.now() - startTime).toFixed(2);

  return (
    <div style={{
      border: `2px solid ${renderMode === 'concurrent' ? '#4caf50' : '#f44336'}`,
      borderRadius: '4px',
      padding: '10px',
      height: '200px',
      overflowY: 'auto',
      background: 'white'
    }}>
      <div style={{
        position: 'sticky',
        top: 0,
        background: 'white',
        borderBottom: '1px solid #eee',
        marginBottom: '5px',
        paddingBottom: '5px'
      }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
          {renderMode === 'concurrent' ? '🚀 并发渲染' : '🐌 同步渲染'} | 
          元素数量: {items} | 
          渲染时间: {renderTime}ms
          {highlight && ` | 高亮: "${highlight}"`}
        </p>
      </div>
      <div style={{ lineHeight: '1.2' }}>
        {elements}
      </div>
    </div>
  );
};

// 实时输入响应组件
const ResponsivenessTest: React.FC<{ isBlocked: boolean }> = ({ isBlocked }) => {
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('');

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDisplayValue(prev => prev + '.');
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      background: isBlocked ? '#ffebee' : '#e8f5e8',
      border: `1px solid ${isBlocked ? '#ffcdd2' : '#c8e6c8'}`,
      borderRadius: '4px',
      padding: '10px',
      marginBottom: '10px'
    }}>
      <h6 style={{ margin: '0 0 10px 0', color: isBlocked ? '#c62828' : '#2e7d32' }}>
        {isBlocked ? '🔴 UI 响应性测试 (可能卡顿)' : '🟢 UI 响应性测试 (保持流畅)'}
      </h6>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="在这里输入测试响应性..."
        style={{
          width: '100%',
          padding: '5px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          marginBottom: '5px'
        }}
      />
      <div style={{ fontSize: '12px', color: '#666' }}>
        输入内容: {inputValue}
      </div>
      <div style={{ fontSize: '12px', color: '#666' }}>
        实时更新: {displayValue.slice(-10)} {/* 只显示最后10个点 */}
      </div>
    </div>
  );
};

const ConcurrentRenderingExample: React.FC<ConcurrentRenderingExampleProps> = ({ onLog }) => {
  const [itemCount, setItemCount] = useState(1000);
  const [highlightFilter, setHighlightFilter] = useState('');
  const [syncItems, setSyncItems] = useState(1000);
  const [syncHighlight, setSyncHighlight] = useState('');
  const [concurrentItems, setConcurrentItems] = useState(1000);
  const [concurrentHighlight, setConcurrentHighlight] = useState('');
  
  const [isPending, startTransition] = useTransition();

  // 同步更新（会阻塞UI）
  const updateSync = () => {
    const startTime = performance.now();
    onLog(`🐌 开始同步更新 ${itemCount} 个元素...`);
    
    setSyncItems(itemCount);
    setSyncHighlight(highlightFilter);
    
    const endTime = performance.now();
    onLog(`🐌 同步更新完成，耗时: ${(endTime - startTime).toFixed(2)}ms`);
  };

  // 并发更新（不会阻塞UI）
  const updateConcurrent = () => {
    const startTime = performance.now();
    onLog(`🚀 开始并发更新 ${itemCount} 个元素...`);
    
    startTransition(() => {
      setConcurrentItems(itemCount);
      setConcurrentHighlight(highlightFilter);
      
      const endTime = performance.now();
      onLog(`🚀 并发更新完成，耗时: ${(endTime - startTime).toFixed(2)}ms`);
    });
  };

  const resetAll = () => {
    setSyncItems(1000);
    setSyncHighlight('');
    setConcurrentItems(1000);
    setConcurrentHighlight('');
    setItemCount(1000);
    setHighlightFilter('');
    onLog('🔄 重置所有组件');
  };

  return (
    <div style={{
      background: '#f3e5f5',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#6a1b9a' }}>
        4. 并发渲染与时间切片
      </h4>

      {/* 响应性测试区域 */}
      <ResponsivenessTest isBlocked={false} />

      {/* 控制面板 */}
      <div style={{
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '15px'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#666', marginRight: '5px' }}>
              元素数量:
            </label>
            <input
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              min="100"
              max="50000"
              step="500"
              style={{ width: '80px', padding: '2px 4px', fontSize: '12px' }}
            />
          </div>
          
          <div>
            <label style={{ fontSize: '12px', color: '#666', marginRight: '5px' }}>
              高亮过滤:
            </label>
            <input
              type="text"
              value={highlightFilter}
              onChange={(e) => setHighlightFilter(e.target.value)}
              placeholder="如: 1, 23, 5"
              style={{ width: '100px', padding: '2px 4px', fontSize: '12px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={updateSync}
            className="button" 
            style={{ 
              fontSize: '14px', 
              padding: '6px 12px',
              backgroundColor: '#f44336'
            }}
          >
            🐌 同步更新 (会阻塞)
          </button>
          
          <button 
            onClick={updateConcurrent}
            disabled={isPending}
            className="button" 
            style={{ 
              fontSize: '14px', 
              padding: '6px 12px',
              backgroundColor: '#4caf50'
            }}
          >
            {isPending ? '⏳ 并发更新中...' : '🚀 并发更新 (不阻塞)'}
          </button>

          <button 
            onClick={resetAll}
            className="button" 
            style={{ fontSize: '14px', padding: '6px 12px', backgroundColor: '#6c757d' }}
          >
            🔄 重置
          </button>
        </div>

        {isPending && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            padding: '8px',
            marginTop: '10px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
              ⏳ 并发渲染进行中，UI 保持响应，可以继续操作上方的输入框...
            </p>
          </div>
        )}
      </div>

      {/* 对比显示区域 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <h5 style={{ margin: '0 0 10px 0', color: '#f44336' }}>
            🐌 同步渲染 (阻塞模式)
          </h5>
          <ExpensiveComponent 
            items={syncItems} 
            highlight={syncHighlight} 
            renderMode="sync"
          />
        </div>
        
        <div>
          <h5 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>
            🚀 并发渲染 (时间切片)
          </h5>
          <ExpensiveComponent 
            items={concurrentItems} 
            highlight={concurrentHighlight} 
            renderMode="concurrent"
          />
        </div>
      </div>

      <div style={{
        background: '#e2f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '4px',
        padding: '10px',
        marginTop: '10px'
      }}>
        <h6 style={{ margin: '0 0 5px 0', color: '#0066cc' }}>💡 并发渲染原理</h6>
        <ul style={{ fontSize: '12px', color: '#004499', margin: 0, paddingLeft: '15px' }}>
          <li><strong>时间切片:</strong> React 将渲染工作分解为小块，避免长时间阻塞</li>
          <li><strong>优先级调度:</strong> 用户交互(如输入)比大量数据渲染优先级更高</li>
          <li><strong>可中断渲染:</strong> 当有高优先级任务时，低优先级渲染可以被中断</li>
          <li><strong>并发更新:</strong> 多个状态更新可以并发进行，提升整体性能</li>
        </ul>
      </div>
    </div>
  );
};

export default ConcurrentRenderingExample;