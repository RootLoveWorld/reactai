import React, { useEffect, useState } from 'react';

interface BasicEffectExampleProps {
  onLog: (message: string) => void;
}

const BasicEffectExample: React.FC<BasicEffectExampleProps> = ({ onLog }) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 1. 每次渲染都执行（无依赖数组）
  useEffect(() => {
    onLog(`组件渲染了，当前 count: ${count}`);
  });

  // 2. 仅在组件挂载时执行（空依赖数组）
  useEffect(() => {
    setMounted(true);
    onLog('组件已挂载 - 这个 effect 只会执行一次');
  }, []);

  // 3. 当 count 改变时执行（有依赖）
  useEffect(() => {
    if (count > 0) {
      onLog(`Count 变化了: ${count}`);
    }
  }, [count]);

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
        1. 基础 useEffect 用法
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
          组件状态: {mounted ? '✅ 已挂载' : '⏳ 挂载中'}
        </p>
        <p style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
          计数器: {count}
        </p>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setCount(c => c + 1)} 
            className="button" 
            style={{ fontSize: '14px', padding: '6px 12px' }}
          >
            ➕ 增加
          </button>
          <button 
            onClick={() => setCount(c => c - 1)} 
            className="button" 
            style={{ fontSize: '14px', padding: '6px 12px', backgroundColor: '#dc3545' }}
          >
            ➖ 减少
          </button>
          <button 
            onClick={() => setCount(0)} 
            className="button" 
            style={{ fontSize: '14px', padding: '6px 12px', backgroundColor: '#6c757d' }}
          >
            🔄 重置
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicEffectExample;