import React from 'react';

interface TailwindExampleProps {
  title?: string;
  items: string[];
}

const TailwindExample: React.FC<TailwindExampleProps> = ({ title = 'Tailwind CSS Example', items }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
        <ul className="mt-4 space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-green-500 mr-2">✓</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Action Button
        </button>
      </div>
    </div>
  );
};

export default TailwindExample;