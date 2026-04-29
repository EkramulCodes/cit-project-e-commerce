import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { Star, Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Convert USD to BDT consistently
  const displayPrice = Math.round((product.price || 0) * 110);
  const displayTitle = product.title || product.name || '';

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-2 sm:p-4 group relative hover:shadow-lg transition-all">
      {product.discount && (
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-orange-500 text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded z-10">
          {product.discount}
        </span>
      )}
      <button className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-300 hover:text-red-500 transition-colors z-10">
        <Heart size={16} className="heart-icon" />
      </button>
      
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square mb-2 sm:mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img 
            src={product.images?.[0] || product.thumbnail || product.image || 'https://picsum.photos/300/300?random=' + product.id} 
            alt={displayTitle} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://picsum.photos/300/300?random=' + product.id;
            }}
          />
        </div>
      </Link>
      
      <div className="space-y-1 sm:space-y-2">
        <div className="flex text-orange-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill={i < (product.rating || 4) ? 'currentColor' : 'none'} />
          ))}
        <span className="text-gray-400 text-[8px] sm:text-[10px] ml-1">({product.reviews?.length || 0})</span>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[32px] hover:text-[#00aaff] transition-colors">
            {displayTitle}
          </h3>
        </Link>
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <span className="text-[#00aaff] font-bold text-sm sm:text-lg">৳{displayPrice.toLocaleString()}</span>
          <button 
            onClick={handleAddToCart}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-[#00aaff] text-[#00aaff] flex items-center justify-center hover:bg-[#00aaff] hover:text-white transition-colors"
          >
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

