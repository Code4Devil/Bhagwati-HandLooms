import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = ({ cartCount, isCartOpen, toggleCart }) => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-indigo-800">Bhagwati Handloom</h1>
          </div>
          {/* Search Bar */}
          <div className="hidden md:block w-full max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </button>
            </div>
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <FontAwesomeIcon icon={faShoppingCart} className="text-gray-700 text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                  <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
                  {cartCount === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                  ) : (
                    <>
                      <p className="text-gray-600">Items in cart: {cartCount}</p>
                      {/* You can add more detailed cart items here later */}
                      <Link to="/cart" className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 text-center block">View Cart</Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className="py-3 border-t">
          <ul className="flex space-x-8 justify-center">
            <li><Link to="/" className={location.pathname === '/' ? 'text-indigo-800 font-medium' : 'text-gray-700 hover:text-indigo-600'}>Home</Link></li>
            <li><Link to="/products" className={location.pathname === '/products' ? 'text-indigo-800 font-medium' : 'text-gray-700 hover:text-indigo-600'}>Products</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'text-indigo-800 font-medium' : 'text-gray-700 hover:text-indigo-600'}>About Us</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'text-indigo-800 font-medium' : 'text-gray-700 hover:text-indigo-600'}>Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;