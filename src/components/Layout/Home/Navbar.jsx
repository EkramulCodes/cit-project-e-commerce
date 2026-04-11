import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
<<<<<<< HEAD
import Input from '../../../ui/Input';
=======
import SearchInput from '../SearchInput';
>>>>>>> 62835f1 (Rearrange folder structure)
import { useCart } from '../../../context/CartContext';
import { womenFashionCategories } from '../../../constants';

const Navbar = () => {
  const { cartCount } = useCart();
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState('');
  const [showWomenMegaMenu, setShowWomenMegaMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const trendingSearches = [
    'Women Fashion Dress',
    'Executive Mesh Office Chair',
    'Headrest Executive Mesh Office Chair',
    'Women Black Dress',
    'Fashion Dress Set'
  ];

  const popularCategories = [
    "Women's Fashion",
    "Men's Fashion",
    "Kid's Fashion",
    "Home & Lifestyle",
    "Computer & Electronics"
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };
=======
  const [showWomenMegaMenu, setShowWomenMegaMenu] = useState(false);
>>>>>>> 62835f1 (Rearrange folder structure)

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
<<<<<<< HEAD
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <form onSubmit={handleSearch} className="relative z-50">
            <Input 
              placeholder="I'm looking for..." 
              className="pr-12 bg-gray-50 border-none focus:ring-2 focus:ring-[#00aaff] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-[#00aaff] text-white rounded-r-md hover:bg-[#0088cc] transition-colors">
              <Search size={20} />
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          <AnimatePresence>
            {isSearchFocused && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 z-30 pointer-events-none"
                />
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 w-full bg-white shadow-2xl border border-gray-100 z-40 rounded-b-xl mt-1 p-6 overflow-hidden"
                >
                  <div className="space-y-8">
                    {/* Trending Searches */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trending Searches</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setSearchQuery(term);
                              navigate(`/search?q=${encodeURIComponent(term)}`);
                              setIsSearchFocused(false);
                            }}
                            className="px-4 py-2 bg-gray-50 hover:bg-[#00aaff] hover:text-white text-gray-600 text-sm rounded-full transition-all duration-200 border border-gray-100"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Categories */}
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Popular Categories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                        {popularCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              navigate(`/category/${cat.toLowerCase().replace(/'/g, '').replace(/ & /g, '-').replace(/ /g, '-')}`);
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg text-gray-700 text-sm transition-colors group border-b border-gray-50 last:border-0 md:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#00aaff]/10 transition-colors">
                                <Search size={14} className="text-gray-400 group-hover:text-[#00aaff]" />
                              </div>
                              <span className="font-medium group-hover:text-[#00aaff] transition-colors">{cat}</span>
                            </div>
                            <div className="text-gray-300 group-hover:text-[#00aaff] transition-transform group-hover:translate-x-1 duration-200">
                              <Search size={14} className="rotate-[-45deg]" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
=======
        <div className="flex-1 max-w-2xl relative">
          <SearchInput />
>>>>>>> 62835f1 (Rearrange folder structure)
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
