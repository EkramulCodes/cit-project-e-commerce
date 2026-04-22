import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { products } from '../constants';
import { Star, Heart, Minus, Plus, ShieldCheck, ChevronUp, ChevronDown, Linkedin, Twitter, Facebook, MessageCircle, Link2 } from "lucide-react";
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id)) || products[0];
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        name: "Super Skinny Rib Trouser & Joggers for Men By Sowdagar Trouser",
        price: 976.33,
        oldPrice: 1020.99,
        discount: "20%",
        rating: 4.0,
        reviews: 223,
        sold: "4,320",
        sku: "12314124124",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        features: [
          "Direct Full Array",
          "Quantum Dot Technology",
          "Ambient Mode",
          "One Remote Control"
        ],
        sizes: ['S', 'M', 'L', 'X', 'XL', 'XXL']
      });
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-[#F9FAFB] min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="flex text-xs text-gray-500 mb-8">
            <Link to="/" className="hover:text-[#00aaff]">Home</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link to="/category/men" className="hover:text-[#00aaff]">Men's Fashion</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Ratings */}
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-[#00aaff]">৳{product.price}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">৳{product.oldPrice}</span>
                )}
                {product.discount && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold mx-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button 
                  onClick={() => addToCart(product, quantity)}
                  size="lg"
                  className="flex-1 font-semibold"
                >
                  Add to Cart
                </Button>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Size</label>
                <div className="flex space-x-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size 
                          ? 'bg-[#00aaff] text-white border-[#00aaff] shadow-md' 
                          : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Features</h3>
                <ul className="space-y-1 text-sm">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

