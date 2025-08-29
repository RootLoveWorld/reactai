import React, { useState, startTransition } from 'react';

interface TransitionExampleProps {
  onLog: (message: string) => void;
}

const TransitionExample: React.FC<TransitionExampleProps> = ({ onLog }) => {
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  // 模拟生成大量数据的昂贵操作
  const generateList = (value: string) => {
    const items: string[] = [];
    for (let i = 0; i < 20000; i++) {
      items.push(`${value} - 项目 ${i + 1}`);
    }
    return items;
  };

  // 不使用 Transition 的普通更新（会阻塞 UI）
  const handleNormalUpdate = () => {
    const startTime = performance.now();
    onLog('🐌 开始普通更新（可能会阻塞 UI）');
    
    setList(generateList(inputValue));
    
    const endTime = performance.now();
    onLog(`🐌 普通更新完成，耗时: ${(endTime - startTime).toFixed(2)}ms`);
  };

  // 使用 startTransition 的并发更新
  const handleTransitionUpdate = () => {
    const startTime = performance.now();
    setIsPending(true);
    onLog('🚀 开始 Transition 更新（不会阻塞 UI）');

    startTransition(() => {
      setList(generateList(inputValue));
      setIsPending(false);
      
      const endTime = performance.now();
      onLog(`🚀 Transition 更新完成，耗时: ${(endTime - startTime).toFixed(2)}ms`);
    });
  };

  const clearList = () => {
    setList([]);
    onLog('🧹 列表已清空');
  };

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
        1. startTransition 示例
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入一些文本来生成列表..."
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <button 
            onClick={handleNormalUpdate}
            disabled={!inputValue.trim()}
            className="button" 
            style={{ 
              fontSize: '14px', 
              padding: '6px 12px',
              backgroundColor: '#dc3545'
            }}
          >
            🐌 普通更新 (可能阻塞)
          </button>
          <button 
            onClick={handleTransitionUpdate}
            disabled={!inputValue.trim() || isPending}
            className="button" 
            style={{ 
              fontSize: '14px', 
              padding: '6px 12px',
              backgroundColor: '#28a745'
            }}
          >
            {isPending ? '⏳ 更新中...' : '🚀 Transition 更新'}
          </button>
          <button 
            onClick={clearList}
            className="button" 
            style={{ fontSize: '14px', padding: '6px 12px', backgroundColor: '#6c757d' }}
          >
            🧹 清空列表
          </button>
        </div>

        {isPending && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            padding: '8px',
            marginBottom: '10px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
              ⏳ 正在使用 Transition 更新，UI 保持响应...
            </p>
          </div>
        )}

        <div style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          height: '150px',
          overflowY: 'auto',
          background: 'white',
          padding: '10px'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
            列表项数量: {list.length}
          </p>
          {list.length === 0 ? (
            <p style={{ margin: 0, color: '#999', fontStyle: 'italic' }}>
              暂无数据，输入文本并点击按钮生成列表
            </p>
          ) : (
            <div>
              {list.slice(0, 10).map((item, index) => (
                <div key={index} style={{ 
                  padding: '2px 0', 
                  fontSize: '12px',
                  borderBottom: '1px solid #eee'
                }}>
                  {item}
                </div>
              ))}
              {list.length > 10 && (
                <div style={{ padding: '5px 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                  ... 还有 {list.length - 10} 项
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransitionExample;