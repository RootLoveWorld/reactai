import React from 'react';
import { useAppContext, Theme } from '../contexts/AppContext';

const SettingsPanel: React.FC = () => {
  const { 
    preferences, 
    updateTheme, 
    updateLanguage, 
    updateFontSize, 
    toggleNotifications,
    resetPreferences 
  } = useAppContext();

  const themeOptions: { value: Theme; label: string; color: string }[] = [
    { value: 'light', label: '浅色主题', color: '#f8f9fa' },
    { value: 'dark', label: '深色主题', color: '#343a40' },
    { value: 'blue', label: '蓝色主题', color: '#007acc' }
  ];

  return (
    <div style={{
      background: 'white',
      border: '2px solid #007acc',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#007acc' }}>
        ⚙️ 设置面板 (Settings Panel)
      </h3>

      {/* 主题设置 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
          🎨 主题选择:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {themeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => updateTheme(option.value)}
              style={{
                padding: '8px 16px',
                border: preferences.theme === option.value ? '2px solid #007acc' : '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: preferences.theme === option.value ? option.color : '#f8f9fa',
                color: preferences.theme === option.value && option.value === 'dark' ? 'white' : '#333',
                cursor: 'pointer',
                fontWeight: preferences.theme === option.value ? 'bold' : 'normal'
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 语言设置 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
          🌍 语言设置:
        </label>
        <select
          value={preferences.language}
          onChange={(e) => updateLanguage(e.target.value as 'zh' | 'en')}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: 'white'
          }}
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* 字体大小设置 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
          📝 字体大小:
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => updateFontSize(size as 'small' | 'medium' | 'large')}
              style={{
                padding: '8px 16px',
                border: preferences.fontSize === size ? '2px solid #007acc' : '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: preferences.fontSize === size ? '#e7f3ff' : 'white',
                cursor: 'pointer',
                fontSize: size === 'small' ? '12px' : size === 'large' ? '18px' : '14px'
              }}
            >
              {size === 'small' ? '小' : size === 'large' ? '大' : '中'}
            </button>
          ))}
        </div>
      </div>

      {/* 通知设置 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
          color: '#333'
        }}>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={toggleNotifications}
            style={{ marginRight: '8px', transform: 'scale(1.2)' }}
          />
          🔔 启用通知
        </label>
      </div>

      {/* 重置按钮 */}
      <button
        onClick={resetPreferences}
        style={{
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🔄 重置设置
      </button>
    </div>
  );
};

export default SettingsPanel;