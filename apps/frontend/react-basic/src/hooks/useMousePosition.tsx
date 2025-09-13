import { useState, useEffect } from 'react';

/**
 * 实时获取鼠标位置信息
 * @returns {object} 包含 x 和 y 的对象
 * @example const { x, y } = useMousePosition();
 */

function useMousePosition() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleMouseMove = (e:MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

export default useMousePosition;