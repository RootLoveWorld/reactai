import React, { useState } from 'react';
import BasicEffectExample from './BasicEffectExample';
import DependencyArrayExample from './DependencyArrayExample';
import CleanupExample from './CleanupExample';
import ConditionalEffectExample from './ConditionalEffectExample';
import DataFetchingExample from './DataFetchingExample';

const UseEffectExample: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div style={{
      background: 'white',
      border: '2px solid #6f42c1',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#6f42c1' }}>
        🔄 useEffect 深入浅出
      </h3>

      <BasicEffectExample onLog={addLog} />
      <DependencyArrayExample onLog={addLog} />
      <CleanupExample onLog={addLog} />
      <ConditionalEffectExample onLog={addLog} />
      <DataFetchingExample onLog={addLog} />

      {/* 日志显示 */}
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, color: '#495057' }}>
            📊 Effect 执行日志
          </h4>
          <button 
            onClick={clearLogs} 
            className="button" 
            style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#dc3545' }}
          >
            清空日志
          </button>
        </div>

        <div style={{
          background: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '10px',
          maxHeight: '200px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          {logs.length === 0 ? (
            <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>
              暂无执行日志，与上面的示例互动查看 Effect 的执行过程...
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ 
                marginBottom: '4px', 
                color: '#495057',
                borderBottom: index < logs.length - 1 ? '1px solid #eee' : 'none',
                paddingBottom: '4px'
              }}>
                {log}
              </div>
            ))
          )}
        </div>

        <p style={{ 
          margin: '10px 0 0 0', 
          fontSize: '12px', 
          color: '#666',
          fontStyle: 'italic' 
        }}>
          💡 通过日志观察不同类型的 useEffect 何时执行、如何执行
        </p>
      </div>
    </div>
  );
};

export default UseEffectExample;