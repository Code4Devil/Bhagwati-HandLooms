import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuantityControl = ({ product, className = "" }) => {
  const { getItemQuantity, updateQuantity, addToCart } = useCart();
  const quantity = getItemQuantity(product.id);

  const handleIncrease = () => {
    if (quantity === 0) {
      // If not in cart, add to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || product.image || '/src/assets/default-product-image.png',
        stock: product.stock,
        category: product.category,
      });
    } else {
      // If already in cart, increase quantity
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  if (quantity === 0) {
    return null; // Don't show quantity controls if not in cart
  }

  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <button
        onClick={handleDecrease}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4 text-gray-600" />
      </button>
      
      <span className="font-semibold text-lg min-w-[2rem] text-center">
        {quantity}
      </span>
      
      <button
        onClick={handleIncrease}
        className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};

export default QuantityControl;
