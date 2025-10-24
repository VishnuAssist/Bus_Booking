// src/api/storeApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { StoreDto } from "../model/storeType";
import type { QueryParamsType } from "../Dto/formDto";

export const storeApi = createApi({
  reducerPath: "storeApi",
  baseQuery: APIFetchBase,
  tagTypes: ["Store"],
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
  }),
});

export const {
  useGetAllStoresQuery,
  useGetStoreByIdQuery,
  useAddStoreMutation,
  useEditStoreMutation,
  useDeleteStoreMutation,
} = storeApi;
