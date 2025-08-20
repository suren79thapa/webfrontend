import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/appUrl.js";

export const authApi = mainApi.injectEndPoints({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        body: data,
        method: "POST",
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        body: data,
        method: "POST",
      }),
    }),
  }),
});
export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
