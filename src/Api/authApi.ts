import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { loginType, UserLoginType } from "../Dto/authDto";
import type { MetaData } from "../model/commonType";
import type { UserList } from "../model/userType";
import { dataWithMeta } from "../Lib/ApiUtil";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: APIFetchBase,
  tagTypes: ["AccountApi"],
  endpoints: (builder) => ({
    login: builder.mutation<UserLoginType, loginType>({
      query: (payload: loginType) => {
        return {
          method: "POST",
          url: "/Account/login",
          body: payload,
        };
      },
    }),
    passwordRequest: builder.mutation<string, string>({
      query: (payload: string) => {
        return {
          method: "POST",
          url: "/Account/reset-password-request",
          body: `"${payload}"`,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation<any, any>({
      query: (payload: any) => {
        return {
          method: "POST",
          url: "/Account/reset-password",
          body: payload,
        };
      },
    }),
    getallAccount: builder.query<
      { items: UserList[]; metaData: MetaData },
      any
    >({
      query: (args) => ({
        method: "GET",
        url: "/Account/all",
        params: {
          ...args,
        },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<UserList[], MetaData>(
          response as UserList[],
          metaData as any
        ),
      providesTags: ["AccountApi"],
    }),
    logout: builder.mutation<
      { status: number; message: string },
      number | undefined
    >({
      query: (userId: number) => {
        return {
          method: "POST",
          url: `/account/logout/${userId}`,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  usePasswordRequestMutation,
  useResetPasswordMutation,
  useGetallAccountQuery,
} = authApi;
