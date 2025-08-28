import React, { createContext, useContext, useState, ReactNode } from 'react';

/* eslint-disable react-refresh/only-export-components */

// 定义主题类型
export type Theme = 'light' | 'dark' | 'blue';

// 定义用户偏好接口
export interface UserPreferences {
  theme: Theme;
  language: 'zh' | 'en';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}

// 定义Context的值类型
interface AppContextType {
  preferences: UserPreferences;
  updateTheme: (theme: Theme) => void;
  updateLanguage: (language: 'zh' | 'en') => void;
  updateFontSize: (fontSize: 'small' | 'medium' | 'large') => void;
  toggleNotifications: () => void;
  resetPreferences: () => void;
}

// 创建Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// 默认用户偏好
const defaultPreferences: UserPreferences = {
  theme: 'light',
  language: 'zh',
  fontSize: 'medium',
  notifications: true
};

// Context Provider组件
interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // 更新主题
  const updateTheme = (theme: Theme) => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  // 更新语言
  const updateLanguage = (language: 'zh' | 'en') => {
    setPreferences(prev => ({ ...prev, language }));
  };

  // 更新字体大小
  const updateFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    setPreferences(prev => ({ ...prev, fontSize }));
  };

  // 切换通知开关
  const toggleNotifications = () => {
    setPreferences(prev => ({ ...prev, notifications: !prev.notifications }));
  };

  // 重置偏好设置
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  const contextValue: AppContextType = {
    preferences,
    updateTheme,
    updateLanguage,
    updateFontSize,
    toggleNotifications,
    resetPreferences
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// 自定义Hook，用于消费Context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

// 导出Context以便在其他地方使用
export { AppContext };