import React, { useReducer, useState } from 'react';

// 定义 Todo 项的类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

// 定义状态类型
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

// 定义动作类型
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'EDIT_TODO'; payload: { id: number; text: string } }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' };

// 初始状态
const initialState: TodoState = {
  todos: [
    {
      id: 1,
      text: '学习 useReducer',
      completed: false,
      createdAt: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      text: '完成示例代码',
      completed: true,
      createdAt: new Date().toLocaleTimeString()
    }
  ],
  filter: 'all'
};

// Reducer 函数 - 处理复杂的状态逻辑
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      if (!action.payload.trim()) return state;
      
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toLocaleTimeString()
      };
      
      return {
        ...state,
        todos: [...state.todos, newTodo]
      };
    }

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      return state;
  }
}

const TodoList: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // 过滤 todos
  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  // 统计信息
  const activeCount = state.todos.filter(todo => !todo.completed).length;
  const completedCount = state.todos.filter(todo => todo.completed).length;

  const handleAddTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: inputValue });
    setInputValue('');
  };

  const handleEditStart = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = (id: number) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, text: editText } });
    setEditingId(null);
    setEditText('');
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
        📝 待办事项列表 (useReducer)
      </h3>

      {/* 添加新 Todo */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="输入新的待办事项..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handleAddTodo}
          className="button"
          style={{ backgroundColor: '#28a745' }}
        >
          ➕ 添加
        </button>
      </div>

      {/* 过滤按钮 */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center'
      }}>
        {['all', 'active', 'completed'].map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: filter as 'all' | 'active' | 'completed' })}
            className="button"
            style={{
              backgroundColor: state.filter === filter ? '#007acc' : '#f8f9fa',
              color: state.filter === filter ? 'white' : '#333',
              fontSize: '14px',
              padding: '8px 16px'
            }}
          >
            {filter === 'all' ? '🔍 全部' : 
             filter === 'active' ? '⏳ 未完成' : '✅ 已完成'}
            {filter === 'all' && ` (${state.todos.length})`}
            {filter === 'active' && ` (${activeCount})`}
            {filter === 'completed' && ` (${completedCount})`}
          </button>
        ))}
      </div>

      {/* Todo 列表 */}
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '20px'
      }}>
        {filteredTodos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: '#666',
            padding: '40px',
            fontStyle: 'italic'
          }}>
            {state.filter === 'all' ? '暂无待办事项' :
             state.filter === 'active' ? '太棒了！没有未完成的事项' :
             '还没有完成任何事项'}
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                margin: '8px 0',
                backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                border: `1px solid ${todo.completed ? '#dee2e6' : '#28a745'}`,
                borderRadius: '4px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                style={{ transform: 'scale(1.2)' }}
              />

              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleEditSave(todo.id)}
                  onBlur={() => handleEditSave(todo.id)}
                  style={{
                    flex: 1,
                    padding: '4px 8px',
                    border: '1px solid #007acc',
                    borderRadius: '4px'
                  }}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => handleEditStart(todo)}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  {todo.text}
                </span>
              )}

              <span style={{ fontSize: '12px', color: '#666' }}>
                {todo.createdAt}
              </span>

              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* 统计和操作 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        background: '#e8f5e8',
        borderRadius: '4px'
      }}>
        <div style={{ fontSize: '14px', color: '#495057' }}>
          📊 总计: {state.todos.length} | 
          ⏳ 未完成: {activeCount} | 
          ✅ 已完成: {completedCount}
        </div>

        {completedCount > 0 && (
          <button
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            className="button"
            style={{
              backgroundColor: '#ffc107',
              color: '#333',
              fontSize: '14px',
              padding: '6px 12px'
            }}
          >
            🧹 清除已完成
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;