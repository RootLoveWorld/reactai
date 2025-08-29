import React, { useState, Suspense, lazy } from 'react';

interface SuspenseExampleProps {
  onLog: (message: string) => void;
}

// 模拟一个需要加载时间的组件
const LazyComponent = lazy(() => {
  return new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            padding: '15px',
            margin: '10px 0'
          }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#155724' }}>
              🎉 懒加载组件加载成功！
            </h5>
            <p style={{ margin: 0, fontSize: '14px', color: '#155724' }}>
              这个组件是通过 React.lazy() 动态加载的，
              在首次需要时才会加载对应的代码。
            </p>
          </div>
        )
      });
    }, 2000); // 2秒延迟模拟加载时间
  });
});

// 模拟数据获取的组件
const DataFetchingComponent: React.FC<{ delay: number }> = ({ delay }) => {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 模拟数据获取
  React.useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      try {
        // 模拟网络请求
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (!cancelled) {
          setData(`数据加载成功！延迟 ${delay}ms`);
        }
      } catch (err) {
        if (!cancelled) {
          setError('数据加载失败');
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [delay]);

  if (error) {
    return (
      <div style={{ color: '#dc3545', padding: '10px' }}>
        ❌ {error}
      </div>
    );
  }

  if (!data) {
    // 这里可能会触发 Suspense（在真实的数据获取场景中）
    throw new Promise(resolve => setTimeout(resolve, delay));
  }

  return (
    <div style={{
      background: '#d1ecf1',
      border: '1px solid #bee5eb',
      borderRadius: '4px',
      padding: '10px'
    }}>
      <p style={{ margin: 0, color: '#0c5460' }}>
        📊 {data}
      </p>
    </div>
  );
};

// 加载状态组件
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = '加载中...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    background: '#f8f9fa',
    border: '1px dashed #dee2e6',
    borderRadius: '4px',
    minHeight: '80px'
  }}>
    <div style={{
      width: '30px',
      height: '30px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #007bff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '10px'
    }}></div>
    <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
      ⏳ {message}
    </p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: (error: string) => void },
  { hasError: boolean; error: string | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(`组件加载出错: ${error.message}`);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          padding: '15px'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#721c24' }}>
            ❌ 组件加载失败
          </h5>
          <p style={{ margin: 0, fontSize: '14px', color: '#721c24' }}>
            {this.state.error}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const SuspenseExample: React.FC<SuspenseExampleProps> = ({ onLog }) => {
  const [showLazyComponent, setShowLazyComponent] = useState(false);
  const [showDataComponent, setShowDataComponent] = useState(false);
  const [dataDelay, setDataDelay] = useState(1000);

  const loadLazyComponent = () => {
    setShowLazyComponent(true);
    onLog('🚀 开始加载懒加载组件...');
  };

  const loadDataComponent = () => {
    setShowDataComponent(true);
    onLog(`📊 开始加载数据组件 (延迟 ${dataDelay}ms)...`);
  };

  const resetComponents = () => {
    setShowLazyComponent(false);
    setShowDataComponent(false);
    onLog('🔄 重置所有组件');
  };

  return (
    <div style={{
      background: '#fff8e1',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#e65100' }}>
        3. Suspense 示例
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
          <button 
            onClick={loadLazyComponent}
            disabled={showLazyComponent}
            className="button" 
            style={{ 
              fontSize: '14px', 
              padding: '6px 12px',
              backgroundColor: '#ff9800'
            }}
          >
            {showLazyComponent ? '✅ 已加载' : '📦 加载懒加载组件'}
          </button>
          
          <button 
            onClick={loadDataComponent}
            disabled={showDataComponent}
            className="button" 
            style={{ 
              fontSize: '14px', 
              padding: '6px 12px',
              backgroundColor: '#2196f3'
            }}
          >
            {showDataComponent ? '✅ 已加载' : '📊 加载数据组件'}
          </button>

          <button 
            onClick={resetComponents}
            className="button" 
            style={{ fontSize: '14px', padding: '6px 12px', backgroundColor: '#6c757d' }}
          >
            🔄 重置
          </button>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
            数据加载延迟:
          </label>
          <select 
            value={dataDelay} 
            onChange={(e) => setDataDelay(Number(e.target.value))}
            style={{ padding: '4px', borderRadius: '3px', border: '1px solid #ddd' }}
          >
            <option value={500}>500ms</option>
            <option value={1000}>1000ms</option>
            <option value={2000}>2000ms</option>
            <option value={3000}>3000ms</option>
          </select>
        </div>

        {/* 懒加载组件示例 */}
        <div style={{ marginBottom: '15px' }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#e65100' }}>
            📦 React.lazy() + Suspense
          </h5>
          <ErrorBoundary onError={onLog}>
            <Suspense fallback={<LoadingSpinner message="正在加载懒加载组件..." />}>
              {showLazyComponent && <LazyComponent />}
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* 数据获取示例 */}
        <div style={{ marginBottom: '15px' }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#e65100' }}>
            📊 数据获取 + Suspense
          </h5>
          <ErrorBoundary onError={onLog}>
            <Suspense fallback={<LoadingSpinner message="正在获取数据..." />}>
              {showDataComponent && <DataFetchingComponent delay={dataDelay} />}
            </Suspense>
          </ErrorBoundary>
        </div>

        <div style={{
          background: '#e2f3ff',
          border: '1px solid #b3d9ff',
          borderRadius: '4px',
          padding: '10px'
        }}>
          <h6 style={{ margin: '0 0 5px 0', color: '#0066cc' }}>💡 Suspense 特性</h6>
          <ul style={{ fontSize: '12px', color: '#004499', margin: 0, paddingLeft: '15px' }}>
            <li><strong>代码分割:</strong> React.lazy() 实现组件的懒加载</li>
            <li><strong>加载状态:</strong> Suspense 统一处理加载状态显示</li>
            <li><strong>错误处理:</strong> 配合 ErrorBoundary 处理加载错误</li>
            <li><strong>用户体验:</strong> 避免空白页面，提供统一的加载体验</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuspenseExample;