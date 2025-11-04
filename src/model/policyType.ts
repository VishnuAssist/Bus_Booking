import type { Dayjs } from "dayjs";
import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";

export interface PolicyData {
  id?: number;
  name?: string;
  description?: string;
  maxDays?: number;
  startDate?: string | number;
  endDate?: string | number;
  userIds?: string[];
  groupIds?: number[];
}
export interface LeavePolicy {
  id?: number;
  name?: string;
  maxDays?: number;
  startDate?: string | number;
  endDate?: string | number;
}


export interface Policy {
  id: number;
  name: string;
  description: string;
  maxDays: number;
  startDate: string;
  endDate: string;  
  users: User[];
  groups: Group[];
}

export interface User {
  id: string;
  userName: string;
}

export interface Group {
  id: number;
  groupName: string;
}

export interface PolicyQueryParamsType extends PaginationOptionsDto {
  StartDate?: string;
  EndDate?: string;
  searchTerm?: string;
}
