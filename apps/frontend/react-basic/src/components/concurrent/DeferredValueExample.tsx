import React, { useState, useDeferredValue, useMemo } from 'react';

interface DeferredValueExampleProps {
  onLog: (message: string) => void;
}

// 模拟一个昂贵的计算组件
const ExpensiveList: React.FC<{ query: string; isDeferred?: boolean }> = ({ query, isDeferred = false }) => {
  const startTime = performance.now();
  
  // 模拟昂贵的计算 - 过滤和排序
  const expensiveData = useMemo(() => {
    const items: string[] = [];
    
    // 生成大量数据
    for (let i = 0; i < 50000; i++) {
      items.push(`数据项 ${i + 1}: ${Math.random().toString(36).substring(7)}`);
    }
    
    // 根据查询过滤
    const filtered = items.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );
    
    // 模拟更多计算
    for (let i = 0; i < 100000; i++) {
      Math.random();
    }
    
    return filtered.slice(0, 100); // 只返回前100项
  }, [query]);

  const endTime = performance.now();
  const renderTime = (endTime - startTime).toFixed(2);

  return (
    <div style={{
      border: `2px solid ${isDeferred ? '#28a745' : '#dc3545'}`,
      borderRadius: '4px',
      padding: '10px',
      height: '150px',
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
          {isDeferred ? '🚀 延迟计算' : '🐌 直接计算'} | 
          渲染时间: {renderTime}ms | 
          结果: {expensiveData.length} 项
        </p>
      </div>
      {expensiveData.length === 0 ? (
        <p style={{ margin: 0, color: '#999', fontStyle: 'italic' }}>
          未找到匹配的数据
        </p>
      ) : (
        expensiveData.map((item, index) => (
          <div key={index} style={{ 
            padding: '2px 0', 
            fontSize: '11px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            {item}
          </div>
        ))
      )}
    </div>
  );
};

const DeferredValueExample: React.FC<DeferredValueExampleProps> = ({ onLog }) => {
  const [query, setQuery] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  
  // 延迟的查询值 - 这个值会在用户停止输入后更新
  const deferredQuery = useDeferredValue(query);
  
  // 检测是否正在延迟
  const isStale = query !== deferredQuery;

  const handleInputChange = (value: string) => {
    setQuery(value);
    onLog(`💬 输入更新: "${value}"`);
    
    if (value !== deferredQuery) {
      onLog('⏳ useDeferredValue 正在延迟更新...');
    }
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
    onLog(`👁️ ${!showComparison ? '显示' : '隐藏'}对比视图`);
  };

  return (
    <div style={{
      background: '#f0f8ff',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#1e5799' }}>
        2. useDeferredValue 示例
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="输入搜索内容（尝试快速输入）..."
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#666' }}>
                当前输入: "{query}" | 延迟值: "{deferredQuery}"
              </span>
              {isStale && (
                <span style={{ 
                  marginLeft: '10px',
                  padding: '2px 6px',
                  background: '#fff3cd',
                  borderRadius: '3px',
                  fontSize: '12px',
                  color: '#856404'
                }}>
                  ⏳ 正在延迟...
                </span>
              )}
            </div>
            
            <button 
              onClick={toggleComparison}
              className="button" 
              style={{ 
                fontSize: '12px', 
                padding: '4px 8px',
                backgroundColor: '#17a2b8'
              }}
            >
              {showComparison ? '隐藏对比' : '显示对比'}
            </button>
          </div>
        </div>

        {showComparison ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <h5 style={{ margin: '0 0 5px 0', color: '#dc3545' }}>🐌 直接计算 (可能卡顿)</h5>
              <ExpensiveList query={query} isDeferred={false} />
            </div>
            <div>
              <h5 style={{ margin: '0 0 5px 0', color: '#28a745' }}>🚀 延迟计算 (保持流畅)</h5>
              <ExpensiveList query={deferredQuery} isDeferred={true} />
            </div>
          </div>
        ) : (
          <div>
            <h5 style={{ margin: '0 0 5px 0', color: '#28a745' }}>🚀 使用 useDeferredValue 的计算结果</h5>
            <ExpensiveList query={deferredQuery} isDeferred={true} />
          </div>
        )}

        <div style={{
          background: '#e2f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '4px',
          padding: '10px',
          marginTop: '10px'
        }}>
          <h6 style={{ margin: '0 0 5px 0', color: '#0066cc' }}>💡 工作原理</h6>
          <ul style={{ fontSize: '12px', color: '#004499', margin: 0, paddingLeft: '15px' }}>
            <li>useDeferredValue 延迟非紧急状态更新</li>
            <li>输入框立即响应用户输入（高优先级）</li>
            <li>昂贵的列表计算使用延迟值（低优先级）</li>
            <li>在用户快速输入时，列表更新会被延迟，保持 UI 流畅</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeferredValueExample;