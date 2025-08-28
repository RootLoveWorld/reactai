import React, { useRef, useState, useEffect } from 'react';

const BasicRefExamples: React.FC = () => {
  // 1. DOM 元素引用
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. 存储可变值（不触发重新渲染）
  const countRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // 3. 状态用于演示对比
  const [stateCount, setStateCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // 添加日志
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 聚焦输入框
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#e7f3ff';
      addLog('输入框获得焦点');
    }
  };

  // 清空输入框
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.style.backgroundColor = '';
      addLog('输入框内容已清空');
    }
  };

  // 滚动到顶部
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      addLog('滚动到顶部');
    }
  };

  // 滚动到底部
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      addLog('滚动到底部');
    }
  };

  // Ref 计数器（不触发重新渲染）
  const incrementRefCount = () => {
    countRef.current += 1;
    addLog(`Ref 计数器: ${countRef.current} (组件不会重新渲染)`);
  };

  // State 计数器（触发重新渲染）
  const incrementStateCount = () => {
    setStateCount(prev => prev + 1);
    addLog(`State 计数器: ${stateCount + 1} (组件会重新渲染)`);
  };

  // 启动定时器
  const startTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    
    timerRef.current = window.setInterval(() => {
      countRef.current += 1;
      addLog(`定时器 Ref 计数: ${countRef.current}`);
    }, 1000);
    
    addLog('定时器已启动');
  };

  // 停止定时器
  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
      addLog('定时器已停止');
    }
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      background: 'white',
      border: '2px solid #007acc',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#007acc' }}>
        🔗 基础 useRef 示例
      </h3>

      {/* DOM 操作示例 */}
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
          1. DOM 元素操作
        </h4>

        <div style={{ marginBottom: '15px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="这是一个可以被 ref 控制的输入框"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={focusInput} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
              🎯 聚焦输入框
            </button>
            <button onClick={clearInput} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
              🧹 清空内容
            </button>
          </div>
        </div>

        <div style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          height: '120px',
          overflowY: 'scroll',
          padding: '10px',
          background: 'white',
          marginBottom: '10px'
        }}
        ref={scrollRef}
        >
          <div style={{ height: '300px', background: 'linear-gradient(to bottom, #e3f2fd, #bbdefb, #90caf9, #64b5f6, #42a5f5)' }}>
            <p style={{ margin: '10px', color: '#1976d2', fontWeight: 'bold' }}>📜 可滚动内容区域</p>
            <p style={{ margin: '10px' }}>这是顶部内容...</p>
            <p style={{ margin: '10px' }}>中间内容区域...</p>
            <p style={{ margin: '10px' }}>更多内容...</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={scrollToTop} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
            ⬆️ 滚动到顶部
          </button>
          <button onClick={scrollToBottom} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
            ⬇️ 滚动到底部
          </button>
        </div>
      </div>

      {/* 可变值存储示例 */}
      <div style={{
        background: '#fff8dc',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#b8860b' }}>
          2. 存储可变值（不触发重新渲染）
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          marginBottom: '15px'
        }}>
          <div style={{
            padding: '15px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #ffd700'
          }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#b8860b' }}>Ref 计数器</h5>
            <p style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {countRef.current}
            </p>
            <button onClick={incrementRefCount} className="button" style={{ backgroundColor: '#ffc107', color: '#333' }}>
              +1 (不重新渲染)
            </button>
          </div>

          <div style={{
            padding: '15px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #007acc'
          }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#007acc' }}>State 计数器</h5>
            <p style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {stateCount}
            </p>
            <button onClick={incrementStateCount} className="button">
              +1 (会重新渲染)
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={startTimer} className="button" style={{ backgroundColor: '#28a745' }}>
            ▶️ 启动定时器
          </button>
          <button onClick={stopTimer} className="button" style={{ backgroundColor: '#dc3545' }}>
            ⏹️ 停止定时器
          </button>
        </div>
      </div>

      {/* 操作日志 */}
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>📋 操作日志</h4>
        <div style={{
          maxHeight: '150px',
          overflowY: 'auto',
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          {logs.length === 0 ? (
            <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>
              暂无操作记录，点击上方按钮进行操作...
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '5px',
                paddingBottom: '5px',
                borderBottom: logs.length - 1 === index ? 'none' : '1px solid #eee'
              }}>
                {log}
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => setLogs([])}
          className="button"
          style={{ marginTop: '10px', fontSize: '12px', padding: '4px 8px' }}
        >
          🗑️ 清空日志
        </button>
      </div>

      {/* 说明 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#e7f3ff',
        borderRadius: '4px',
        border: '1px solid #b3d9ff'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>💡 useRef 核心特点:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#004499', lineHeight: '1.6' }}>
          <li><strong>DOM 访问:</strong> 直接访问和操作 DOM 元素</li>
          <li><strong>持久化存储:</strong> 在组件重新渲染之间保持值</li>
          <li><strong>不触发更新:</strong> 修改 ref.current 不会导致重新渲染</li>
          <li><strong>可变引用:</strong> 可以存储任何可变值</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicRefExamples;