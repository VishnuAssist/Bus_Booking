import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { userGroupType } from "../model/userGroup";

export const userGroupApi = createApi({
  reducerPath: "userGroupApi",
  baseQuery: APIFetchBase,
  tagTypes: ["UserGroup"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    
    
    getAllUserGroups: builder.query<
      { items: userGroupType[]; metaData: MetaData },
      any
    >({
      query: (args) => ({
        method: "GET",
        url: "/UserGroup",
        params: { ...args },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<userGroupType[], MetaData>(
          response as userGroupType[],
          metaData as any
        ),
      providesTags: ["UserGroup"],
    }),

    
    getUserGroupById: builder.query<userGroupType, number>({
      query: (id) => ({
        method: "GET",
        url: `/UserGroup/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "UserGroup", id }],
    }),

    
    addEditUserGroup: builder.mutation<any, userGroupType>({
      query: (args) => ({
        method: args?.id ? "PUT" : "POST",
        url: "/UserGroup",
        body: args,
      }),
      invalidatesTags: ["UserGroup"],
    }),

    
    deleteUserGroup: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/UserGroup/${id}`,
      }),
      invalidatesTags: ["UserGroup"],
    }),
  }),
});

export const {
  useGetAllUserGroupsQuery,
  useGetUserGroupByIdQuery,
  useAddEditUserGroupMutation,
  useDeleteUserGroupMutation,
} = userGroupApi;
