import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand & Social - Order 4 on mobile */}
        <div className="space-y-6 order-4 lg:order-1">
          <div className="hidden lg:flex items-center">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-[96px] h-[40px] object-contain" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <p className="hidden lg:block text-gray-500 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-[#0198E9] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              style={{ background: 'radial-gradient(circle, rgba(250, 143, 33, 1) 9%, rgba(216, 45, 126, 1) 78%)' }}
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links - Order 3 on mobile */}
        <div className="order-3 lg:order-2">
          <h4 className="text-gray-800 font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-[#00aaff]">About us</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Contact us</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Products</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Login</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Sign Up</a></li>
          </ul>
        </div>

        {/* Customer Area - Order 2 on mobile */}
        <div className="order-2 lg:order-3">
          <h4 className="text-gray-800 font-bold text-lg mb-6 uppercase tracking-wider">Customer Area</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-[#00aaff]">My Account</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Orders</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Terms</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#00aaff]">Shipping Information</a></li>
          </ul>
        </div>

        {/* Contact Info - Order 1 on mobile */}
        <div className="space-y-6 order-1 lg:order-4">
          <h4 className="text-gray-800 font-bold text-lg uppercase tracking-wider">Contact</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase">Have any question?</p>
              <p className="text-xl font-bold text-[#00aaff]">099 456 789</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-xs order-1">Projectnirvoya - © 2021 All Rights Reserved</p>
        <div className="flex items-center gap-4 order-2 lg:order-2">
          <span className="text-xs text-gray-400 mr-2">Pay With</span>
          <img src="/footer payment.png" alt="Payment Methods" className="h-6 object-contain" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
