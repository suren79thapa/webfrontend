import { mainApi } from "../../app/mainApi.js";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopProducts: builder.query({
      query: () => ({
        url: "/top-5-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: (query) => ({
        url: "/products",
        params: {
          search: query,
        },
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (q) => ({
        url: "/products",
        body: q.data,
        headers: {
          Authorization: q.token,
        },
        method: "POST",
      }),
      invalidatesTags: ["Product", "ID"],
    }),

    reviewProduct: builder.mutation({
      query: (q) => ({
        url: `/products/reviews/${q.id}`,
        body: q.data,
        headers: {
          Authorization: q.token,
        },
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        headers: {
          Authorization: q.token,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Product", "ID"],
    }),

    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        body: q.data,
        headers: {
          Authorization: q.token,
        },
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetTopProductsQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
  useReviewProductMutation,
} = productApi;
