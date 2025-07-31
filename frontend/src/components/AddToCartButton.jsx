import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductImageUrl } from '../utils/imageUtils';

const AddToCartButton = ({ 
  product, 
  onAddToCart, 
  className = "",
  variant = "full", // "full" for full width button, "icon" for icon only, "compact" for smaller version
  showQuantityControls = true 
}) => {
  const { getItemQuantity, updateQuantity, isInCart } = useCart();
  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  const handleIncrease = () => {
    if (quantity === 0) {
      // If not in cart, add to cart with proper format
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: getProductImageUrl(product),
        category: product.category,
        quantity: 1,
        inStock: product.stock > 0,
        rating: 0,
        reviews: 0
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

  // If product is out of stock
  if (product.stock <= 0) {
    return (
      <button
        disabled
        className={`bg-gray-400 text-white cursor-not-allowed flex items-center justify-center transition duration-300 ${
          variant === "full" ? "w-full py-2 px-4 rounded-lg" :
          variant === "icon" ? "p-2 rounded-full" :
          "py-1 px-3 rounded-lg text-sm"
        } ${className}`}
      >
        {variant === "icon" ? (
          <FontAwesomeIcon icon={faShoppingCart} />
        ) : (
          "Out of Stock"
        )}
      </button>
    );
  }

  // If item is in cart and we want to show quantity controls
  if (inCart && showQuantityControls) {
    return (
      <div className={`flex items-center justify-center space-x-3 ${className}`}>
        <button
          onClick={handleDecrease}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>
        
        <span className="font-semibold text-lg min-w-[2rem] text-center text-indigo-600">
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
  }

  // Default "Add to Cart" button
  return (
    <button
      onClick={() => onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: getProductImageUrl(product),
        category: product.category,
        quantity: 1,
        inStock: product.stock > 0,
        rating: 0,
        reviews: 0
      })}
      className={`bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 flex items-center justify-center ${
        variant === "full" ? "w-full py-2 px-4 rounded-lg" :
        variant === "icon" ? "p-2 rounded-full" :
        "py-1 px-3 rounded-lg text-sm"
      } ${className}`}
    >
      {variant === "icon" ? (
        <FontAwesomeIcon icon={faShoppingCart} />
      ) : (
        <>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
