import React, { useState } from 'react';
import ProductCard, { Product } from './ProductCard';
import Cart, { CartItem } from './Cart';

const StateLiftingExample: React.FC = () => {
  // 📈 状态提升: 购物车状态被提升到父组件中管理
  // 这样 ProductCard 和 Cart 组件都可以访问和修改同一个状态
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 模拟商品数据
  const products: Product[] = [
    {
      id: 1,
      name: "React 学习指南",
      price: 89.99,
      description: "深入学习 React 开发的完整指南"
    },
    {
      id: 2,
      name: "TypeScript 实战",
      price: 79.99,
      description: "从基础到高级的 TypeScript 开发教程"
    },
    {
      id: 3,
      name: "前端工程化",
      price: 99.99,
      description: "现代前端项目的工程化实践"
    }
  ];

  // 🔄 添加商品到购物车的处理函数
  // 这个函数会被传递给 ProductCard 组件
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      // 检查商品是否已在购物车中
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // 如果已存在，增加数量
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 如果不存在，添加新商品
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 🗑️ 从购物车移除商品的处理函数
  // 这个函数会被传递给 Cart 组件
  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  // 📊 更新商品数量的处理函数
  // 这个函数会被传递给 Cart 组件
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <div className="component-section">
      <h2>🚀 State Lifting Example (状态提升示例)</h2>
      
      <div className="difference">
        <h3>🎯 状态提升的核心概念：</h3>
        <ul>
          <li><strong>问题：</strong> 两个兄弟组件 (ProductCard 和 Cart) 需要共享同一个状态 (购物车数据)</li>
          <li><strong>解决方案：</strong> 将共享状态提升到它们的最近公共父组件中</li>
          <li><strong>实现方式：</strong> 父组件管理状态，通过 props 传递状态和修改函数给子组件</li>
          <li><strong>数据流：</strong> 数据向下流动 (props)，事件向上传递 (callbacks)</li>
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h3>📦 Products (点击添加到购物车)</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart} // 🔗 传递回调函数
              />
            ))}
          </div>
        </div>

        <div>
          <Cart
            cartItems={cartItems} // 🔗 传递状态
            onRemoveFromCart={handleRemoveFromCart} // 🔗 传递回调函数
            onUpdateQuantity={handleUpdateQuantity} // 🔗 传递回调函数
          />
        </div>
      </div>

      <div className="output">
        <strong>🔍 当前购物车状态 (在父组件中管理):</strong>
        <pre style={{ marginTop: '10px', fontSize: '12px' }}>
          {JSON.stringify(cartItems, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default StateLiftingExample;