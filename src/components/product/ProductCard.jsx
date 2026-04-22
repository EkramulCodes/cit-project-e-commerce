import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div 
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -4 }}
      layout
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          <img 
            src={product.thumbnail || '/vite.svg'} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-secondary mb-4">
            ৳{product.price.toLocaleString()}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

