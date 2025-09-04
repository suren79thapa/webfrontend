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
        params: { search: query },
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map((p) => ({ type: "Product", id: p._id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    addProduct: builder.mutation({
      query: (q) => ({
        url: "/products",
        body: q.data,
        headers: { Authorization: q.token },
        method: "POST",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    reviewProduct: builder.mutation({
      query: (q) => ({
        url: `/products/reviews/${q.id}`,
        body: q.data,
        headers: { Authorization: q.token },
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        headers: { Authorization: q.token },
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id },
      ],
    }),

    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        body: q.data,
        headers: { Authorization: q.token },
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
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
