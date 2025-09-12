import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../store';

interface CounterState {
  value: number;
}

const ReduxExample: React.FC = () => {
  const count = useSelector((state: { counter: CounterState }) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-8">
      <h2 className="text-xl font-bold mb-4">React-Redux Example</h2>
      <p className="text-gray-700 mb-4">Count: {count}</p>
      <div className="space-x-4">
        <button 
          onClick={handleIncrement}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
        <button 
          onClick={handleDecrement}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default ReduxExample;