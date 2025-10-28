import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";
export interface StoreTargetDto {
  id?: number;
  year: number;
  month: number;
  targetAmount: number;
  name: string;
  description: string;
  userIds: number[];
  storeIds: number[];
  brandCodes: string[];

  // Following fields are for response data
  stores?: {
    id: number;
    name: string;
    code: string;
  }[];
  users?: {
    id: string;
    userName: string;
    employeeCode: string;
  }[];
}

export interface ProcessStoreTargetRequest {
  year: number;
  month: number;
  storeId: number;
  brandCode: string;
  ruleIdsToUse?: number[];
  additionalWorkflowJson?: string;
}

export interface StoreTargetQueryParamsType extends PaginationOptionsDto {
  year?: number;
  month?: number;
  storeId?: number;
  brandCode?: string;
}
