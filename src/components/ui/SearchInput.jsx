import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/api';
import { Search } from 'lucide-react';

const SearchInput = ({ searchTerm = '', onSearchChange }) => {
  const navigate = useNavigate();
  
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onSearchChange?.(''); // Clear local search to close dropdown
    }
  };

  const handleChange = (e) => {
    onSearchChange?.(e.target.value);
  };

  const handleClear = () => {
    onSearchChange?.('');
  };

  const { data, isLoading } = useGetProductsQuery(
    { limit: 30, skip: 0, search: searchTerm.trim() },
    {
      skip: searchTerm.length < 2,
    }
  );

  const filteredProducts = useMemo(() => {
    const productsData = data?.products || [];
    if (!searchTerm.trim() || productsData.length === 0) return [];

    const lowerQuery = searchTerm.toLowerCase().trim();
    return [...productsData]
      .map(p => {
        const title = (p.title || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        const tags = (p.tags || []).map(t => t.toLowerCase());
        
        let score = 0;
        if (title === lowerQuery) score += 100;
        else if (title.startsWith(lowerQuery)) score += 75;
        else if (title.includes(lowerQuery)) score += 50;
        
        if (brand === lowerQuery) score += 80;
        else if (brand.includes(lowerQuery)) score += 40;
        
        if (category === lowerQuery) score += 60;
        else if (category.includes(lowerQuery)) score += 30;
        
        if (tags.includes(lowerQuery)) score += 50;

        if ((category === "smartphones" || category === "laptops" || category === "tablets") && 
            (title.includes(lowerQuery) || brand.includes(lowerQuery))) {
          score += 20;
        }

        return { p, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.p)
      .slice(0, 12);
  }, [data, searchTerm]);

  return (
    <div className="relative w-full">
      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="flex relative items-center">
        <input
          type="text"
          placeholder="Search Your Product.."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300 pr-12 h-[44px]"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="absolute right-0 top-0 bg-[#0198E9] text-white h-full px-5 rounded-r-md flex items-center justify-center text-xl">
          <Search size={20} />
        </button>
      </form>

      {/* Popup Dropdown with Grid Layout */}
      {searchTerm.length >= 2 && (
        <div className="absolute top-[110%] left-0 w-full md:w-[750px] bg-white border border-gray-100 rounded-lg shadow-2xl z-[999] max-h-[500px] overflow-y-auto p-4">

          {isLoading && (
            <div className="flex items-center gap-2 p-5 text-center text-gray-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              Searching...
            </div>
          )}

          {!isLoading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={handleClear}
                  className="flex flex-col gap-2 p-3 hover:bg-gray-50 border border-gray-50 rounded-lg transition-colors group"
                >
                  <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-medium text-gray-800 line-clamp-2 h-10">{product.title}</h4>      
                    <p className="text-[14px] text-blue-600 font-bold mt-0.5">৳{Math.round(product.price * 110)}</p>
                    <p className="mt-1">
                      {product.discountPercentage > 0 && (
                        <span className="text-[10px] text-green-600 px-3 py-1 rounded bg-green-200 font-medium">      
                          {product.discountPercentage}% OFF
                        </span>
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="p-6 text-center">
              <div className="text-2xl mb-2 text-gray-400">🔍</div>
              <p className="text-sm text-gray-500 mb-2">No products found for "{searchTerm}"</p>
              <Link to={`/search?q=${encodeURIComponent(searchTerm)}`} onClick={handleClear} className="text-xs text-blue-600 hover:underline font-medium">
                View all results
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
