// Define types for Rules API

export interface RuleType {
  id?: string | number;
  name?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface RuleSchemaType {
  name?: string;
  type?: string;
}

export interface CommissionType {
  id?: string | number;
  name?: string;
  value?: number;
  [key: string]: any;
}

export interface CountryType {
  code?: string;
  name?: string;
}

export interface ProcessRequestType {
  ruleId?: string | number;
  data?: any;
  [key: string]: any;
}

export interface MonthlySummarriesType {
  year: number;
  month: number;
  userId: string;
  storeId: number;
  userGroupId: number;
}
