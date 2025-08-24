import { mainApi } from "../../app/mainApi.js";

export const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (q) => ({
        url: "/products",
        body: q,
        headers: {
          Authorization: q.token,
        },
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
} = productApi;
