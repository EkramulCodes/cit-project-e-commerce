import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { products } from '../constants';
import { Star, Heart, Minus, Plus, ShieldCheck, ChevronUp, ChevronDown, Linkedin, Twitter, Facebook, MessageCircle, Link2 } from "lucide-react";
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct ] = useState(null);
  const [quantity, setQuantity] = useState(2);
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

  if (!product) return null;

  return (
    <Layout>
      <div className="bg-[#F9FAFB] min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-[#00aaff]">Home</Link>
            <span className="mx-2 text-gray-300">{'>'}</span>
            <Link to="/category/men" className="hover:text-[#00aaff]">Men's Fashion</Link>
            <span className="mx-2 text-gray-300">{'>'}</span>
            <span className="text-gray-800 font-medium">Men's Stand Collar Leather Jacket</span>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

