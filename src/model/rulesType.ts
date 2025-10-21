// Define types for Rules API

export interface RuleType {
  id?: string | number;
  name?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RuleSchemaType {
  name?: string;
  type?: string;
}

export interface CommissionType {
  id?: string | number;
  name?: string;
  value?: number;
}

export interface CountryType {
  code?: string;
  name?: string;
}

export interface ProcessRequestType {
  ruleId?: string | number;
  data?: any;
}

export interface MonthlySummarriesType {
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
