import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ limit, skip, search = '' }) => {
        if (search.trim()) {
          return `/products/search?q=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`;
        }
        return `/products?limit=${limit}&skip=${skip}`;
      },
    }),
    getCategories: build.query({
      query: () => '/products/category-list',
    }),
    getProductsByCategory: build.query({
      query: ({ category, limit, skip }) => `/products/category/${category}?limit=${limit}&skip=${skip}`,
    }),
    getProductById: build.query({
      query: (id) => `/products/${id}`,
    }),

    // CART (backend comes from `/api/carts`)
    getCarts: build.query({
      query: () => '/carts',
    }),
    createCart: build.mutation({
      query: (cartItem) => ({
        url: '/carts',
        method: 'POST',
        body: cartItem,
      }),
    }),
    updateCart: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `/carts/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteCart: build.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
    }),

    registerUser: build.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [],
    }),
    loginUser: build.mutation({
      query: ({ username, password }) => ({
        url: 'https://dummyjson.com/auth/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCartsQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
} = apiService;

