import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
    endpoints: (build) => ({
    getProducts: build.query({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
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
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery, useRegisterUserMutation } = apiService;
