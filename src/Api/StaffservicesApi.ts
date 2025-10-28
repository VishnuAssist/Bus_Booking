import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { leaverequesttype } from "../model/LeaveRequest";

export const StaffserviceApi = createApi({
  reducerPath: "StaffserviceApi",
  baseQuery: APIFetchBase,
  tagTypes: ["LeaveApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    postLeave: builder.mutation<leaverequesttype, any>({
      query: (args) => ({
        method: "POST",
        url: "/LeaveRequest",
        body: args,
      }),
      invalidatesTags: ["LeaveApi"],
    }),
     getallLeaves: builder.query<{ items: leaverequesttype[]; metaData: MetaData },any>({
              query: (args) => ({
                method: "GET",
                url: "/LeaveRequest",
                params: {
                  ...args,
                },
              }),
              transformResponse: (response, metaData) =>
                dataWithMeta<leaverequesttype[], MetaData>(
                  response as leaverequesttype[],
                  metaData as any
                ),
              providesTags: ["LeaveApi"],
            }),
             deleteLeave: builder.mutation<any, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/LeaveRequest/${id}`,
      }),
      invalidatesTags: ["LeaveApi"],
    }),  
    putLeaves: builder.mutation<leaverequesttype,  { id: number }>({
          query:  ({ ...body }) => ({
            method: "PUT",
            url: `/LeaveRequest/${body.id}`,
            body,
          }),
          invalidatesTags: ["LeaveApi"],
        }),
  }),
});

export const
 { 
  usePostLeaveMutation,
  useGetallLeavesQuery,
  useDeleteLeaveMutation,
  usePutLeavesMutation,
 } = StaffserviceApi;
