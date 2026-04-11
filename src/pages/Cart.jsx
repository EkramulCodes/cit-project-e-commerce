import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/">
            <Button variant="primary" className="px-8 py-3">
              START SHOPPING
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart ({cartCount})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden md:grid grid-cols-6 gap-4 pb-4 border-b border-gray-100 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 py-6 border-b border-gray-100 items-center group">
                {/* Product Info */}
                <div className="col-span-3 flex gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 bg-white">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link to={`/product/${item.id}`} className="font-bold text-gray-800 hover:text-[#00aaff] transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-1 text-xs text-red-500 mt-2 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center font-bold text-gray-800 hidden md:block">
                  ৳{item.price}
                </div>

                {/* Quantity */}
                <div className="flex justify-center">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="text-right font-bold text-[#00aaff] text-lg">
                  ৳{item.price * item.quantity}
                </div>
              </div>
            ))}

            <div className="pt-6">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#00aaff] transition-colors">
                <ArrowLeft size={16} /> CONTINUE SHOPPING
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-bold text-gray-800">৳0</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-[#00aaff]">৳{cartTotal}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="primary" className="w-full py-4 font-bold tracking-wider">
                  PROCEED TO CHECKOUT
                </Button>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Secure checkout powered by Project Nirvoya
                </p>
              </div>

              {/* Promo Code */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Have a promo code?</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00aaff] transition-colors"
                  />
                  <Button variant="outline" className="px-4 py-2 text-sm">APPLY</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default Cart;
=======
export default Cart;
>>>>>>> 62835f1 (Rearrange folder structure)
