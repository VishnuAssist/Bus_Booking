import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { CommissionData } from "../model/role";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: APIFetchBase,
  tagTypes: ["RolesApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    allCommisionData: builder.query<
      { items: CommissionData[]; metaData: MetaData },
      any
    >({
      query: (args) => ({
        method: "GET",
        url: "/Rules/commissions",
        params: {
          ...args,
        },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<CommissionData[], MetaData>(
          response as CommissionData[],
          metaData as any
        ),
      providesTags: ["RolesApi"],
    }),
  }),
});

export const { useAllCommisionDataQuery } = rolesApi;
