import React from 'react';

interface LogDisplayProps {
  logs: string[];
  onClearLogs: () => void;
}

const LogDisplay: React.FC<LogDisplayProps> = ({ logs, onClearLogs }) => {
  return (
    <div style={{
      background: '#f0f8f0',
      padding: '15px',
      borderRadius: '4px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h4 style={{ margin: 0, color: '#2d7a2d' }}>
          📊 操作日志
        </h4>
        <button 
          onClick={onClearLogs} 
          className="button" 
          style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#dc3545' }}
        >
          清空日志
        </button>
      </div>

      <div style={{
        background: 'white',
        border: '1px solid #c3e6c3',
        borderRadius: '4px',
        padding: '10px',
        maxHeight: '200px',
        overflowY: 'auto',
        fontFamily: 'monospace',
        fontSize: '13px'
      }}>
        {logs.length === 0 ? (
          <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>
            暂无操作日志...
          </p>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{ 
              marginBottom: '4px', 
              color: '#1a5a1a',
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
        💡 观察：Ref 操作不会触发组件重新渲染，而 State 操作会触发重新渲染
      </p>
    </div>
  );
};

export default LogDisplay;