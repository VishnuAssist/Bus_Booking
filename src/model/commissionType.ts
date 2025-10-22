export interface MonthlySummarriesQueryParamsType {
  year: number;
  month: number;
  userId: string;
  storeId: number;
  userGroupId: number;
}

export interface StaffCommissionResponseType {
  id: number;
  userId: string;
  userName: string;
  employeeCode: string;
  storeId: string | null;
  storeName: string | null;
  payout: number;
  note: string;
  commissionTypeId: number | null;
  ruleId: number;
  commissinDate: string;
  commissionYear: number;
  commissionMonth: number;
  createdOn: string;
  createdBy: string;
}

// Process Staff Commission API Types
export interface ProcessStaffCommissionPayload {
  userId: string;
  storeId: number;
  year: number;
  month: number;
  brandId: number;
  ruleIdsToUse: number[];
  additionalWorkflowJson: string;
}

// Process Monthly Summary API Types
export interface ProcessMonthlySummaryPayload {
  userId: string;
  storeId: number;
  userGroupId: number;
  year: number;
  month: number;
  brandId: number;
  ruleIdsToUse: number[];
  additionalWorkflowJson: string;
}
