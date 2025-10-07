import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { formatErrorMessage, showErrorToast, showSuccessToast } from "../Lib/ApiUtil";
import type { RootState } from "./StoreConfig";
import { addTokensAndUser, removeTokensAndUser, setSessionExpired } from "./slice/Account";

const mutex = new Mutex();

const baseUrl = import.meta.env.VITE_BASE_URL + "/api";


const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth?.account?.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const APIFetchBase: BaseQueryFn<FetchArgs, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();
  let result: any = await baseQuery(args, api, extraOptions);



  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
       
        const state = api.getState() as RootState;
        const refreshToken = state.auth?.account?.refreshToken;

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "/Account/refresh",
              method: "POST",
              body: {
                refreshToken,
                token: state.auth?.account?.accessToken,
              },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            api.dispatch(
              addTokensAndUser(
                refreshResult.data as {
                  accessToken: string;
                  refreshToken: string;
                  
                }
              )
            );
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(setSessionExpired(true));
            api.dispatch(removeTokensAndUser());
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }


 if (result?.error) {
  const message = formatErrorMessage(result.error);
  showErrorToast(message);
} else {
  const method = result?.meta?.request?.method?.toUpperCase();
  const requestUrl = result?.meta?.request?.url ?? "";

  const excludedUrls = ["/account/login", "/Account/refresh"];
  const isExcluded = excludedUrls.some(url => requestUrl.includes(url));

  if (!isExcluded) {
    const responseData: any = result.data;
    const customMessage = responseData?.message || responseData?.data?.message;

    if (customMessage) {
      showSuccessToast(customMessage);
    } else if (method === "POST") {
      showSuccessToast("Created successfully");
    } else if (method === "PUT") {
      showSuccessToast("Updated successfully");
    } else if (method === "DELETE") {
      showSuccessToast("Deleted successfully");
    }
  }
}

  return result;
};

export default APIFetchBase;
