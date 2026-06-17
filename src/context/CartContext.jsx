import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCreateCartMutation, useDeleteCartMutation, useGetCartsQuery, useUpdateCartMutation } from '../services/api';


const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // API sync
  const { data: cartsData, refetch } = useGetCartsQuery();

  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const normalizeCartItem = (item) => {
    // Backend cart prices are expected to be same as ProductDetail source price (USD)
    // ProductDetail converts USD -> BDT using Math.round(price * 110)
    const price = Math.round(Number(item.price ?? 0) * 110);
    const quantity = Number(item.quantity ?? 1);
    const discountPercentage = Number(item.discountPercentage ?? 0);
    const discountedTotal = Number(item.discountedTotal ?? (price * quantity * (1 - discountPercentage / 100)));
    const total = Number(item.total ?? (price * quantity));

    return {
      id: item.id,
      title: item.title,
      price,
      quantity,
      total,
      discountPercentage,
      discountedTotal,
      thumbnail: item.thumbnail,
    };
  };

  useEffect(() => {
    if (!cartsData) return;

    // Backend provides many carts from GET /carts;
    // In UI we use a single fixed cart (cartId = 1).
    const cartId = '1';
    const list = Array.isArray(cartsData)
      ? cartsData
      : cartsData?.carts || cartsData?.data || [];

    const single = list.find((c) => String(c.id) === String(cartId));
    const items = single?.products || single?.items || single || [];

    const normalized = (Array.isArray(items) ? items : []).map(normalizeCartItem).map((ci) => ({
      // keep backward-compat fields used by Cart UI
      id: ci.id,
      name: ci.title,
      title: ci.title,
      // ProductDetail shows BDT by doing: Math.round(apiProduct.price * 110)
      // Ensure cart prices use the same conversion.
      price: ci.price,

      image: ci.thumbnail,
      thumbnail: ci.thumbnail,
      category: ci.category,
      quantity: ci.quantity,
      total: ci.total,
      discountPercentage: ci.discountPercentage,
      discountedTotal: ci.discountedTotal,
    }));

    setCartItems(normalized);
    localStorage.setItem('cart', JSON.stringify(normalized));
  }, [cartsData]);


  const addToCart = async (product, quantity = 1) => {
    const title = product.title || product.name;
    const thumbnail = product.thumbnail || product.image || product.images?.[0];
    const priceBdt = Math.round(Number(product.price ?? 0) * 110);
    const price = priceBdt;

    // Use local optimistic update first

    setCartItems((prevCart) => {
      const existing = prevCart.find((it) => String(it.id) === String(product.id));
      const nextQty = (existing?.quantity || 0) + quantity;

      const discountPercentage = Number(existing?.discountPercentage ?? product.discountPercentage ?? 0);
      const total = price * nextQty;
      const discountedTotal = total * (1 - discountPercentage / 100);

      const normalized = {
        id: product.id,
        title,
        price,
        quantity: nextQty,
        total,
        discountPercentage,
        discountedTotal,
        thumbnail,

        // UI compat
        name: title,
        image: thumbnail,
      };

      if (existing) {
        return prevCart.map((it) => (String(it.id) === String(product.id) ? { ...it, ...normalized } : it));
      }
      return [...prevCart, normalized];
    });

    // Then persist to backend
    try {
      const existing = cartItems.find((it) => String(it.id) === String(product.id));
      const discountPercentage = Number(existing?.discountPercentage ?? product.discountPercentage ?? 0);
      const nextQty = (existing?.quantity || 0) + quantity;
      const total = price * nextQty;
      const discountedTotal = total * (1 - discountPercentage / 100);

      const payload = {
        id: product.id,
        title,
        price,
        quantity: nextQty,
        total,
        discountPercentage,
        discountedTotal,
        thumbnail,
      };

      if (existing) {
        await updateCart({ id: existing.id, ...payload }).unwrap();
      } else {
        await createCart(payload).unwrap();
      }
      await refetch();
    } catch (e) {
      // keep optimistic cart if API fails
      console.error('Cart API error:', e);
    }
  };

  const removeFromCart = async (productId) => {
    const existing = cartItems.find((it) => String(it.id) === String(productId));

    setCartItems((prev) => prev.filter((it) => String(it.id) !== String(productId)));

    try {
      if (existing) {
        await deleteCart(existing.id).unwrap();
        await refetch();
      }
    } catch (e) {
      console.error('Cart delete API error:', e);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    setCartItems((prevCart) => {
      const existing = prevCart.find((it) => String(it.id) === String(productId));
      if (!existing) return prevCart;

      const discountPercentage = Number(existing.discountPercentage ?? 0);
      const total = Number(existing.price) * quantity;
      const discountedTotal = total * (1 - discountPercentage / 100);

      return prevCart.map((it) =>
        String(it.id) === String(productId)
          ? {
              ...it,
              quantity,
              total,
              discountPercentage,
              discountedTotal,
            }
          : it
      );
    });

    try {
      const existing = cartItems.find((it) => String(it.id) === String(productId));
      if (!existing) return;

      const discountPercentage = Number(existing.discountPercentage ?? 0);
      const total = Number(existing.price) * quantity;
      const discountedTotal = total * (1 - discountPercentage / 100);

      await updateCart({
        id: existing.id,
        title: existing.title,
        price: existing.price,
        quantity,
        total,
        discountPercentage,
        discountedTotal,
        thumbnail: existing.thumbnail,
      }).unwrap();
      await refetch();
    } catch (e) {
      console.error('Cart update API error:', e);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    // We intentionally do not call bulk-delete without endpoint spec.
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
