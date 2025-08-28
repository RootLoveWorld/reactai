import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const UserProfile: React.FC = () => {
  const { preferences } = useAppContext();

  // 模拟用户数据
  const userData = {
    name: preferences.language === 'zh' ? '张三' : 'John Doe',
    email: preferences.language === 'zh' ? 'zhangsan@example.com' : 'john.doe@example.com',
    role: preferences.language === 'zh' ? '前端开发工程师' : 'Frontend Developer',
    joinDate: preferences.language === 'zh' ? '2023年1月' : 'January 2023'
  };

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      transition: 'all 0.3s ease'
    };

    switch (preferences.theme) {
      case 'dark':
        return {
          ...baseStyle,
          backgroundColor: '#495057',
          color: 'white',
          border: '2px solid #6c757d'
        };
      case 'blue':
        return {
          ...baseStyle,
          backgroundColor: '#e7f3ff',
          color: '#004085',
          border: '2px solid #007acc'
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: 'white',
          color: '#333',
          border: '2px solid #28a745'
        };
    }
  };

  const getAvatarStyle = () => {
    const baseStyle = {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      fontWeight: 'bold'
    };

    switch (preferences.theme) {
      case 'dark':
        return {
          ...baseStyle,
          backgroundColor: '#6c757d',
          color: 'white'
        };
      case 'blue':
        return {
          ...baseStyle,
          backgroundColor: '#007acc',
          color: 'white'
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: '#28a745',
          color: 'white'
        };
    }
  };

  const getFontSize = () => {
    switch (preferences.fontSize) {
      case 'small':
        return { base: '14px', title: '18px' };
      case 'large':
        return { base: '18px', title: '24px' };
      default:
        return { base: '16px', title: '20px' };
    }
  };

  const fontSize = getFontSize();

  return (
    <div style={getCardStyle()}>
      <div style={getAvatarStyle()}>
        👤
      </div>
      
      <div style={{ flex: 1, fontSize: fontSize.base }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: fontSize.title,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          👋 {preferences.language === 'zh' ? '用户资料' : 'User Profile'}
          {preferences.notifications && (
            <span style={{
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {preferences.language === 'zh' ? '新消息' : 'New'}
            </span>
          )}
        </h3>
        
        <div style={{ marginBottom: '8px' }}>
          <strong>{preferences.language === 'zh' ? '姓名:' : 'Name:'}</strong> {userData.name}
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <strong>{preferences.language === 'zh' ? '邮箱:' : 'Email:'}</strong> {userData.email}
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <strong>{preferences.language === 'zh' ? '职位:' : 'Role:'}</strong> {userData.role}
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <strong>{preferences.language === 'zh' ? '入职时间:' : 'Join Date:'}</strong> {userData.joinDate}
        </div>

        <div style={{
          marginTop: '15px',
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: preferences.theme === 'dark' ? '#343a40' : 
                          preferences.theme === 'blue' ? '#cce7ff' : '#f8f9fa',
          fontSize: fontSize.base
        }}>
          💡 {preferences.language === 'zh' 
            ? '这个组件通过 useAppContext Hook 获取用户偏好设置，并根据设置动态调整显示内容和样式。'
            : 'This component uses the useAppContext Hook to get user preferences and dynamically adjusts content and styling.'}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;