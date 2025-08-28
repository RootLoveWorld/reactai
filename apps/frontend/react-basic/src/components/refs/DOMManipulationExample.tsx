import React, { useRef } from 'react';

interface DOMManipulationExampleProps {
  onLog: (message: string) => void;
}

const DOMManipulationExample: React.FC<DOMManipulationExampleProps> = ({ onLog }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#e7f3ff';
      onLog('输入框获得焦点');
    }
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.style.backgroundColor = '';
      onLog('输入框内容已清空');
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
      onLog('滚动到顶部');
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      onLog('滚动到底部');
    }
  };

  return (
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
  );
};

export default DOMManipulationExample;