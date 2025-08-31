import { mainApi } from "../../app/mainApi.js";
import { getToken } from "../../utils/getToken.js";

const orderApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        headers: {
          Authorization: getToken(),
        },
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/orders",
        body: data,
        headers: {
          Authorization: getToken(),
        },
        method: "POST",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrderQuery, useGetOrdersQuery, useCreateOrderMutation } =
  orderApi;
