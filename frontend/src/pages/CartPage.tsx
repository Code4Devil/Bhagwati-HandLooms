import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Shield, Truck, CreditCard, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';


interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
  // Add other properties if they are part of your product structure and used in CartPage
  // For example, if you have a 'description' or 'weight' property

  rating: number;
  reviews: number;
}

const CartPage: React.FC = () => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const { cartItems, updateQuantity, removeFromCart } = useCart();



  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0;
  const shipping = subtotal < 10000 ? 500 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order placed successfully! 🎉');
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-20 ">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <ShoppingBag className="w-24 h-24 mx-auto text-slate-300 mb-6" />
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
              <p className="text-slate-600 text-lg mb-8">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Shopping Cart</h1>
          <p className="text-slate-600 text-lg">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 px-2">
            {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-xl transition-transform duration-200 group-hover:scale-105"
                      />
                      {item.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                          SALE
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
                        <Heart className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{item.name}</h3>
                          <p className="text-slate-500 text-sm">{item.category}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">
                              {i < Math.floor(item.rating) ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-slate-600">
                          {item.rating} ({item.reviews} reviews)
                        </span>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-800">
                          ₹{item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-lg text-slate-400 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 px-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">

              <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>



              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-slate-800">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              {subtotal < 75 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                  <p className="text-amber-800 text-sm">
                    <Truck className="w-4 h-4 inline mr-1" />
                    Add ₹{(75 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Security Features */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto text-green-600 mb-1" />
                  <p className="text-xs text-slate-600">Secure</p>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                  <p className="text-xs text-slate-600">Fast Ship</p>
                </div>
                <div className="text-center">
                  <CreditCard className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                  <p className="text-xs text-slate-600">Safe Pay</p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="text-xs text-slate-500 text-center mt-3">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;