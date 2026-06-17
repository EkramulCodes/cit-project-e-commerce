import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../services/api';
import Layout from '../components/Layout/Home';
import ProductCard from '../components/product/ProductCard';
import { Filter, ChevronDown, Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const { data, isLoading, error } = useGetProductsQuery(
    { limit: 50, skip: 0, search: query.trim() },
    { skip: !query.trim() }
  );

  const products = data?.products || [];

  const processedProducts = useMemo(() => {
    if (!query.trim() || products.length === 0) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    return [...products]
      .map(p => {
        const title = (p.title || "").toLowerCase();
        const brand = (p.brand || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        const tags = (p.tags || []).map(t => t.toLowerCase());
        
        let score = 0;
        
        // Title matches
        if (title === lowerQuery) score += 100;
        else if (title.startsWith(lowerQuery)) score += 75;
        else if (title.includes(lowerQuery)) score += 50;
        
        // Brand matches
        if (brand === lowerQuery) score += 80;
        else if (brand.includes(lowerQuery)) score += 40;
        
        // Category matches
        if (category === lowerQuery) score += 60;
        else if (category.includes(lowerQuery)) score += 30;
        
        // Tag matches
        if (tags.includes(lowerQuery)) score += 50;
        
        // Global Boost for electronics/smartphones when searching for tech terms
        if ((category === "smartphones" || category === "laptops" || category === "tablets") && 
            (title.includes(lowerQuery) || brand.includes(lowerQuery))) {
          score += 20;
        }

        return { p, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.p);
  }, [products, query]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00aaff] mx-auto mb-4"></div>      
            <p className="text-gray-500">Searching products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Search Results for "{query}"
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Found {processedProducts.length} products
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#00aaff] transition-colors">
              <Filter size={16} /> Filter
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#00aaff] transition-colors">
                Sort by: Relevance <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4 text-gray-400">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Search error</h2>
            <p className="text-gray-500 mb-8">Please try again later</p>
            <Link to="/" className="bg-[#00aaff] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Back to Home
            </Link>
          </div>
        ) : processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-800">No products found</h2>
            <p className="text-gray-500 mt-2 mb-8">Try checking your spelling or use more general terms</p>
            <Link to="/">
              <button className="text-[#00aaff] font-bold hover:underline">Back to Home</button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;

