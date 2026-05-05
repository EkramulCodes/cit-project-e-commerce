import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import Banner from '../components/Layout/Home/Banner';
import { ChevronRight, Star, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useGetProductsQuery, useGetCategoriesQuery } from '../services/api';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  
  const displayImage = product.images?.[0] || product.thumbnail || product.image || `https://picsum.photos/300/300?random=${product.id}`;
  const displayTitle = product.title || product.name || '';
  const displayPrice = Math.round((product.price || 0) * 110); // USD to BDT
  const displayDiscount = product.discountPercentage ? `${Math.round(product.discountPercentage)}% OFF` : null;       
  const rating = product.rating || 4;
  const reviews = product.reviews?.length || 0;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-2 sm:p-4 group relative hover:shadow-lg transition-all">
      {displayDiscount && (
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded z-10">
          {displayDiscount}
        </span>
      )}
      <button className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-300 hover:text-red-500 transition-colors z-10">
        <Heart size={16} />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square mb-2 sm:mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              e.target.src = `https://picsum.photos/300/300?random=${product.id}`;
            }}
          />
        </div>
      </Link>

      <div className="space-y-1 sm:space-y-2">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill={i < rating ? 'currentColor' : 'none'} />
          ))}
        <span className="text-gray-400 text-[8px] sm:text-[10px] ml-1">({reviews})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] hover:text-[#00aaff] transition-colors">
            {displayTitle}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <span className="text-[#00aaff] font-bold text-sm sm:text-lg">৳{displayPrice.toLocaleString()}</span>     
          <button 
            onClick={() => addToCart(product)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#00aaff] text-[#00aaff] flex items-center justify-center hover:bg-[#00aaff] hover:text-white transition-colors"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const { data, isLoading, error } = useGetProductsQuery({
    limit: 50,
    skip: 0,
    search: searchTerm.trim()
  });
  const { data: categoriesData } = useGetCategoriesQuery();
  const categories = categoriesData || [];
  const productsData = data?.products || [];

  const products = useMemo(() => {
    if (!searchTerm.trim() || productsData.length === 0) return productsData;
    
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
      .slice(0, 20);
  }, [productsData, searchTerm]);

  if (isLoading) return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout searchTerm={searchTerm} onSearchChange={handleSearchChange}>
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{searchTerm ? `Failed to search "${searchTerm}"` : 'Failed to load products'}</h2>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    </Layout>
  );

  return (
    <Layout searchTerm={searchTerm} onSearchChange={handleSearchChange}>
      <Banner />

      {/* Categories (hide during search) */}
      {searchTerm.trim() === '' && (
        <>
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((cat, i) => {
                const displayName = cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return (
                  <Link
                    key={i}
                    to={`/shop?category=${encodeURIComponent(cat)}`}
                    className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-[#00aaff] hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#00aaff] transition-colors">{displayName}</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#00aaff]" />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Flash Deals */}
          <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Flash Deals</h2>
              <button className="text-gray-400 text-sm font-medium flex items-center gap-1 hover:text-[#00aaff]">     
                View more <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}


      {searchTerm.trim() ? (
        
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Search Results for "${searchTerm}"
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Found {products.length} products
              </p>
            </div>
            <Link
              to={`/search?q=${encodeURIComponent(searchTerm)}`}
              className="text-sm font-medium text-[#00aaff] hover:underline flex items-center gap-1"
            >
              View All Results <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Featured Product</h2>
            <Link to="/shop" className="text-gray-400 text-sm font-medium flex items-center gap-1 hover:text-[#00aaff]">
              View more <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/shop">
              <Button variant="primary" className="px-10 py-3 flex items-center gap-2">
                SHOW MORE <ChevronDown size={16} />
              </Button>
            </Link>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;

