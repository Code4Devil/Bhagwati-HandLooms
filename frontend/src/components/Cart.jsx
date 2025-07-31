import React from 'react';
import { useCart } from '../context/CartContext';
import { getFallbackImageUrl } from '../utils/imageUtils';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full shadow-xl flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Your Cart ({getTotalItems()})</h2>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                <img
                  src={item.image || getFallbackImageUrl()}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                  onError={(e) => {
                    e.currentTarget.src = getFallbackImageUrl();
                  }}
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>₹{getTotalPrice().toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;