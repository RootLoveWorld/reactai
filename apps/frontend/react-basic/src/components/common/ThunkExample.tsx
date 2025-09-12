import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersRequest, fetchUsersSuccess } from '../../store';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const ThunkExample: React.FC = () => {
  const { items: users, loading, error } = useSelector((state: { users: UsersState }) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    // In a real app, this would be a thunk action creator
    // dispatch(fetchUsers());
  }, [dispatch]);

  const handleFetchUsers = () => {
    // Simulate async action with thunk
    dispatch(fetchUsersRequest());
    
    // Mock API call
    setTimeout(() => {
      dispatch(fetchUsersSuccess([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]));
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-8">
      <h2 className="text-xl font-bold mb-4">Redux-Thunk Example</h2>
      
      <button 
        onClick={handleFetchUsers}
        disabled={loading}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {loading ? 'Loading...' : 'Fetch Users'}
      </button>
      
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="border-b border-gray-200 py-2">
            <p className="font-medium">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThunkExample;