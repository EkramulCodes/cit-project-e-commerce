import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import SearchInput from '../SearchInput';
import { useCart } from '../../../context/CartContext';
import { womenFashionCategories } from '../../../constants';

const Navbar = () => {
  const { cartCount } = useCart();
  const [showWomenMegaMenu, setShowWomenMegaMenu] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-[96px] h-[40px] object-contain group-hover:scale-105 transition-transform" 
            referrerPolicy="no-referrer" 
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <SearchInput />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-600">
          <Link to="/login" className="flex items-center gap-1 cursor-pointer hover:text-[#00aaff] transition-colors">
            <User size={20} />
            <span className="text-sm hidden lg:block font-medium">Login</span>
          </Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#00aaff] relative transition-colors">
            <Heart size={20} />
            <span className="text-sm hidden lg:block font-medium">Wishlist</span>
          </div>
          <Link to="/cart" className="flex items-center gap-1 cursor-pointer hover:text-[#00aaff] relative transition-colors">
            <ShoppingCart size={20} />
            <span className="text-sm hidden lg:block font-medium">My cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-8 whitespace-nowrap relative">
        <div 
          className="flex items-center gap-1 text-black font-normal text-sm cursor-pointer uppercase tracking-wide py-2"
          onMouseEnter={() => setShowWomenMegaMenu(true)}
          onMouseLeave={() => setShowWomenMegaMenu(false)}
        >
          Women's Fashion
          
          {/* Mega Menu */}
          <AnimatePresence>
            {showWomenMegaMenu && (
              <>
                {/* Bridge to prevent closing when moving mouse */}
                <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[calc(100%+4px)] left-0 w-full bg-white shadow-2xl border border-gray-100 z-[100] p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 whitespace-normal rounded-xl"
                >
                  {Object.entries(womenFashionCategories).slice(0, 4).map(([category, items]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2 uppercase tracking-wider">{category}</h3>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item}>
                            <Link 
                              to={`/category/women?sub=${item}`} 
                              className="text-gray-500 hover:text-[#00aaff] text-xs transition-colors block"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="lg:col-start-5 flex flex-col justify-between h-full">
                    {Object.entries(womenFashionCategories).slice(4).map(([category, items]) => (
                      <div key={category} className="space-y-4">
                        <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2 uppercase tracking-wider">{category}</h3>
                        <ul className="space-y-2">
                          {items.map((item) => (
                            <li key={item}>
                              <Link 
                                to={`/category/women?sub=${item}`} 
                                className="text-gray-500 hover:text-[#00aaff] text-xs transition-colors block"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        <div className="text-gray-700 font-normal text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff]">Men's Fashion</div>
        <div className="text-gray-700 font-normal text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff]">Kid's Fashion</div>
        <div className="text-gray-700 font-normal text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff]">Home & Lifestyle</div>
        <div className="text-gray-700 font-normal text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff]">Arts & Crafts</div>
        <div className="text-gray-700 font-normal text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff]">Computer & Electronics</div>
        <div className="text-gray-700 font-normal text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff]">Food & Grocery</div>
      </nav>
    </header>
  );
};

export default Navbar;
