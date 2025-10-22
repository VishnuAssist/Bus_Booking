export interface StoreMonthlyTargetDto {
  id?: number;
  brandCode: string;
  storeId: number;
  year: number;
  month: number;
  targetAmount: number;
}

export interface StoreKPIDto {
  id?: number;
  storeTargetId: number;
  kpiName: string;
  kpiTarget?: number;
  kpiAchievement?: number;
  ruleId?: number;
}

export interface ProcessStoreTargetRequest {
  year: number;
  month: number;
  storeId: number;
  brandCode: string;
  ruleIdsToUse?: number[];
  additionalWorkflowJson?: string;
}

export interface ProcessKPIRequest {
  year: number;
  month: number;
  storeId: number;
  brandCode: string;
  category: string;
  ruleIdsToUse?: number[];
  additionalWorkflowJson?: string;
}
