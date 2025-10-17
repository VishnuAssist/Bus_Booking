import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { dictionarycategoryType, dictionarytype } from "../model/Dictionary";

export const dictionaryApi = createApi({
  reducerPath: "dictionaryApi",
  baseQuery: APIFetchBase,
  tagTypes: ["DictionaryApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getalldictionary: builder.query<
      { items: dictionarytype[]; metaData: MetaData },
      any
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
          metaData as any
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
    addEditdictionary: builder.mutation<any, FormData>({
      query: (args) => ({
        method: args?.get("id") ? `PUT` : "POST",
        url: "/Dictionary",
        body: args,
      }),
      invalidatesTags: ["DictionaryApi"],
    }),
  }),
});

export const { useGetalldictionaryQuery,useGetcategoriesQuery,useAddEditdictionaryMutation } = dictionaryApi;
