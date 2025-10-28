// src/api/storeApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { StoreDto } from "../model/storeType";
import type { QueryParamsType } from "../Dto/formDto";
import type {
  ProcessStoreTargetRequest,
  StoreKPIDto,
  StoreMonthlyTargetDto,
} from "../model/storeTargetType";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: APIFetchBase,
  tagTypes: ["Store", "StoreTarget", "StoreKPI"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getAllStores: builder.query<
      { items: StoreDto[]; metaData: MetaData },
      Partial<QueryParamsType>
    >({
      query: (params) => ({
        method: "GET",
        url: "/Store",
        params,
      }),
      transformResponse: (response: StoreDto[], meta: any) =>
        dataWithMeta<StoreDto[], MetaData>(response, meta),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ storeId }) => ({
                type: "Store" as const,
                id: storeId,
              })),
              { type: "Store", id: "LIST" },
            ]
          : [{ type: "Store", id: "LIST" }],
    }),

    getStoreById: builder.query<StoreDto, number>({
      query: (id) => ({
        method: "GET",
        url: `/Store/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Store", id }],
    }),

    addStore: builder.mutation<StoreDto, StoreDto>({
      query: (dto) => ({
        method: "POST",
        url: "/Store",
        body: dto,
      }),
      invalidatesTags: [{ type: "Store", id: "LIST" }],
    }),

    editStore: builder.mutation<void, StoreDto>({
      query: ({ storeId, ...body }) => ({
        method: "PUT",
        url: `/Store/${storeId}`,
        body,
      }),
      invalidatesTags: (_, _error, { storeId }) => [
        { type: "Store", id: storeId },
        { type: "Store", id: "LIST" },
      ],
    }),

    deleteStore: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/Store/${id}`,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Store", id },
        { type: "Store", id: "LIST" },
      ],
    }),
    getAllStoreTargets: builder.query<
      { items: StoreMonthlyTargetDto[]; metaData: MetaData },
      Partial<QueryParamsType & { StoreId?: number }>
    >({
      query: (params) => ({
        method: "GET",
        url: "/Store/targets",
        params,
      }),
      transformResponse: (response: StoreMonthlyTargetDto[], meta: any) =>
        dataWithMeta<StoreMonthlyTargetDto[], MetaData>(response, meta),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "StoreTarget" as const,
                id,
              })),
              { type: "StoreTarget", id: "LIST" },
            ]
          : [{ type: "StoreTarget", id: "LIST" }],
    }),

    // Add Store Target
    addStoreTarget: builder.mutation<
      StoreMonthlyTargetDto,
      StoreMonthlyTargetDto
    >({
      query: (dto) => ({
        method: "POST",
        url: "/Store/targets",
        body: dto,
      }),
      invalidatesTags: [{ type: "StoreTarget", id: "LIST" }],
    }),

    // Edit Store Target
    editStoreTarget: builder.mutation<void, StoreMonthlyTargetDto>({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/Store/targets/${id}`,
        body,
      }),
      invalidatesTags: (_, _error, { id }) => [
        { type: "StoreTarget", id },
        { type: "StoreTarget", id: "LIST" },
      ],
    }),

    // Delete Store Target
    deleteStoreTarget: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/Store/targets/${id}`,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "StoreTarget", id },
        { type: "StoreTarget", id: "LIST" },
      ],
    }),

    // Process Store Target
    processStoreTarget: builder.mutation<void, ProcessStoreTargetRequest>({
      query: (request) => ({
        method: "POST",
        url: "/Store/process-store-target",
        body: request,
      }),
      invalidatesTags: [{ type: "StoreTarget", id: "LIST" }],
    }),

    // Get Store KPIs
    getStoreKPIs: builder.query<
      { items: StoreKPIDto[]; metaData: MetaData },
      { storeTargetId: number; params?: Partial<QueryParamsType> }
    >({
      query: ({ storeTargetId, params }) => ({
        method: "GET",
        url: `/Store/targets/${storeTargetId}/kpis`,
        params,
      }),
      transformResponse: (response: StoreKPIDto[], meta: any) =>
        dataWithMeta<StoreKPIDto[], MetaData>(response, meta),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "StoreKPI" as const,
                id,
              })),
              { type: "StoreKPI", id: "LIST" },
            ]
          : [{ type: "StoreKPI", id: "LIST" }],
    }),

    // Add Store KPI
    addStoreKPI: builder.mutation<StoreKPIDto, StoreKPIDto>({
      query: (dto) => ({
        method: "POST",
        url: "/Store/kpis",
        body: dto,
      }),
      invalidatesTags: [{ type: "StoreKPI", id: "LIST" }],
    }),

    // Edit Store KPI
    editStoreKPI: builder.mutation<void, StoreKPIDto>({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/Store/kpis/${id}`,
        body,
      }),
      invalidatesTags: (_, _error, { id }) => [
        { type: "StoreKPI", id },
        { type: "StoreKPI", id: "LIST" },
      ],
    }),

    // Delete Store KPI
    deleteStoreKPI: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/Store/kpis/${id}`,
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "StoreKPI", id },
        { type: "StoreKPI", id: "LIST" },
      ],
    }),

    // Process Store KPI
    processStoreKPI: builder.mutation<void, ProcessStoreTargetRequest>({
      query: (request) => ({
        method: "POST",
        url: "/Store/process-store-kpi",
        body: request,
      }),
      invalidatesTags: [{ type: "StoreKPI", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllStoresQuery,
  useGetStoreByIdQuery,
  useAddStoreMutation,
  useEditStoreMutation,
  useDeleteStoreMutation,
  useGetAllStoreTargetsQuery,
  useAddStoreTargetMutation,
  useEditStoreTargetMutation,
  useDeleteStoreTargetMutation,
  useProcessStoreTargetMutation,
  useGetStoreKPIsQuery,
  useAddStoreKPIMutation,
  useEditStoreKPIMutation,
  useDeleteStoreKPIMutation,
  useProcessStoreKPIMutation,
} = storeApi;
