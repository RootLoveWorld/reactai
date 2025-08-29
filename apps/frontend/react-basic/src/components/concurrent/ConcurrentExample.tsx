import React, { useState } from 'react';
import TransitionExample from './TransitionExample';
import DeferredValueExample from './DeferredValueExample';
import SuspenseExample from './SuspenseExample';
import ConcurrentRenderingExample from './ConcurrentRenderingExample';

// 日志显示组件
const LogDisplay: React.FC<{ logs: string[]; onClearLogs: () => void }> = ({ logs, onClearLogs }) => (
  <div style={{
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    padding: '10px',
    marginTop: '20px'
  }}>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '10px' 
    }}>
      <h4 style={{ margin: 0, color: '#495057' }}>📋 操作日志</h4>
      <button 
        onClick={onClearLogs}
        className="button"
        style={{ 
          fontSize: '12px', 
          padding: '4px 8px',
          backgroundColor: '#6c757d'
        }}
      >
        🧹 清空日志
      </button>
    </div>
    <div style={{
      maxHeight: '200px',
      overflowY: 'auto',
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '3px',
      padding: '8px'
    }}>
      {logs.length === 0 ? (
        <p style={{ margin: 0, color: '#6c757d', fontStyle: 'italic' }}>
          暂无日志记录
        </p>
      ) : (
        logs.map((log, index) => (
          <div key={index} style={{ 
            fontSize: '12px', 
            color: '#495057',
            borderBottom: index < logs.length - 1 ? '1px solid #f0f0f0' : 'none',
            paddingBottom: '2px',
            marginBottom: '2px'
          }}>
            {log}
          </div>
        ))
      )}
    </div>
  </div>
);

const ConcurrentExample: React.FC = () => {
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
      border: '2px solid #9c27b0',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#9c27b0' }}>
        ⚡ React 并发模式示例
      </h3>

      {/* 概述说明 */}
      <div style={{
        background: '#f3e5f5',
        border: '1px solid #e1bee7',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>🎯 什么是并发模式？</h4>
        <p style={{ margin: '0 0 10px 0', color: '#4a148c', lineHeight: '1.6' }}>
          React 并发模式是一组新功能，帮助应用保持响应性，并能根据用户的设备性能和网络速度适当调整。
          通过时间切片、优先级调度等技术，让 React 能够中断、暂停、恢复或放弃渲染工作。
        </p>
        <div style={{ color: '#6a1b9a', fontSize: '14px' }}>
          <strong>核心特性：</strong>
          <span style={{ marginLeft: '10px' }}>🔄 可中断渲染</span>
          <span style={{ marginLeft: '10px' }}>⚡ 优先级调度</span>
          <span style={{ marginLeft: '10px' }}>🎯 时间切片</span>
          <span style={{ marginLeft: '10px' }}>🚀 并发更新</span>
        </div>
      </div>

      {/* 各种并发示例 */}
      <TransitionExample onLog={addLog} />
      <DeferredValueExample onLog={addLog} />
      <SuspenseExample onLog={addLog} />
      <ConcurrentRenderingExample onLog={addLog} />

      {/* 日志显示 */}
      <LogDisplay logs={logs} onClearLogs={clearLogs} />

      {/* 总结和最佳实践 */}
      <div style={{
        background: '#e8f5e8',
        border: '1px solid #c8e6c8',
        borderRadius: '4px',
        padding: '15px',
        marginTop: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#2e7d32' }}>💡 并发模式最佳实践</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
          <div>
            <h5 style={{ margin: '0 0 8px 0', color: '#1b5e20' }}>🔄 使用 startTransition</h5>
            <ul style={{ color: '#2e7d32', margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.5' }}>
              <li>用于标记非紧急的状态更新</li>
              <li>避免昂贵操作阻塞用户交互</li>
              <li>适用于搜索、过滤等场景</li>
            </ul>
          </div>

          <div>
            <h5 style={{ margin: '0 0 8px 0', color: '#1b5e20' }}>⏳ 使用 useDeferredValue</h5>
            <ul style={{ color: '#2e7d32', margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.5' }}>
              <li>延迟不重要的值更新</li>
              <li>保持输入框等重要 UI 的响应性</li>
              <li>适用于实时搜索结果显示</li>
            </ul>
          </div>

          <div>
            <h5 style={{ margin: '0 0 8px 0', color: '#1b5e20' }}>📦 使用 Suspense</h5>
            <ul style={{ color: '#2e7d32', margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.5' }}>
              <li>优雅处理异步组件加载</li>
              <li>统一管理加载状态</li>
              <li>提升代码分割体验</li>
            </ul>
          </div>

          <div>
            <h5 style={{ margin: '0 0 8px 0', color: '#1b5e20' }}>⚡ 性能优化技巧</h5>
            <ul style={{ color: '#2e7d32', margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.5' }}>
              <li>合理设置更新优先级</li>
              <li>避免过度使用 startTransition</li>
              <li>配合 memo 等优化手段</li>
            </ul>
          </div>
        </div>

        <div style={{
          background: '#c8e6c8',
          borderRadius: '4px',
          padding: '10px',
          marginTop: '15px'
        }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#1b5e20' }}>
            <strong>💡 记住：</strong> 并发模式的目标是保持应用的响应性。
            不是所有更新都需要使用并发特性，只在有性能问题或用户体验问题时才使用。
            始终以用户体验为优先考虑。
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConcurrentExample;