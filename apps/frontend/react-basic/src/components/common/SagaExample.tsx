import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, addPost } from '../../store';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

const SagaExample: React.FC = () => {
  const { items: posts, loading, error } = useSelector((state: { posts: PostsState }) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    // In a real app, this would trigger a saga
    // dispatch(fetchPosts());
  }, [dispatch]);

  const handleFetchPosts = () => {
    dispatch(fetchPosts());
  };

  const handleAddPost = () => {
    dispatch(addPost({
      id: posts.length + 1,
      title: 'New Post',
      body: 'This is a new post created with Redux-Saga'
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-8">
      <h2 className="text-xl font-bold mb-4">Redux-Saga Example</h2>
      
      <div className="space-x-4 mb-4">
        <button 
          onClick={handleFetchPosts}
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Loading...' : 'Fetch Posts'}
        </button>
        <button 
          onClick={handleAddPost}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Post
        </button>
      </div>
      
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="border border-gray-200 rounded p-4">
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SagaExample;