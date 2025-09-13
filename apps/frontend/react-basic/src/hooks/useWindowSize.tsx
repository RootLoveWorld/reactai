import { useState, useEffect } from 'react';

/**
 * 实时获取窗口尺寸
 * @returns {object} 包含 width 和 height 的对象
 * @example const { width, height } = useWindowSize();
 */

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}


export default useWindowSize;