import { createApi } from "@reduxjs/toolkit/query/react";
import APIFetchBase from "../Store/ApiConfig";
import type { MetaData } from "../model/common";
import { dataWithMeta } from "../Lib/ApiUtil";
import type { SalesType,  } from "../model/salesType";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: APIFetchBase,
  tagTypes: ["Sales"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    // Get all sales with pagination and filtering
    getAllSales: builder.query<
      { items: SalesType[]; metaData: MetaData },
      any
    >({
      query: (args) => ({
        method: "GET",
        url: "/Sales",
        params: {
          ...args,
        },
      }),
      transformResponse: (response, metaData) =>
        dataWithMeta<SalesType[], MetaData>(
          response as SalesType[],
          metaData as any
        ),
      providesTags: ["Sales"],
    }),

    // Get single sale by ID
    getSale: builder.query<SalesType, number>({
      query: (id) => ({
        method: "GET",
        url: `/Sales/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Sales", id }],
    }),



    // Add or Edit sale (combined endpoint)
    addEditSale: builder.mutation<any, any>({
      query: (args) => ({
        method: args?.id ? "PUT" : "POST",
        url: "/Sales",
        body: args,
      }),
      invalidatesTags: ["Sales"],
    }),

    // Delete sale
    deleteSale: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/Sales/${id}`,
      }),
      invalidatesTags: ["Sales"],
    }),

   // Bulk import sales via CSV
bulkImportSales: builder.mutation<any, File>({
  query: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return {
      method: "POST",
      url: "/Sales/bulk-import",
      body: formData,
    };
  },
  invalidatesTags: ["Sales"],
}),

  }),
});

export const {
  useGetAllSalesQuery,
  useGetSaleQuery,

  useAddEditSaleMutation,
  useDeleteSaleMutation,
    useBulkImportSalesMutation,
} = salesApi;