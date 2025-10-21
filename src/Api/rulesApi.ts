import { createApi } from "@reduxjs/toolkit/query/react";
import type { QueryParamsType } from "../Dto/formDto";
import APIFetchBase from "../Store/ApiConfig";
import type {
  RuleType,
  RuleSchemaType,
  CommissionType,
  CountryType,
  ProcessRequestType,
  MonthlySummarriesType,
  StaffCommissionResponseType,
} from "../model/rulesType";

export const rulesApi = createApi({
  reducerPath: "rulesApi",
  baseQuery: APIFetchBase,
  tagTypes: ["Rules", "RuleSchema", "Commissions"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    // Get all rules
    getRules: builder.query<RuleType[], { params?: QueryParamsType }>({
      query: (args) => ({
        method: "GET",
        url: "/Rules",
        params: args?.params,
      }),
      providesTags: ["Rules"],
    }),

    // Create new rule
    createRule: builder.mutation<RuleType, { data: Partial<RuleType> }>({
      query: (args) => ({
        method: "POST",
        url: "/Rules",
        body: args.data,
      }),
      invalidatesTags: ["Rules"],
    }),

    // Get rule by ID
    getRuleById: builder.query<RuleType, { id: string | number }>({
      query: (args) => ({
        method: "GET",
        url: `/Rules/${args.id}`,
      }),
      providesTags: ["Rules"],
    }),

    // Update rule by ID
    updateRule: builder.mutation<
      RuleType,
      { id: string | number; data: Partial<RuleType> }
    >({
      query: (args) => ({
        method: "PUT",
        url: `/Rules/${args.id}`,
        body: args.data,
      }),
      invalidatesTags: ["Rules"],
    }),

    // Delete rule by ID
    deleteRule: builder.mutation<void, { id: string | number }>({
      query: (args) => ({
        method: "DELETE",
        url: `/Rules/${args.id}`,
      }),
      invalidatesTags: ["Rules"],
    }),

    // Get rule schema
    getRuleSchema: builder.query<RuleSchemaType, void>({
      query: () => ({
        method: "GET",
        url: `/Rules/schema`,
      }),
      providesTags: ["RuleSchema"],
    }),

    // Get commissions
    getCommissions: builder.query<
      CommissionType[],
      { params?: QueryParamsType }
    >({
      query: (args) => ({
        method: "GET",
        url: "/Rules/commissions",
        params: args?.params,
      }),
      providesTags: ["Commissions"],
    }),

    // Get staff commissions
    getStaffCommissions: builder.query<
      StaffCommissionResponseType[],
      MonthlySummarriesType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Rules/staff-commissions",
        params: args,
      }),
    }),

    // Get monthly summarries
    getMonthlySummarries: builder.query<
      CommissionType[],
      MonthlySummarriesType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Rules/monthly-summarries",
        params: args,
      }),
    }),

    // Process rule
    processRule: builder.mutation<any, { data: ProcessRequestType }>({
      query: (args) => ({
        method: "POST",
        url: "/Rules/process",
        body: args.data,
      }),
      invalidatesTags: ["Rules"],
    }),

    // Test rule
    testRule: builder.mutation<any, { data: any }>({
      query: (args) => ({
        method: "POST",
        url: "/Rules/test",
        body: args.data,
      }),
      invalidatesTags: ["Rules"],
    }),

    // Get countries
    getCountries: builder.query<CountryType[], { params?: QueryParamsType }>({
      query: (args) => ({
        method: "GET",
        url: "/Common/GetCountries",
        params: args?.params,
      }),
    }),
  }),
});

export const {
  useGetRulesQuery,
  useCreateRuleMutation,
  useGetRuleByIdQuery,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
  useGetRuleSchemaQuery,
  useGetCommissionsQuery,
  useProcessRuleMutation,
  useTestRuleMutation,
  useGetCountriesQuery,
  useGetStaffCommissionsQuery,
  useGetMonthlySummarriesQuery,
} = rulesApi;
