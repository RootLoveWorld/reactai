import React, { useEffect, useState } from 'react';

interface ConditionalEffectExampleProps {
  onLog: (message: string) => void;
}

const ConditionalEffectExample: React.FC<ConditionalEffectExampleProps> = ({ onLog }) => {
  const [user, setUser] = useState<{ id: number; name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [content, setContent] = useState('');

  // 模拟获取用户数据
  const fetchUser = async (userId: number) => {
    setLoading(true);
    onLog(`🔍 开始获取用户 ${userId} 的数据...`);
    
    // 模拟 API 调用
    setTimeout(() => {
      const userData = { id: userId, name: `用户${userId}` };
      setUser(userData);
      setLoading(false);
      onLog(`✅ 用户数据获取成功: ${userData.name}`);
    }, 1000);
  };

  // 条件性 Effect - 仅当有用户时执行
  useEffect(() => {
    if (user) {
      onLog(`👋 欢迎 ${user.name}! 用户已登录`);
      
      // 清理函数
      return () => {
        onLog(`👋 ${user.name} 已退出登录`);
      };
    }
  }, [user, onLog]);

  // 自动保存 Effect - 仅当启用自动保存时执行
  useEffect(() => {
    if (autoSave && content.trim()) {
      const saveTimer = setTimeout(() => {
        const preview = content.length > 20 ? content.substring(0, 20) + '...' : content;
        onLog(`💾 自动保存内容: "${preview}"`);
      }, 2000);

      return () => {
        clearTimeout(saveTimer);
      };
    }
  }, [content, autoSave, onLog]);

  return (
    <div style={{
      background: '#e7f3ff',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#0066cc' }}>
        4. 条件性 Effect 示例
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <div style={{
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px',
          border: '1px solid #b3d9ff'
        }}>
          <h5 style={{ margin: '0 0 10px 0' }}>用户管理</h5>
          <p style={{ margin: '0 0 10px 0' }}>
            当前用户: {loading ? '⏳ 加载中...' : user ? `${user.name} (ID: ${user.id})` : '❌ 未登录'}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => fetchUser(1)} 
              disabled={loading}
              className="button" 
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              登录用户1
            </button>
            <button 
              onClick={() => fetchUser(2)} 
              disabled={loading}
              className="button" 
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              登录用户2
            </button>
            <button 
              onClick={() => setUser(null)} 
              className="button" 
              style={{ fontSize: '12px', padding: '4px 8px', backgroundColor: '#dc3545' }}
            >
              退出登录
            </button>
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #b3d9ff'
        }}>
          <h5 style={{ margin: '0 0 10px 0' }}>自动保存编辑器</h5>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
              启用自动保存 (2秒延迟)
            </label>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="输入一些内容试试自动保存功能..."
            style={{
              width: '100%',
              height: '60px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              resize: 'vertical'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConditionalEffectExample;