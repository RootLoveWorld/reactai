import React, { useState } from 'react';
import DOMManipulationExample from './DOMManipulationExample';
import MutableValueExample from './MutableValueExample';
import LogDisplay from './LogDisplay';

const BasicRefExamples: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // 添加日志
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 清空日志
  const clearLogs = () => {
    setLogs([]);
  };

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

      <DOMManipulationExample onLog={addLog} />
      <MutableValueExample onLog={addLog} />
      <LogDisplay logs={logs} onClearLogs={clearLogs} />

      <div style={{
        background: '#e2f3ff',
        border: '1px solid #b3d9ff',
        borderRadius: '4px',
        padding: '15px',
        marginTop: '20px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>💡 关键概念总结</h4>
        <ul style={{ color: '#004499', margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
          <li><strong>DOM 引用：</strong> 使用 ref 可以直接操作 DOM 元素</li>
          <li><strong>可变值存储：</strong> ref.current 可以存储任何可变值，且不触发重新渲染</li>
          <li><strong>定时器管理：</strong> 使用 ref 存储定时器 ID，便于清理</li>
          <li><strong>性能优化：</strong> 对于不需要触发渲染的值，使用 ref 而不是 state</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicRefExamples;
