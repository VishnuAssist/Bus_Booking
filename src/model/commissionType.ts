import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";

export interface MonthlySummarriesQueryParamsType extends PaginationOptionsDto {
  year?: number;
  month?: number;
  userId?: string;
  IsAll?: string;
  storeId?: number;
  userGroupId?: number;
}
export interface ShiftQueryParamsType extends PaginationOptionsDto {
  StartDate?: number;
  EndDate?: number;
  userId?: string;
  IsAll?: string;
  storeId?: number;
  userGroupId?: number;
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

export interface StaffGroupSummaryRowType extends UserSummaryType {
  groupName?: string;
  id: number;
  description: string;
  year: number;
  month: number;
}

// Staff Group Summary Response API Types
export interface PayoutType {
  commissionTypeId: number | null;
  commissionTypeName: string;
  amount: number;
  date: string;
  note: string;
}

export interface UserSummaryType {
  userId: string;
  userName: string;
  employeeCode: string;
  designation: string;
  target: number;
  achievement: number;
  totalPayout: number;
  workingDays: number;
  leaveDays: number;
  payouts: PayoutType[];
}

export interface StaffGroupSummaryResponseType {
  id: number;
  groupName?: string;
  description: string;
  year: number;
  month: number;
  users: UserSummaryType[];
}
