import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { Star, Heart, Minus, Plus, ShieldCheck, ChevronUp, ChevronDown } from "lucide-react";
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useGetProductByIdQuery } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();

  const { data: apiProduct, isLoading, error } = useGetProductByIdQuery(id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (apiProduct) {
      const priceBdt = Math.round(apiProduct.price * 110);
      const oldPriceBdt = apiProduct.discountPercentage
        ? Math.round(priceBdt / (1 - apiProduct.discountPercentage / 100))
        : null;

      setProduct({
        id: apiProduct.id,
        name: apiProduct.title,
        image: apiProduct.thumbnail || (apiProduct.images && apiProduct.images[0]),
        images: apiProduct.images || [apiProduct.thumbnail],
        price: priceBdt,
        oldPrice: oldPriceBdt,
        discount: apiProduct.discountPercentage ? `${Math.round(apiProduct.discountPercentage)}% OFF` : null,
        rating: apiProduct.rating || 0,
        reviews: apiProduct.reviews?.length || Math.floor(Math.random() * 200) + 10,
        sold: apiProduct.stock ? `${apiProduct.stock.toLocaleString()}` : '1,000+',
        sku: apiProduct.sku || `SKU-${apiProduct.id}`,
        description: apiProduct.description,
        features: [
          "Direct Full Array",
          "Quantum Dot Technology",
          "Ambient Mode",
          "One Remote Control"
        ],
        sizes: ['S', 'M', 'L', 'X', 'XL', 'XXL']
      });
      setSelectedImageIndex(0);
    }
    window.scrollTo(0, 0);
  }, [apiProduct]);

  if (isLoading || !product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Failed to load product.</p>
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
            <Link to="/shop" className="hover:text-[#00aaff]">Shop</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image with Vertical Thumbnail Slider */}
            <div className="flex gap-4">
              {/* Main Image */}
              <div className="flex-1">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Vertical Thumbnail Slider */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
                  disabled={selectedImageIndex === 0}
                >
                  <ChevronUp size={16} className={selectedImageIndex === 0 ? 'text-gray-300' : 'text-gray-600'} />
                </button>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-80 scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        idx === selectedImageIndex
                          ? 'border-[#00aaff] shadow-md'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedImageIndex(Math.min(product.images.length - 1, selectedImageIndex + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
                  disabled={selectedImageIndex === product.images.length - 1}
                >
                  <ChevronDown size={16} className={selectedImageIndex === product.images.length - 1 ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Ratings */}
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-[#00aaff]">৳{product.price.toLocaleString()}</span>
                {product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">৳{product.oldPrice.toLocaleString()}</span>
                )}
                {product.discount && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

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

