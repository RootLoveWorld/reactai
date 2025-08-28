import React, { useEffect, useState } from 'react';

interface DependencyArrayExampleProps {
  onLog: (message: string) => void;
}

const DependencyArrayExample: React.FC<DependencyArrayExampleProps> = ({ onLog }) => {
  const [name, setName] = useState('张三');
  const [age, setAge] = useState(25);
  const [city, setCity] = useState('北京');

  // 监听 name 变化
  useEffect(() => {
    onLog(`👤 姓名变化: ${name}`);
  }, [name]);

  // 监听 age 变化
  useEffect(() => {
    onLog(`🎂 年龄变化: ${age}`);
  }, [age]);

  // 监听多个依赖
  useEffect(() => {
    onLog(`📍 用户信息: ${name}, ${age}岁, 来自${city}`);
  }, [name, age, city]);

  return (
    <div style={{
      background: '#fff8dc',
      padding: '15px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h4 style={{ margin: '0 0 15px 0', color: '#b8860b' }}>
        2. 依赖数组示例
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '15px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            姓名:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            年龄:
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            城市:
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              width: '100%',
              padding: '6px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <option value="广州">广州</option>
            <option value="深圳">深圳</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DependencyArrayExample;