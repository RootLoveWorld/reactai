import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const ThemeDisplay: React.FC = () => {
  const { preferences } = useAppContext();

  // 根据主题设置样式
  const getThemeStyles = () => {
    switch (preferences.theme) {
      case 'dark':
        return {
          backgroundColor: '#343a40',
          color: 'white',
          border: '2px solid #6c757d'
        };
      case 'blue':
        return {
          backgroundColor: '#007acc',
          color: 'white',
          border: '2px solid #0056b3'
        };
      default:
        return {
          backgroundColor: '#f8f9fa',
          color: '#333',
          border: '2px solid #dee2e6'
        };
    }
  };

  // 根据字体大小设置
  const getFontSize = () => {
    switch (preferences.fontSize) {
      case 'small':
        return '14px';
      case 'large':
        return '18px';
      default:
        return '16px';
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div style={{
      ...themeStyles,
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      fontSize: getFontSize(),
      transition: 'all 0.3s ease'
    }}>
      <h3 style={{ margin: '0 0 15px 0' }}>
        🎭 主题预览 (Theme Preview)
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>当前主题:</strong> {preferences.theme === 'light' ? '浅色主题' : 
                                preferences.theme === 'dark' ? '深色主题' : '蓝色主题'}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>语言设置:</strong> {preferences.language === 'zh' ? '中文' : 'English'}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>字体大小:</strong> {preferences.fontSize === 'small' ? '小号' : 
                                preferences.fontSize === 'large' ? '大号' : '中号'}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>通知状态:</strong> {preferences.notifications ? '🔔 已启用' : '🔕 已禁用'}
      </div>

      <div style={{
        padding: '15px',
        borderRadius: '4px',
        backgroundColor: preferences.theme === 'dark' ? '#495057' : 
                        preferences.theme === 'blue' ? '#0056b3' : '#e9ecef',
        marginTop: '15px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>📱 示例内容</h4>
        <p style={{ margin: 0, lineHeight: '1.6' }}>
          这是一个示例文本，展示当前主题和字体设置的效果。
          Context API 让我们可以在任何深度的组件中访问这些全局状态，
          而不需要通过 props 层层传递。
        </p>
      </div>
    </div>
  );
};

export default ThemeDisplay;