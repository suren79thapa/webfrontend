import { mainApi } from "../../app/mainApi.js";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
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
      invalidatesTags: ["Product"],
    }),
    editProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        headers: {
          Authorization: q.token,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} = productApi;
