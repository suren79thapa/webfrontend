import { mainApi } from "../../app/mainApi.js";

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (token) => ({
        url: "/users",
        headers: {
          Authorization: token,
        },
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (query) => ({
        url: "/users/update",
        body: query.data,
        headers: {
          Authorization: query.token,
        },
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
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
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
