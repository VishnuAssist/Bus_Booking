import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { attendanceType } from "../model/attendanceType";
import type { AttendanceQueryParamsType } from "../model/attendanceType";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: APIFetchBase,
  tagTypes: ["Attendance"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getAllAttendance: builder.query<
      { items: attendanceType[]; metaData: MetaData },
      AttendanceQueryParamsType
    >({
      query: (args) => ({
        method: "GET",
        url: "/Attendance",
        params: {
          ...args,
        },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<attendanceType[], MetaData>(
          response as attendanceType[],
          metaData as MetaData
        ),
      providesTags: ["Attendance"],
    }),

    getAttendanceById: builder.query<attendanceType, number>({
      query: (id) => ({
        method: "GET",
        url: `/Attendance/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Attendance", id }],
    }),
    addEditAttendance: builder.mutation<attendanceType, attendanceType>({
      query: (args) => ({
        method: args?.id ? "PUT" : "POST",
        url: args?.id ? `/Attendance/${args.id}` : "/Attendance",
        body: args,
      }),
      invalidatesTags: ["Attendance"],
    }),
    deleteAttendance: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/Attendance/${id}`,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAllAttendanceQuery,
  useGetAttendanceByIdQuery,
  useAddEditAttendanceMutation,
  useDeleteAttendanceMutation,
} = attendanceApi;
