import React from 'react';
import { SignInButton } from '@clerk/clerk-react';

const LoginPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Please Log In</h2>
        <p className="mb-6">You need to be logged in to add items to your cart.</p>
        <SignInButton mode="modal" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </SignInButton>
        <button
          onClick={onClose}
          className="mt-4 ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;