import React, { useState, useRef, useEffect, useCallback } from 'react';

interface RenderCycleDemoProps {
  onLog: (message: string) => void;
}

const RenderCycleDemo: React.FC<RenderCycleDemoProps> = ({ onLog }) => {
  // 状态管理
  const [triggerCount, setTriggerCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // ref 存储各种数据
  const renderCount = useRef(0);
  const componentId = useRef(Math.random().toString(36).substr(2, 9));
  const creationTime = useRef(new Date().toISOString());
  const renderTimes = useRef<number[]>([]);
  const previousProps = useRef<any>({});
  const expensiveComputationCache = useRef<Map<string, any>>(new Map());
  
  // 函数引用持久性测试
  const persistentFunction = useRef<(() => void) | null>(null);
  const [normalFunction, setNormalFunction] = useState<(() => void) | null>(null);

  // 记录每次渲染
  const currentRenderTime = performance.now();
  renderCount.current += 1;
  renderTimes.current.push(currentRenderTime);

  // 初始化持久函数（只在第一次渲染时创建）
  if (!persistentFunction.current) {
    persistentFunction.current = () => {
      onLog(`🎯 持久函数被调用 - 组件ID: ${componentId.current}`);
    };
  }

  // 每次渲染都创建新函数
  useEffect(() => {
    setNormalFunction(() => () => {
      onLog(`🆕 普通函数被调用 - 渲染次数: ${renderCount.current}`);
    });
  });

  // 昂贵计算的缓存示例
  const expensiveComputation = useCallback((input: string) => {
    if (expensiveComputationCache.current.has(input)) {
      onLog(`💾 从缓存获取结果: ${input}`);
      return expensiveComputationCache.current.get(input);
    }

    // 模拟昂贵计算
    const start = performance.now();
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    const end = performance.now();
    
    const computationResult = {
      input,
      result: result.toFixed(6),
      computeTime: end - start
    };
    
    expensiveComputationCache.current.set(input, computationResult);
    onLog(`🧮 计算完成: ${input} (耗时: ${computationResult.computeTime.toFixed(2)}ms)`);
    
    return computationResult;
  }, [onLog]);

  // 组件生命周期日志
  useEffect(() => {
    onLog(`🎬 组件挂载 - ID: ${componentId.current}, 创建时间: ${creationTime.current}`);
    
    return () => {
      onLog(`💀 组件卸载 - ID: ${componentId.current}`);
    };
  }, [onLog]);

  // 渲染日志
  useEffect(() => {
    if (renderCount.current > 1) {
      const avgRenderTime = renderTimes.current.length > 1 
        ? renderTimes.current.slice(-5).reduce((sum, time, index, arr) => {
            if (index === 0) return 0;
            return sum + (time - arr[index - 1]);
          }, 0) / Math.max(1, renderTimes.current.slice(-5).length - 1)
        : 0;
      
      onLog(`🔄 渲染 #${renderCount.current} - 平均间隔: ${avgRenderTime.toFixed(2)}ms`);
    }
  });

  // 触发重渲染
  const triggerRerender = () => {
    setTriggerCount(prev => prev + 1);
    onLog(`🔥 手动触发重渲染 #${triggerCount + 1}`);
  };

  // 切换组件可见性（测试挂载/卸载）
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
    onLog(`👁️ 切换组件可见性: ${!isVisible ? '显示' : '隐藏'}`);
  };

  // 测试函数引用
  const testFunctionReferences = () => {
    onLog('🧪 测试函数引用持久性:');
    
    if (persistentFunction.current) {
      persistentFunction.current();
    }
    
    if (normalFunction) {
      normalFunction();
    }
    
    onLog(`🔗 持久函数引用保持不变: ${persistentFunction.current !== null}`);
    onLog(`🆕 普通函数每次渲染都是新的引用`);
  };

  // 测试缓存
  const testCache = () => {
    const inputs = ['test1', 'test2', 'test1']; // test1 重复，应该使用缓存
    onLog('🧪 开始缓存测试...');
    
    inputs.forEach((input, index) => {
      setTimeout(() => expensiveComputation(input), index * 500);
    });
  };

  // 清除缓存
  const clearCache = () => {
    expensiveComputationCache.current.clear();
    onLog('🗑️ 缓存已清除');
  };

  // 显示内存使用情况
  const showMemoryUsage = () => {
    const cacheSize = expensiveComputationCache.current.size;
    const renderHistorySize = renderTimes.current.length;
    
    onLog('📊 内存使用情况:');
    onLog(`   缓存项数量: ${cacheSize}`);
    onLog(`   渲染历史长度: ${renderHistorySize}`);
    onLog(`   组件生存时间: ${((performance.now() - renderTimes.current[0]) / 1000).toFixed(2)}秒`);
  };

  if (!isVisible) {
    return (
      <div style={{
        background: '#f56565',
        color: 'white',
        padding: '15px',
        borderRadius: '4px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>💀 组件已卸载</h4>
        <button 
          onClick={toggleVisibility}
          className="button" 
          style={{ backgroundColor: 'white', color: '#f56565' }}
        >
          🔄 重新挂载组件
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: '#e6fffa',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#234e52' }}>
        🔄 渲染周期与内存持久性演示
      </h4>

      {/* 组件状态面板 */}
      <div style={{
        background: 'white',
        border: '1px solid #81e6d9',
        borderRadius: '6px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#2c7a7b' }}>📊 组件状态信息</h5>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '10px',
          fontSize: '14px',
          color: '#285e61'
        }}>
          <div>
            <strong>组件 ID:</strong> {componentId.current}
          </div>
          <div>
            <strong>创建时间:</strong> {new Date(creationTime.current).toLocaleTimeString()}
          </div>
          <div>
            <strong>渲染次数:</strong> {renderCount.current}
          </div>
          <div>
            <strong>触发计数:</strong> {triggerCount}
          </div>
          <div>
            <strong>缓存项数:</strong> {expensiveComputationCache.current.size}
          </div>
          <div>
            <strong>存活时长:</strong> {renderTimes.current.length > 0 
              ? `${((performance.now() - renderTimes.current[0]) / 1000).toFixed(1)}秒`
              : '0秒'
            }
          </div>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <button 
            onClick={triggerRerender}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#4299e1' }}
          >
            🔥 触发重渲染
          </button>
          
          <button 
            onClick={toggleVisibility}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#f56565' }}
          >
            💀 卸载组件
          </button>

          <button 
            onClick={testFunctionReferences}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#48bb78' }}
          >
            🧪 测试函数引用
          </button>

          <button 
            onClick={testCache}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#ed8936' }}
          >
            🧮 测试缓存
          </button>

          <button 
            onClick={clearCache}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#9f7aea' }}
          >
            🗑️ 清除缓存
          </button>

          <button 
            onClick={showMemoryUsage}
            className="button" 
            style={{ fontSize: '12px', padding: '6px 12px', backgroundColor: '#38b2ac' }}
          >
            📊 内存使用
          </button>
        </div>
      </div>

      {/* 原理说明 */}
      <div style={{
        background: '#bee3f8',
        border: '1px solid #90cdf4',
        borderRadius: '4px',
        padding: '15px'
      }}>
        <h5 style={{ margin: '0 0 10px 0', color: '#2a4365' }}>🧠 关键原理解析</h5>
        <div style={{ fontSize: '13px', color: '#2c5282', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>1. 内存持久性：</strong> useRef 存储的数据在组件的整个生命周期中保持不变，
            即使组件多次重渲染，ref 对象的引用和内容都会保持持久。
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>2. 渲染独立性：</strong> 修改 ref.current 不会触发组件重新渲染，
            这使得 ref 非常适合存储不需要触发 UI 更新的数据。
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>3. 函数引用缓存：</strong> 通过 ref 可以缓存函数引用，避免每次渲染都创建新函数。
          </div>
          <div>
            <strong>4. 计算结果缓存：</strong> 利用 ref 的持久性可以实现昂贵计算结果的缓存机制。
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderCycleDemo;