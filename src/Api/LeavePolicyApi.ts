import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
// import type { leaverequesttype, LeaveSummary } from "../model/LeaveRequest";
import type { LeavePolicy } from "../model/LeavePolicy";

export const LeavePolicyApi = createApi({
  reducerPath: "LeavePolicyApi",
  baseQuery: APIFetchBase,
  tagTypes: ["LeavePolicy"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getallLeavesPolicy: builder.query<
      { items: LeavePolicy[]; metaData: MetaData },
      any
    >({
      query: (args) => ({
        method: "GET",
        url: "/LeavePolicy",
        params: {
          ...args,
        },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<LeavePolicy[], MetaData>(
          response as LeavePolicy[],
          metaData as any
        ),
      providesTags: ["LeavePolicy"],
    }),
    getByIdPolicyId: builder.mutation<any, number>({
      query: (id) => ({
        method: "GET",
        url: `/LeavePolicy/${id}`,
      }),
      invalidatesTags: ["LeavePolicy"],
    }),

    addEditLeavePolicy: builder.mutation<LeavePolicy, LeavePolicy>({
      query: (body) => ({
        method: body?.id ? "PUT" : "POST",
        url: body?.id ? `/LeavePolicy/${body.id}` : "/LeavePolicy",
        body,
      }),
      invalidatesTags: ["LeavePolicy"],
    }),

    deleteLeave: builder.mutation<any, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/LeaveRequest/${id}`,
      }),
      invalidatesTags: ["LeavePolicy"],
    }),
  }),
});

export const {
    useGetallLeavesPolicyQuery,
    useAddEditLeavePolicyMutation,
    useDeleteLeaveMutation,
    useGetByIdPolicyIdMutation
} = LeavePolicyApi;
