import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type {
  ProcessStaffCommissionPayload,
  ProcessMonthlySummaryPayload,
  StaffCommissionResponseType,
  MonthlySummarriesQueryParamsType,
  StaffMonthlySummaryResponseType,
} from "../model/commissionType";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";

export const commissionApi = createApi({
  reducerPath: "commissionApi",
  baseQuery: APIFetchBase,
  tagTypes: ["commissionApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getStaffCommissions: builder.query<
      { items: StaffCommissionResponseType[]; metaData: MetaData },
      MonthlySummarriesQueryParamsType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Staff/commissions",
        params: args,
      }),
      transformResponse: (
        response: StaffCommissionResponseType[],
        meta: MetaData
      ) =>
        dataWithMeta<StaffCommissionResponseType[], MetaData>(response, meta),
    }),

    getMonthlySummarries: builder.query<
      { items: StaffMonthlySummaryResponseType[]; metaData: MetaData },
      MonthlySummarriesQueryParamsType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Staff/summaries",
        params: args,
      }),
      transformResponse: (
        response: StaffMonthlySummaryResponseType[],
        meta: MetaData
      ) =>
        dataWithMeta<StaffMonthlySummaryResponseType[], MetaData>(
          response,
          meta
        ),
    }),

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
