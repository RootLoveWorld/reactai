import React, { useRef, useState, useEffect } from 'react';

interface MutableValueExampleProps {
  onLog: (message: string) => void;
}

const MutableValueExample: React.FC<MutableValueExampleProps> = ({ onLog }) => {
  const countRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const [stateCount, setStateCount] = useState(0);

  const incrementRefCount = () => {
    countRef.current += 1;
    onLog(`Ref 计数器: ${countRef.current} (组件不会重新渲染)`);
  };

  const incrementStateCount = () => {
    setStateCount(prev => prev + 1);
    onLog(`State 计数器: ${stateCount + 1} (组件会重新渲染)`);
  };

  const startTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    
    timerRef.current = window.setInterval(() => {
      countRef.current += 1;
      onLog(`定时器 Ref 计数: ${countRef.current}`);
    }, 1000);
    
    onLog('定时器已启动');
  };

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
      onLog('定时器已停止');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div style={{
      background: '#fff8dc',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#b8860b' }}>
        2. 存储可变值（不触发重新渲染）
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '15px',
        marginBottom: '15px'
      }}>
        <div style={{
          padding: '15px',
          background: 'white',
          borderRadius: '4px',
          border: '1px solid #ffd700'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#b8860b' }}>Ref 计数器</h5>
          <p style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
            {countRef.current}
          </p>
          <button onClick={incrementRefCount} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
            增加 Ref 计数
          </button>
        </div>

        <div style={{
          padding: '15px',
          background: 'white',
          borderRadius: '4px',
          border: '1px solid #ffd700'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#b8860b' }}>State 计数器</h5>
          <p style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: 'bold' }}>
            {stateCount}
          </p>
          <button onClick={incrementStateCount} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
            增加 State 计数
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={startTimer} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
          ⏰ 启动定时器
        </button>
        <button onClick={stopTimer} className="button" style={{ fontSize: '14px', padding: '6px 12px' }}>
          ⏹️ 停止定时器
        </button>
      </div>
    </div>
  );
};

export default MutableValueExample;