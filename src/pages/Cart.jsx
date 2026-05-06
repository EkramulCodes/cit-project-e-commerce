import React, { useEffect, useMemo } from 'react';


import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Home';
import { useCart } from '../context/CartContext';
import { useGetCartsQuery, useUpdateCartMutation } from '../services/api';

import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import Button from '../components/ui/Button';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartQuantity } = useCart();
  const cartId = useMemo(() => '1', []);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { data } = useGetCartsQuery();
  const carts = useMemo(() => (Array.isArray(data) ? data : data?.carts || data?.data || []), [data]);
  const serverCart = useMemo(() => carts.find((c) => String(c.id) === String(cartId)), [carts, cartId]);

  useEffect(() => {
    // If backend has a single cart, let CartContext UI remain the source of truth for rendering totals.
    // No UI change needed.
  }, [serverCart]);

  const [updateCartApi] = useUpdateCartMutation();


  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-8" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => navigate('/')} className="px-8 py-3 mx-auto block">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft size={20} />
              <span className="ml-2 text-sm font-medium">Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">      
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="ml-6 flex-1">
                      <Link to={`/product/${item.id}`} className="hover:text-[#00aaff]">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>        
                      </Link>
                      <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#00aaff]">&#2547;{item.price}</span>
                      </div>
                    </div>

                    <div className="ml-6 flex items-center gap-4 self-center">
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={async () => {
                            const nextQty = item.quantity - 1;
                            if (nextQty < 1) return;
                            updateCartQuantity(item.id, nextQty);
                            try {
                              await updateCartApi({ id: cartId, merge: true, products: [{ id: item.id, quantity: nextQty }] }).unwrap();
                            } catch (e) {
                              console.error('PATCH cart quantity failed', e);
                            }
                          }}

                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}):</span>
                    <span className="font-semibold">&#2547;{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-4">
                    <span>Total:</span>
                    <span>&#2547;{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full py-4 text-lg font-semibold mb-4">Proceed to Checkout</Button>

                <div className="text-center text-sm text-gray-500 py-4 border-t">
                  <p>Secure checkout with SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;


