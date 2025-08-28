import React from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void; // 回调函数，由父组件传入
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product); // 调用父组件传入的函数
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{product.name}</h3>
      <p style={{ color: '#666', margin: '5px 0' }}>{product.description}</p>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007acc', margin: '10px 0' }}>
        ¥{product.price}
      </p>
      <button 
        className="button" 
        onClick={handleAddToCart}
        style={{ width: '100%' }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;