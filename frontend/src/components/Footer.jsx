import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">Bhagwati Handloom</h3>
            <p className="text-gray-400 mb-4">Bringing traditional craftsmanship to modern homes since 2010.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Home</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Products</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-indigo-400"></i>
                <span className="text-gray-400">Dev Bhumi Near Advocate Factory, Jatal Road, Shondapur Chowk, Panipat, Haryana, India  (132103)</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-indigo-400"></i>
                <span className="text-gray-400">+91 9050457740</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-indigo-400"></i>
                <span className="text-gray-400">bhagwatihandloom77740@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Bhagwati Handloom. All rights reserved.</p>
            <div className="flex space-x-4">
              <i className="fab fa-cc-visa text-2xl text-gray-400"></i>
              <i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
              <i className="fab fa-cc-amex text-2xl text-gray-400"></i>
              <i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;