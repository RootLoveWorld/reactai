import React, { useEffect, useState } from 'react';

interface DataFetchingExampleProps {
  onLog: (message: string) => void;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const DataFetchingExample: React.FC<DataFetchingExampleProps> = ({ onLog }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // 模拟数据获取
  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    onLog(`📡 开始获取第 ${pageNum} 页数据...`);

    try {
      // 模拟 API 延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟数据
      const mockPosts: Post[] = Array.from({ length: 3 }, (_, i) => ({
        id: (pageNum - 1) * 3 + i + 1,
        title: `文章标题 ${(pageNum - 1) * 3 + i + 1}`,
        body: `这是第 ${pageNum} 页的第 ${i + 1} 篇文章内容...`
      }));

      setPosts(mockPosts);
      onLog(`✅ 成功获取 ${mockPosts.length} 篇文章`);
    } catch (err) {
      setError('获取数据失败');
      onLog('❌ 数据获取失败');
    } finally {
      setLoading(false);
    }
  };

  // 当页码改变时获取数据
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  // 页面离开时的清理
  useEffect(() => {
    return () => {
      onLog('🧹 数据获取组件已卸载');
    };
  }, [onLog]);

  return (
    <div style={{
      background: '#fff5f5',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#c53030' }}>
        5. 数据获取示例
      </h4>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h5 style={{ margin: 0 }}>文章列表 (第 {page} 页)</h5>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))} 
              disabled={page === 1 || loading}
              className="button" 
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              ⬅️ 上一页
            </button>
            <button 
              onClick={() => setPage(p => p + 1)} 
              disabled={loading}
              className="button" 
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              下一页 ➡️
            </button>
          </div>
        </div>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #fed7d7'
          }}>
            <p style={{ margin: 0, color: '#666' }}>⏳ 加载中...</p>
          </div>
        )}

        {error && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            background: '#fed7d7',
            borderRadius: '4px',
            border: '1px solid #e53e3e'
          }}>
            <p style={{ margin: 0, color: '#822727' }}>❌ {error}</p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {posts.map(post => (
              <div key={post.id} style={{
                background: 'white',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #fed7d7'
              }}>
                <h6 style={{ margin: '0 0 8px 0', color: '#c53030' }}>
                  {post.title}
                </h6>
                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataFetchingExample;