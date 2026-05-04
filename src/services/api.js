import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
    endpoints: (build) => ({
    getProducts: build.query({
      query: ({ limit, skip, search = '' }) => {
        const params = new URLSearchParams({ limit, skip });
        if (search.trim()) {
          params.append('search', search.trim());
        }
        return `/products?${params}`;
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
  })
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery, useRegisterUserMutation, useLoginUserMutation } = apiService;

