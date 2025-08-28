import React from 'react';
import { Product } from './ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onRemoveFromCart: (productId: number) => void; // 回调函数，由父组件传入
  onUpdateQuantity: (productId: number, quantity: number) => void; // 更新数量的回调
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveFromCart(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <div style={{
      border: '2px solid #007acc',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#007acc' }}>
        🛒 Shopping Cart ({totalItems} items)
      </h3>
      
      {cartItems.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid #eee'
            }}>
              <div>
                <strong>{item.name}</strong>
                <br />
                <span style={{ color: '#666' }}>¥{item.price} each</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className="button"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  style={{ fontSize: '12px', padding: '5px 10px' }}
                >
                  -
                </button>
                
                <span style={{ minWidth: '30px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                
                <button 
                  className="button"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  style={{ fontSize: '12px', padding: '5px 10px' }}
                >
                  +
                </button>
                
                <button 
                  className="button"
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{ backgroundColor: '#dc3545', fontSize: '12px', padding: '5px 10px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div style={{
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#007acc',
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            Total: ¥{totalPrice.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;