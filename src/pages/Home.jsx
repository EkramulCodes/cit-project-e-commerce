import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import Banner from '../components/Layout/Home/Banner';
import { ChevronRight, Star, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import { categories, products } from '../constants';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-2 sm:p-4 group relative hover:shadow-lg transition-all">
      {product.discount && (
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded z-10">
          {product.discount}
        </span>
      )}
      <button className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-300 hover:text-red-500 transition-colors z-10">
        <Heart size={16} className={product.liked ? 'text-red-500' : ''} fill={product.liked ? 'currentColor' : 'none'} />
      </button>
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square mb-2 sm:mb-4 overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </Link>
      
      <div className="space-y-1 sm:space-y-2">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill={i < product.rating ? 'currentColor' : 'none'} />
          ))}
          <span className="text-gray-400 text-[8px] sm:text-[10px] ml-1">({product.reviews})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] sm:min-h-[40px] hover:text-[#00aaff] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <span className="text-[#00aaff] font-bold text-sm sm:text-lg">৳{product.price}</span>
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
  return (
    <Layout>
      <Banner />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              to={`/search?q=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-[#00aaff] hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg p-1">
                  <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#00aaff] transition-colors">{cat.name}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-[#00aaff]" />
            </Link>
          ))}
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

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Product</h2>
          <button className="text-gray-400 text-sm font-medium flex items-center gap-1 hover:text-[#00aaff]">
            View more <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button variant="primary" className="px-10 py-3 flex items-center gap-2">
            SHOW MORE <ChevronDown size={16} />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

