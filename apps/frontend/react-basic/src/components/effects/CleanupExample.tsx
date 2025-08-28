import React, { useEffect, useState } from 'react';

interface CleanupExampleProps {
  onLog: (message: string) => void;
}

const CleanupExample: React.FC<CleanupExampleProps> = ({ onLog }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 定时器 - 需要清理
  useEffect(() => {
    let intervalId: number | null = null;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      
      onLog('⏱️ 定时器已启动');
    }

    // 清理函数
    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        onLog('🧹 定时器已清理');
      }
    };
  }, [isRunning, onLog]);

  // 窗口大小监听器 - 需要清理
  useEffect(() => {
    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      setWindowSize(newSize);
      onLog(`📐 窗口大小变化: ${newSize.width}x${newSize.height}`);
    };

    window.addEventListener('resize', handleResize);
    onLog('👂 窗口大小监听器已添加');

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      onLog('🧹 窗口监听器已移除');
    };
  }, [onLog]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{
      background: '#f0f8f0',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#2d7a2d' }}>
        3. Effect 清理示例
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <div style={{
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px',
          border: '1px solid #c3e6c3'
        }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
            ⏱️ 计时器: {seconds} 秒
          </p>
          <p style={{ margin: '0 0 10px 0' }}>
            状态: {isRunning ? '🟢 运行中' : '🔴 已停止'}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={toggleTimer} 
              className="button" 
              style={{ 
                fontSize: '14px', 
                padding: '6px 12px',
                backgroundColor: isRunning ? '#dc3545' : '#28a745'
              }}
            >
              {isRunning ? '⏸️ 停止' : '▶️ 开始'}
            </button>
            <button 
              onClick={resetTimer} 
              className="button" 
              style={{ fontSize: '14px', padding: '6px 12px', backgroundColor: '#6c757d' }}
            >
              🔄 重置
            </button>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #c3e6c3'
        }}>
          <p style={{ margin: '0', fontSize: '14px' }}>
            📐 窗口大小: {windowSize.width} x {windowSize.height}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
            尝试调整浏览器窗口大小查看效果
          </p>
        </div>
      </div>
    </div>
  );
};

export default CleanupExample;