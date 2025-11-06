// export interface SalesType {
//   id?: number;
//   departmentId: number;
//   brandId: number;
//   saleAmount: number;
//   categoryId: number;
//   subCategoryId: number;
//   subSubCategoryId: number;
//   saleTypeId: number;
//   productPrice: number;
//   tax: number;
//   discount: number;
//   quantity: number;
//   invoiceNumber: string;
//   itemNumber: string;
//   notes: string;
// }
export interface SalesType {
  id: number;
  departmentId?: number;
  brandCode?: number;
  category?: number;
  subCategory?: number | null;
  subSubCategory?: number | null;
  storeCode?: number | string;
  employeeCode?: number | string;
  saleTypeId?: number;
  saleAmount?: number;
  productPrice: number;
  tax: number;
  discount: number;
  quantity: number;
  invoiceNumber: string;
  itemNumber: string;
  notes: string;
}
