import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { Shift } from "../model/shiftType";

export const shiftApi = createApi({
  reducerPath: "shiftApi",
  baseQuery: APIFetchBase,
  tagTypes: ["ShiftApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    postShift: builder.mutation<Shift, any>({
      query: (args) => ({
        method: "POST",
        url: "/ShiftSchedule",
        body: args,
      }),
      invalidatesTags: ["ShiftApi"],
    }),
    putShift: builder.mutation<Shift,  { id: string }>({
      query:  ({ ...body }) => ({
        method: "PUT",
        url: `/ShiftSchedule/${body.id}`,
        body,
      }),
      invalidatesTags: ["ShiftApi"],
    }),
     getallshift: builder.query<{ items: Shift[]; metaData: MetaData },any>({
          query: (args) => ({
            method: "GET",
            url: "/ShiftSchedule",
            params: {
              ...args,
            },
          }),
          transformResponse: (response, metaData) =>
            dataWithMeta<Shift[], MetaData>(
              response as Shift[],
              metaData as any
            ),
          providesTags: ["ShiftApi"],
        }),
  }),
});

export const
 { 
  usePostShiftMutation,
  useGetallshiftQuery,
  usePutShiftMutation,
 } = shiftApi;
