import React, { useState, useRef, useEffect } from 'react';

interface UseRefPrinciplesExampleProps {
  onLog: (message: string) => void;
}

// 手动实现的 ref 对象结构，模拟 useRef 内部实现
interface ManualRef<T> {
  current: T;
}

// 模拟 useRef 的底层实现
function createManualRef<T>(initialValue: T): ManualRef<T> {
  // useRef 实际上返回一个具有 current 属性的对象
  // 这个对象在组件的整个生命周期中保持同一个引用
  return { current: initialValue };
}

const UseRefPrinciplesExample: React.FC<UseRefPrinciplesExampleProps> = ({ onLog }) => {
  // === 1. 标准 useRef 使用 ===
  const standardRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);
  
  // === 2. 手动模拟的 ref 对象 ===
  const [manualRefObject] = useState(() => createManualRef<number>(0));
  
  // === 3. 对比 useState 的行为 ===
  const [stateValue, setStateValue] = useState<number>(0);
  
  // === 4. DOM 引用示例 ===
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // 记录渲染次数
  renderCountRef.current += 1;

  // 组件挂载时的日志
  useEffect(() => {
    onLog('🎯 组件挂载 - useRef 原理示例初始化');
    onLog(`📊 初始渲染计数: ${renderCountRef.current}`);
  }, [onLog]);

  // === 演示函数 ===
  
  // 增加 ref 值（不触发重渲染）
  const incrementRef = () => {
    standardRef.current += 1;
    manualRefObject.current += 1;
    onLog(`🔄 ref 值增加 - 标准ref: ${standardRef.current}, 手动ref: ${manualRefObject.current}`);
    onLog('💡 注意：ref 值改变不会触发组件重新渲染');
  };

  // 增加 state 值（触发重渲染）
  const incrementState = () => {
    const newValue = stateValue + 1;
    setStateValue(newValue);
    onLog(`🔄 state 值增加到: ${newValue} - 这会触发重新渲染`);
  };

  // 展示 ref 对象的结构
  const showRefStructure = () => {
    onLog('🔍 ref 对象结构分析:');
    onLog(`   typeof standardRef: ${typeof standardRef}`);
    onLog(`   standardRef.hasOwnProperty('current'): ${standardRef.hasOwnProperty('current')}`);
    onLog(`   Object.keys(standardRef): [${Object.keys(standardRef).join(', ')}]`);
    onLog(`   standardRef === standardRef: ${standardRef === standardRef} (引用相等)`);
    
    // 对比手动创建的对象
    onLog('🔍 手动ref对象结构:');
    onLog(`   typeof manualRefObject: ${typeof manualRefObject}`);
    onLog(`   manualRefObject.hasOwnProperty('current'): ${manualRefObject.hasOwnProperty('current')}`);
  };

  // 测试引用持久性
  const testReferencePersistence = () => {
    onLog('🧪 测试引用持久性:');
    
    // 创建一个新的对象进行比较
    const newObject = { current: 0 };
    onLog(`   新对象 === standardRef: ${newObject === standardRef} (不同引用)`);
    onLog(`   标准ref在重渲染间保持相同引用: true`);
    onLog(`   手动ref在重渲染间保持相同引用: true`);
  };

  // DOM 操作示例
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = '#ffffcc';
      onLog('🎯 通过 ref 操作 DOM - 输入框获得焦点并改变背景色');
    }
  };

  const measureDiv = () => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      onLog(`📏 通过 ref 测量 DOM - 宽度: ${rect.width.toFixed(1)}px, 高度: ${rect.height.toFixed(1)}px`);
    }
  };

  // 重置所有值
  const resetAll = () => {
    standardRef.current = 0;
    manualRefObject.current = 0;
    setStateValue(0);
    if (inputRef.current) {
      inputRef.current.style.backgroundColor = '';
      inputRef.current.value = '';
    }
    onLog('🔄 所有值已重置');
  };

  return (
    <div style={{
      background: '#f0f4f8',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#2d3748' }}>
        🧠 useRef 底层原理深度解析
      </h4>

      {/* 渲染信息显示 */}
      <div style={{
        background: '#edf2f7',
        border: '1px solid #cbd5e0',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '15px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#4a5568' }}>📊 渲染状态监控</h5>
        <div style={{ fontSize: '14px', color: '#2d3748' }}>
          <p style={{ margin: '5px 0' }}>🔢 当前渲染次数: {renderCountRef.current}</p>
          <p style={{ margin: '5px 0' }}>🔧 标准 useRef 值: {standardRef.current}</p>
          <p style={{ margin: '5px 0' }}>🛠️ 手动 ref 值: {manualRefObject.current}</p>
          <p style={{ margin: '5px 0' }}>📈 useState 值: {stateValue}</p>
        </div>
      </div>

      {/* 控制按钮区域 */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <button 
            onClick={incrementRef}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#4299e1' }}
          >
            ➕ 增加 Ref 值
          </button>
          
          <button 
            onClick={incrementState}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#48bb78' }}
          >
            ➕ 增加 State 值
          </button>

          <button 
            onClick={showRefStructure}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#ed8936' }}
          >
            🔍 分析 Ref 结构
          </button>

          <button 
            onClick={testReferencePersistence}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#9f7aea' }}
          >
            🧪 测试引用持久性
          </button>

          <button 
            onClick={resetAll}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 10px', backgroundColor: '#6c757d' }}
          >
            🔄 重置
          </button>
        </div>
      </div>

      {/* DOM 操作示例 */}
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#4a5568' }}>🎯 DOM 引用示例</h5>
        
        <div style={{ marginBottom: '10px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="这是一个受 ref 控制的输入框"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px',
              marginBottom: '8px'
            }}
          />
          
          <div 
            ref={divRef}
            style={{
              background: '#f7fafc',
              border: '2px dashed #a0aec0',
              borderRadius: '4px',
              padding: '15px',
              textAlign: 'center',
              marginBottom: '8px'
            }}
          >
            这是一个可测量的 div 元素
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={focusInput}
            className="button" 
            style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#38b2ac' }}
          >
            🎯 聚焦输入框
          </button>
          
          <button 
            onClick={measureDiv}
            className="button" 
            style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#e53e3e' }}
          >
            📏 测量 Div
          </button>
        </div>
      </div>

      {/* 原理说明 */}
      <div style={{
        background: '#e6fffa',
        border: '1px solid #81e6d9',
        borderRadius: '4px',
        padding: '15px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#234e52' }}>💡 useRef 底层原理</h5>
        <div style={{ fontSize: '13px', color: '#285e61', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>1. 对象结构：</strong> useRef 返回一个包含 current 属性的普通 JavaScript 对象
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>2. 引用持久性：</strong> 在组件的整个生命周期中，useRef 返回相同的对象引用
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>3. 不触发渲染：</strong> 修改 ref.current 不会导致组件重新渲染
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>4. 内存存储：</strong> React 在 fiber 节点中存储 ref 对象，确保跨渲染持久存在
          </p>
          <p style={{ margin: '0' }}>
            <strong>5. DOM 访问：</strong> 提供了访问和操作 DOM 元素的直接方式
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseRefPrinciplesExample;