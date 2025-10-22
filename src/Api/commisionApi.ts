import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type {
  ProcessStaffCommissionPayload,
  ProcessMonthlySummaryPayload,
  StaffCommissionResponseType,
  MonthlySummarriesQueryParamsType,
} from "../model/commissionType";

export const commissionApi = createApi({
  reducerPath: "commissionApi",
  baseQuery: APIFetchBase,
  tagTypes: ["commissionApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getStaffCommissions: builder.query<
      StaffCommissionResponseType[],
      MonthlySummarriesQueryParamsType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Staff/commissions",
        params: args,
      }),
    }),

    getMonthlySummarries: builder.query<void, MonthlySummarriesQueryParamsType>(
      {
        query: (args) => ({
          method: "GET",
          url: "/Staff/summarries",
          params: args,
        }),
      }
    ),

    processStaffCommission: builder.mutation<
      void,
      ProcessStaffCommissionPayload
    >({
      query: (payload) => ({
        url: "staff/process-staff-commission",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["commissionApi"],
    }),

    processMonthlySummary: builder.mutation<void, ProcessMonthlySummaryPayload>(
      {
        query: (payload) => ({
          url: "staff/process-monthly-summary",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["commissionApi"],
      }
    ),
  }),
});

export const {
  useGetStaffCommissionsQuery,
  useGetMonthlySummarriesQuery,
  useProcessStaffCommissionMutation,
  useProcessMonthlySummaryMutation,
} = commissionApi;
