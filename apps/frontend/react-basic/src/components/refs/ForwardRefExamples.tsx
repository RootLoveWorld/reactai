import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react';

// 1. 基础 forwardRef 示例 - 自定义输入框组件
interface CustomInputProps {
  label: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, placeholder, onValueChange }, ref) => {
    return (
      <div style={{ marginBottom: '15px' }}>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          onChange={(e) => onValueChange?.(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

// 2. 高级 forwardRef + useImperativeHandle 示例 - 可控制的模态框
interface ModalMethods {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal = forwardRef<ModalMethods, ModalProps>(({ title, children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // 使用 useImperativeHandle 自定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
    isOpen: () => isOpen
  }));

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        minWidth: '300px',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
          paddingBottom: '10px',
          borderBottom: '1px solid #eee'
        }}>
          <h3 style={{ margin: 0, color: '#333' }}>{title}</h3>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

// 3. 复杂组件 - 可聚焦的卡片组件
interface FocusableCardProps {
  title: string;
  content: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
}

const FocusableCard = forwardRef<HTMLDivElement, FocusableCardProps>(
  ({ title, content, variant = 'primary' }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'secondary':
          return { borderColor: '#6c757d', backgroundColor: '#f8f9fa' };
        case 'success':
          return { borderColor: '#28a745', backgroundColor: '#f8fff9' };
        case 'warning':
          return { borderColor: '#ffc107', backgroundColor: '#fffcf0' };
        default:
          return { borderColor: '#007acc', backgroundColor: '#f8faff' };
      }
    };

    const styles = getVariantStyles();

    return (
      <div
        ref={ref}
        tabIndex={0}
        style={{
          border: `2px solid ${styles.borderColor}`,
          backgroundColor: styles.backgroundColor,
          borderRadius: '8px',
          padding: '15px',
          margin: '10px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = `0 0 0 3px ${styles.borderColor}33`;
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = 'none';
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', color: styles.borderColor }}>
          {title}
        </h4>
        <p style={{ margin: 0, color: '#666' }}>
          {content}
        </p>
      </div>
    );
  }
);

FocusableCard.displayName = 'FocusableCard';

// 主组件
const ForwardRefExamples: React.FC = () => {
  // refs for different components
  const customInputRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ModalMethods>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [inputValues, setInputValues] = useState({
    custom: '',
    username: '',
    email: ''
  });

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  // 操作自定义输入框
  const focusCustomInput = () => {
    customInputRef.current?.focus();
    addLog('自定义输入框获得焦点');
  };

  const clearCustomInput = () => {
    if (customInputRef.current) {
      customInputRef.current.value = '';
      setInputValues(prev => ({ ...prev, custom: '' }));
      addLog('自定义输入框已清空');
    }
  };

  // 批量操作表单
  const focusAllInputs = () => {
    customInputRef.current?.focus();
    setTimeout(() => usernameRef.current?.focus(), 1000);
    setTimeout(() => emailRef.current?.focus(), 2000);
    addLog('开始依次聚焦所有输入框');
  };

  const clearAllInputs = () => {
    if (customInputRef.current) customInputRef.current.value = '';
    if (usernameRef.current) usernameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    setInputValues({ custom: '', username: '', email: '' });
    addLog('所有输入框已清空');
  };

  // 操作模态框
  const openModal = () => {
    modalRef.current?.open();
    addLog('模态框已打开');
  };

  const closeModal = () => {
    modalRef.current?.close();
    addLog('模态框已关闭');
  };

  const toggleModal = () => {
    modalRef.current?.toggle();
    const isOpen = modalRef.current?.isOpen();
    addLog(`模态框${isOpen ? '已打开' : '已关闭'}`);
  };

  // 操作卡片
  const focusCard = (cardNumber: number) => {
    switch (cardNumber) {
      case 1:
        card1Ref.current?.focus();
        break;
      case 2:
        card2Ref.current?.focus();
        break;
      case 3:
        card3Ref.current?.focus();
        break;
    }
    addLog(`卡片 ${cardNumber} 获得焦点`);
  };

  const focusAllCards = () => {
    card1Ref.current?.focus();
    setTimeout(() => card2Ref.current?.focus(), 800);
    setTimeout(() => card3Ref.current?.focus(), 1600);
    addLog('开始依次聚焦所有卡片');
  };

  return (
    <div style={{
      background: 'white',
      border: '2px solid #28a745',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#28a745' }}>
        🔄 forwardRef 示例
      </h3>

      {/* 基础 forwardRef 示例 */}
      <div style={{
        background: '#f8fff9',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#28a745' }}>
          1. 基础 forwardRef - 自定义组件
        </h4>

        <CustomInput
          ref={customInputRef}
          label="📝 自定义输入框"
          placeholder="这是一个可以被父组件控制的自定义输入框"
          onValueChange={(value) => setInputValues(prev => ({ ...prev, custom: value }))}
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button onClick={focusCustomInput} className="button" style={{ fontSize: '14px' }}>
            🎯 聚焦
          </button>
          <button onClick={clearCustomInput} className="button" style={{ fontSize: '14px' }}>
            🧹 清空
          </button>
        </div>

        <div style={{
          padding: '10px',
          background: 'white',
          borderRadius: '4px',
          border: '1px solid #d4edda'
        }}>
          <strong>当前值:</strong> {inputValues.custom || '(空)'}
        </div>
      </div>

      {/* 表单组合示例 */}
      <div style={{
        background: '#fff3cd',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#856404' }}>
          2. 表单组合 - 批量操作
        </h4>

        <CustomInput
          ref={usernameRef}
          label="👤 用户名"
          placeholder="请输入用户名"
          onValueChange={(value) => setInputValues(prev => ({ ...prev, username: value }))}
        />

        <CustomInput
          ref={emailRef}
          label="📧 邮箱"
          placeholder="请输入邮箱地址"
          onValueChange={(value) => setInputValues(prev => ({ ...prev, email: value }))}
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button onClick={focusAllInputs} className="button" style={{ backgroundColor: '#ffc107', color: '#333' }}>
            🎯 依次聚焦所有输入框
          </button>
          <button onClick={clearAllInputs} className="button" style={{ backgroundColor: '#ffc107', color: '#333' }}>
            🧹 清空所有输入框
          </button>
        </div>

        <div style={{
          padding: '10px',
          background: 'white',
          borderRadius: '4px',
          border: '1px solid #ffd700'
        }}>
          <div><strong>用户名:</strong> {inputValues.username || '(空)'}</div>
          <div><strong>邮箱:</strong> {inputValues.email || '(空)'}</div>
        </div>
      </div>

      {/* useImperativeHandle 示例 */}
      <div style={{
        background: '#e2f3ff',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#0066cc' }}>
          3. useImperativeHandle - 自定义暴露方法
        </h4>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button onClick={openModal} className="button">
            📖 打开模态框
          </button>
          <button onClick={closeModal} className="button">
            📕 关闭模态框
          </button>
          <button onClick={toggleModal} className="button">
            🔄 切换模态框
          </button>
        </div>

        <Modal ref={modalRef} title="🚀 forwardRef + useImperativeHandle 演示">
          <div>
            <p>这个模态框展示了如何使用 <code>useImperativeHandle</code> 来自定义暴露给父组件的方法。</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>open():</strong> 打开模态框</li>
              <li><strong>close():</strong> 关闭模态框</li>
              <li><strong>toggle():</strong> 切换模态框状态</li>
              <li><strong>isOpen():</strong> 获取当前状态</li>
            </ul>
            <p>父组件可以通过 ref 调用这些方法来控制模态框，而不需要通过 props 传递状态。</p>
          </div>
        </Modal>
      </div>

      {/* 可聚焦卡片示例 */}
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#495057' }}>
          4. 可聚焦组件 - DOM 操作
        </h4>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
          <button onClick={() => focusCard(1)} className="button" style={{ fontSize: '12px' }}>
            聚焦卡片1
          </button>
          <button onClick={() => focusCard(2)} className="button" style={{ fontSize: '12px' }}>
            聚焦卡片2
          </button>
          <button onClick={() => focusCard(3)} className="button" style={{ fontSize: '12px' }}>
            聚焦卡片3
          </button>
          <button onClick={focusAllCards} className="button" style={{ fontSize: '12px' }}>
            🎯 依次聚焦所有卡片
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <FocusableCard
            ref={card1Ref}
            title="📋 卡片1"
            content="这是第一张可聚焦的卡片，点击上方按钮或直接点击卡片来聚焦。"
            variant="primary"
          />
          <FocusableCard
            ref={card2Ref}
            title="🎨 卡片2"
            content="这是第二张卡片，展示了不同的样式变体。"
            variant="success"
          />
          <FocusableCard
            ref={card3Ref}
            title="⚡ 卡片3"
            content="这是第三张卡片，同样可以通过 ref 来控制焦点。"
            variant="warning"
          />
        </div>
      </div>

      {/* 操作日志 */}
      <div style={{
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '4px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#495057' }}>📋 操作日志</h4>
        <div style={{
          maxHeight: '120px',
          overflowY: 'auto',
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          {logs.length === 0 ? (
            <p style={{ margin: 0, color: '#666', fontStyle: 'italic' }}>
              暂无操作记录...
            </p>
          ) : (
            logs.slice(-10).map((log, index) => (
              <div key={index} style={{
                fontSize: '12px',
                color: '#666',
                marginBottom: '3px'
              }}>
                {log}
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => setLogs([])}
          className="button"
          style={{ marginTop: '10px', fontSize: '12px', padding: '4px 8px' }}
        >
          🗑️ 清空日志
        </button>
      </div>

      {/* 说明 */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: '#e8f5e8',
        borderRadius: '4px',
        border: '1px solid #c3e6c3'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#2d7a2d' }}>💡 forwardRef 核心概念:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#1a5a1a', lineHeight: '1.6' }}>
          <li><strong>Ref 传递:</strong> 让父组件访问子组件的 DOM 元素</li>
          <li><strong>封装性:</strong> 保持组件封装的同时提供必要的访问能力</li>
          <li><strong>useImperativeHandle:</strong> 自定义暴露给父组件的方法</li>
          <li><strong>类型安全:</strong> TypeScript 支持严格的类型检查</li>
        </ul>
      </div>
    </div>
  );
};

export default ForwardRefExamples;