import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
    endpoints: (build) => ({
    getProducts: build.query({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
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

export const { useGetProductsQuery, useRegisterUserMutation } = apiService;
