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
  payout: number;
  note: string;
  commissionTypeId: number | null;
  ruleId: number;
  year: number;
  month: number;
}

export interface StaffMonthlySummaryResponseType {
  id: number;
  userId: string;
  year: number;
  month: number;
  target: number;
  achivement: number;
  totalPayout: number;
  totalWorkingDays: number;
  leaveDays: number;
  ruleId: number;
  userGroupId: number;
  groupTargetAchieved: number;
  totalGroupTarget: number | null;
  status: number;
  note: string;
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
