// src/api/storeTargetApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { QueryParamsType } from "../Dto/formDto";
import type {
  ProcessStoreTargetRequest,
  StoreTargetDto,
} from "../model/storeTargetType";

export const storeTargetApi = createApi({
  reducerPath: "storeTargetApi",
  baseQuery: APIFetchBase,
  tagTypes: ["StoreTarget"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getAllStoreTargets: builder.query<
      { items: StoreTargetDto[]; metaData: MetaData },
      Partial<QueryParamsType & { StoreId?: number }>
    >({
      query: (params) => ({
        method: "GET",
        url: "/Targets",
        params,
      }),
      transformResponse: (response: StoreTargetDto[], meta: MetaData) =>
        dataWithMeta<StoreTargetDto[], MetaData>(response, meta),
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
    addStoreTarget: builder.mutation<StoreTargetDto, StoreTargetDto>({
      query: (dto) => ({
        method: "POST",
        url: "/Targets",
        body: dto,
      }),
      invalidatesTags: [{ type: "StoreTarget", id: "LIST" }],
    }),

    // Edit Store Target
    editStoreTarget: builder.mutation<void, StoreTargetDto>({
      query: ({ id, ...body }) => ({
        method: "PUT",
        url: `/Targets/${id}`,
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
        url: `/Targets/${id}`,
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
        url: "/Targets/process-target",
        body: request,
      }),
      invalidatesTags: [{ type: "StoreTarget", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllStoreTargetsQuery,
  useAddStoreTargetMutation,
  useEditStoreTargetMutation,
  useDeleteStoreTargetMutation,
  useProcessStoreTargetMutation,
} = storeTargetApi;
