import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useGetProductsQuery } from '../../services/api';
import ProductCard from '../product/ProductCard';

const SearchInput = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
const { data: searchData, isLoading: isSearchLoading } = useGetProductsQuery(
    { limit: 8, skip: 0, search: query },
    { skip: !query.trim() }
  );
  const searchProducts = searchData?.products || [];
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  useEffect(() => {
    return () => {
      if (inputRef.current?._blurTimer) {
        clearTimeout(inputRef.current._blurTimer);
      }
    };
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsFocused(false);
    setQuery('');
  };

  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            const timer = setTimeout(() => setIsFocused(false), 200);
            if (inputRef.current) inputRef.current._blurTimer = timer;
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isFocused) setIsFocused(true);
          }}
          placeholder="Search products..."
          className="w-full px-4 py-3 pr-12 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00aaff] focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#00aaff] text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </form>

      {isFocused && query.trim() && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-96 overflow-auto">
          {isSearchLoading ? (
            <div className="p-4 text-sm text-gray-500 text-center">Searching...</div>
          ) : searchProducts.length > 0 ? (
            <div className="grid grid-cols-1 divide-y divide-gray-100">
              {searchProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="p-3 w-full text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="[&_div]:p-2 [&>*]:scale-90">
                    <ProductCard product={product} />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-500 text-center">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
