import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0); // You might want to manage this state globally later

  return (
    <header className="bg-white shadow-sm">
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
            <div className="relative cursor-pointer">
              <FontAwesomeIcon icon={faShoppingCart} className="text-gray-700 text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className="py-3 border-t">
          <ul className="flex space-x-8 justify-center">
            <li><Link to="/" className="text-indigo-800 font-medium hover:text-indigo-600">Home</Link></li>
            <li><Link to="/products" className="text-gray-700 hover:text-indigo-600">Products</Link></li>
            <li><Link to="/about" className="text-gray-700 hover:text-indigo-600">About Us</Link></li>
            <li><Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;