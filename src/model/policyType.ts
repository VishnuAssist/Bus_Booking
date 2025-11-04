import type { Dayjs } from "dayjs";

export interface PolicyData {
  id?: number;
  name: string;
  description: string;
  maxDays: number;
  startDate: string | number;
  endDate: string | number;
  userIds: string[];
  groupIds: number[];
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
