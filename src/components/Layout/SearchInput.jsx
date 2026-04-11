import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import Input from '../../ui/Input';

const SearchInput = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative z-50 flex h-10">
        <Input 
          placeholder="I'm looking for..." 
          className="flex-1 bg-white border border-gray-200 focus:ring-1 focus:ring-[#00aaff] transition-all rounded-l-md rounded-r-none text-sm px-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        />
        <button type="submit" className="w-12 bg-[#00aaff] text-white rounded-r-md hover:bg-[#0088cc] transition-colors flex items-center justify-center shrink-0">
          <Search size={18} />
        </button>
      </form>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-100 z-40 rounded-b-lg mt-0.5 p-5 overflow-hidden"
          >
            <div className="space-y-6">
              {/* Trending Searches */}
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Trending Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        navigate(`/search?q=${encodeURIComponent(term)}`);
                        setIsSearchFocused(false);
                      }}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-[#00aaff] hover:text-white text-gray-600 text-[11px] rounded-md transition-all duration-200 border border-gray-100"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Popular Categories</h3>
                <div className="grid grid-cols-1 gap-1">
                  {popularCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        navigate(`/category/${cat.toLowerCase().replace(/'/g, '').replace(/ & /g, '-').replace(/ /g, '-')}`);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md text-gray-700 text-xs transition-colors group"
                    >
                      <Search size={12} className="text-gray-300 group-hover:text-[#00aaff]" />
                      <span className="font-medium group-hover:text-[#00aaff]">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;