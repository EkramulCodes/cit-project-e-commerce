import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import SearchInput from '../SearchInput';
import { useCart } from '../../../context/CartContext';
import { useGetCategoriesQuery } from '../../../services/api';

const Navbar = () => {
  const { cartCount } = useCart();
  const { data: categoriesData } = useGetCategoriesQuery();
  const allCategories = categoriesData || [];
  const categories = allCategories.slice(0, 9); // Show first 9 that fit container

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
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-wrap overflow-x-auto no-scrollbar">

        {categories.map((cat) => {
          const displayName = cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return (
            <Link
              key={cat}
              to={`/shop?category=${encodeURIComponent(cat)}`}
              className="text-gray-700 font-normal text-[11px] sm:text-xs md:text-sm cursor-pointer uppercase tracking-wide hover:text-[#00aaff] transition-all px-1 py-0.5 rounded whitespace-nowrap flex-shrink-0 hover:bg-gray-100"
            >
              {displayName}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;
