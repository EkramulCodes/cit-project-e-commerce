import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { products } from '../constants';
import { Star, ShoppingCart, Heart, Filter, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 group relative hover:shadow-lg transition-all">
      {product.discount && (
        <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">
          {product.discount}
        </span>
      )}
      <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors z-10">
        <Heart size={20} fill={product.liked ? 'currentColor' : 'none'} className={product.liked ? 'text-red-500' : ''} />
      </button>
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </Link>
      
      <div className="space-y-2">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < product.rating ? 'currentColor' : 'none'} />
          ))}
          <span className="text-gray-400 text-[10px] ml-1">({product.reviews})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] hover:text-[#00aaff] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[#00aaff] font-bold text-lg">৳{product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="w-8 h-8 rounded-lg border border-[#00aaff] text-[#00aaff] flex items-center justify-center hover:bg-[#00aaff] hover:text-white transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const slugToCategoryName = (slug) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');
};

const Category = () => {
  const { category: slug } = useParams();
  const [searchParams] = useSearchParams();
  const sub = searchParams.get('sub');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categoryName = slugToCategoryName(slug || '');

  useEffect(() => {
    let results = products.filter(p => p.category === categoryName);
    
    if (sub && sub.trim()) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(sub.toLowerCase()) ||
        p.description.toLowerCase().includes(sub.toLowerCase())
      );
    }
    
    setFilteredProducts(results);
  }, [slug, sub, categoryName]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">
              {categoryName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Found {filteredProducts.length} products{sub ? ` in "${sub}"` : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#00aaff] transition-colors">
              <Filter size={16} /> Filter
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#00aaff] transition-colors">
                Sort by: Newest <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-bold text-gray-800">No products found</h2>
            <p className="text-gray-500 mt-2 mb-8">Try checking different subcategory or browse all products</p>
            <Link to="/">
              <button className="text-[#00aaff] font-bold hover:underline">Back to Home</button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;

