// import { createApi } from "@reduxjs/toolkit/query/react";
// import { CategoryType, DictionaryType1 } from "./DictionaryType";
// import { MetaData } from "../models/Pagination";
// import customFetchBase from "./customFetchBase";
// import type { QueryParamsType } from "../../../model/commonType";

// export const dictionaryApi = createApi({
//   reducerPath: "dictionaryApi",
//   baseQuery: customFetchBase,
//   tagTypes: ["Dictionary"],
//   keepUnusedDataFor: 0,
//   endpoints: (builder) => ({
//     alldictionary: builder.query<
//       { data: DictionaryType1[]; meta: MetaData },
//       QueryParamsType
//     >({
//       query: (args) => {
//         return {
//           method: "GET",
//           url: "dictionary",
//           params: {
//             ...args,
//           },
//         };
//       },
//       providesTags: ["Dictionary"],
//     }),
//     filterByStore: builder.query<
//       { data: DictionaryType1[]; meta: MetaData },
//       QueryParamsType
//     >({
//       query: (args) => {
//         return {
//           method: "GET",
//           url: "dictionary/filter-by-store",
//           params: {
//             ...args,
//           },
//         };
//       },
//       providesTags: ["Dictionary"],
//     }),
//     dictionarycategory: builder.query<CategoryType[], any>({
//       query: () => {
//         return {
//           method: "GET",
//           url: `dictionary/categories`,
//         };
//       },
//     }),

//     getdictionaryById: builder.query<DictionaryType1, number>({
//       query: (id) => ({
//         method: "GET",
//         url: `dictionary/${id}`,
//       }),
//       providesTags: ["Dictionary"],
//     }),
//     createDictionary: builder.mutation<DictionaryType1, DictionaryType1>({
//       query: (args) => {
//         return {
//           method: "POST",
//           url: "dictionary",
//           body: args,
//         };
//       },
//       invalidatesTags: ["Dictionary"],
//     }),
//     deletedictionary: builder.mutation<DictionaryType1, DictionaryType1>({
//       query: (args) => {
//         return {
//           method: "DELETE",
//           url: `dictionary/${args.id}`,
//         };
//       },
//       // invalidatesTags: ['Dictionary'],
//     }),
//     Updatedictionary: builder.mutation<DictionaryType1, DictionaryType1>({
//       query: (args) => {
//         return {
//           method: `PATCH`,
//           url: `dictionary/${args?.id}`,
//           body: args,
//         };
//       },
//       invalidatesTags: ["Dictionary"],
//     }),
//     getdictionaryCompanies: builder.query<CategoryType[], DictionaryType1>({
//       query: (args) => {
//         return {
//           method: "GET",
//           url: `/dictionary/companies-have-employees`,
//            params: args,
//         };
//       },
//       providesTags: ["Dictionary"],
//     }),
//     getdictionaryDepartment: builder.query<CategoryType[], DictionaryType1>({
//       query: (args) => {
//         return {
//           method: "GET",
//           url: `/dictionary/department-have-employees`,
//           params: args,
//         };
//       },
//       providesTags: ["Dictionary"],
//     }),
//     getdictionaryLocation: builder.query<CategoryType[], DictionaryType1>({
//       query: (args) => {
//         return {
//           method: "GET",
//           url: `/dictionary/location-have-employees`,
//            params: args,
//         };
//       },
//       providesTags: ["Dictionary"],
//     }),
//     getdictionaryEmployees: builder.query<CategoryType[], DictionaryType1>({
//       query: (args) => {
//         return {
//           method: "GET",
//           url: `/dictionary/employees-for-create-group`,
//           params: args,
//         };
//       },
//       providesTags: ["Dictionary"],
//     }),
//   }),
// });

// export const {
//   useDictionarycategoryQuery,
//   useGetdictionaryByIdQuery,
//   useCreateDictionaryMutation,
//   useDeletedictionaryMutation,
//   useAlldictionaryQuery,
//   useFilterByStoreQuery,
//   useLazyAlldictionaryQuery,
//   useUpdatedictionaryMutation,
//   useGetdictionaryCompaniesQuery,
//   useGetdictionaryDepartmentQuery,
//   useGetdictionaryEmployeesQuery,
//   useGetdictionaryLocationQuery,
// } = dictionaryApi;
