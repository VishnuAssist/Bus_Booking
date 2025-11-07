/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to allow generating React hooks

import { createApi } from "@reduxjs/toolkit/query/react";

;
import { rolesType } from "../models/UserType";


import customFetchBase from ".";
import type { StoreUser } from "./storeUserType";
import type { QueryParamsType } from "../../../model/commonType";

// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAllusers: builder.query<
      { data: StoreUser[]; meta: any },
      QueryParamsType
    >({
      query: (args) => ({
        method: "GET",
        url: "api-users",
        params: {
          ...args,
        },
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query<StoreUser, string>({
      query: (id) => {
        return {
          method: "GET",
          url: `api-users/${id}`,
        };
      },
      providesTags: ["User"],
    }),
    addUser: builder.mutation<StoreUser, StoreUser>({
      query: (args) => {
        return {
          method: "POST",
          url: "api-users",
          body: args,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<StoreUser, StoreUser>({
      query: (args) => {
        return {
          method: "DELETE",
          url: `api-users/${args.id}`,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUserById: builder.mutation<StoreUser, StoreUser>({
      query: (args) => {
        return {
          method: "PATCH",
          url: `api-users/${args.id}`,
          body: args,
        };
      },
      invalidatesTags: ["User"],
    }),
    getAllRoles: builder.query<{ roles: rolesType[] }, StoreUser>({
      query: () => ({
        method: "GET",
        url: "api-users/roles",
      }),
    }),
  }),
});

export const {
  useGetAllusersQuery,
  useGetAllRolesQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useLazyGetUserByIdQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} = userApi;
