import React from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'home', label: '🏠 主页', description: 'Home Page' },
    { id: 'controlled', label: '🎛️ 受控组件', description: 'Controlled Components' },
    { id: 'uncontrolled', label: '🔗 非受控组件', description: 'Uncontrolled Components' },
    { id: 'state-lifting', label: '🚀 状态提升', description: 'State Lifting' },
    { id: 'context', label: '🌐 Context API', description: 'Global State Management' },
    { id: 'useReducer', label: '🎛️ useReducer', description: 'Complex State Logic' },
    { id: 'refs', label: '🔗 Refs', description: 'DOM References' }
  ];

  return (
    <nav style={{
      backgroundColor: '#007acc',
      color: 'white',
      padding: '0',
      marginBottom: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>
          React 组件通信示例合集
        </h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
          React Component Communication Examples
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        padding: '0',
        overflowX: 'auto'
      }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            style={{
              background: currentPage === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '15px 20px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
              borderBottom: currentPage === item.id ? '3px solid white' : '3px solid transparent',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== item.id) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== item.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.label}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;