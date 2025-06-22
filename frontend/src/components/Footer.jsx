import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
          <div class="space-y-6"><div class="text-slate-300"><p class="mb-4">Developer Information </p><div class="p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl mt-4 border border-slate-700 transform transition-all hover:translate-y-[-5px]"><p class="text-sm mb-2 text-slate-400">Developed by:</p><a href="https://www.intelermate.in" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-white font-medium hover:text-teal-400 transition-colors group"><div class="flex items-center justify-center h-8 w-8 mr-3 rounded-md bg-red-500 bg-opacity-20 text-red-100"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></div>Intelermate<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right ml-2 h-4 w-4 text-teal-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></a><p class="mt-4 text-sm text-slate-400 border-t border-slate-700 pt-4">Specialized in web development, mobile applications, and digital solutions for healthcare and beyond.</p><a href="mailto:info@intelermate.in" class="mt-2 inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail mr-2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.93 1.93 0 0 1-2.06 0L2 7"/></svg>info@intelermate.in</a></div></div></div>
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