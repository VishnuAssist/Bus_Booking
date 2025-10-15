import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { Shift, ShiftType } from "../model/shiftType";

export const shiftApi = createApi({
  reducerPath: "shiftApi",
  baseQuery: APIFetchBase,
  tagTypes: ["ShiftApi"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    postShift: builder.mutation<Shift, ShiftType>({
      query: (args) => ({
        method: "POST",
        url: "api/ShiftSchedule",
        body: args,
      }),
      invalidatesTags: ["ShiftApi"],
    }),
  }),
});

export const { usePostShiftMutation } = shiftApi;
