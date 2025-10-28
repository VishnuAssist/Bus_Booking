import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { StatusResponse } from "../model/LeaveRequest";
import type {
  dictionarycategoryType,
  DictionaryQueryParamsType,
  dictionarytype,
} from "../model/Dictionary";

export const dictionaryApi = createApi({
  reducerPath: "dictionaryApi",
  baseQuery: APIFetchBase,
  tagTypes: ["DictionaryApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getalldictionary: builder.query<
      { items: dictionarytype[]; metaData: MetaData },
      DictionaryQueryParamsType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Dictionary",
        params: {
          ...args,
        },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<dictionarytype[], MetaData>(
          response as dictionarytype[],
          metaData as MetaData
        ),
      providesTags: ["DictionaryApi"],
    }),
    getcategories: builder.query<
      { categories: dictionarycategoryType[] },
      void
    >({
      query: () => ({
        method: "GET",
        url: "/Dictionary/filters",
      }),
    }),
    getstatus: builder.query<StatusResponse,
      void
    >({
      query: () => ({
        method: "GET",
        url: "/Dictionary/statuses",
      }),
    }),
    addEditdictionary: builder.mutation<dictionarytype, FormData>({
      query: (args) => ({
        method: args?.get("id") ? `PUT` : "POST",
        url: "/Dictionary",
        body: args,
      }),
      invalidatesTags: ["DictionaryApi"],
    }),
    deleteDictionary: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/Dictionary/${id}`,
      }),
      invalidatesTags: ["DictionaryApi"],
    }),
  }),
});

export const { useGetalldictionaryQuery,useGetcategoriesQuery,useAddEditdictionaryMutation,useDeleteDictionaryMutation,useGetstatusQuery } = dictionaryApi;

