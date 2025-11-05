import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";

export interface leaverequesttype {
  id?: number;
  leaveDays: number | string;
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
  approverComments: string;
  approvedBy: string;
  approvedOn: string;
  status: number;
  assignUserId: string;
}
export interface Adminleaverequesttype {
  id?: number;
  userIds?: string[];
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
}
export interface leaveTableType {
  userName?: string;
  approvedLeaveDays?: number | string;
  remainingBalance?: number | string;
  totalLeaveDays?: number | string;
  rejectedLeaveDays?: number | string;
  approvedCount?: number | string;
  pendingCount?: number | string;
  rejectedCount?: number | string;
  totalLeaveRequests?: number | string;
}
export interface LeaveSummary {
  userId: string;
  userName: string;
  totalLeaveRequests: number;
  totalLeaveDays: number;
  approvedLeaveDays: number;
  pendingLeaveDays: number;
  rejectedLeaveDays: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
}


export interface leaveReqTableType {
  id?: number;
  userName?: string;
  leaveType?: string | number;
  leavePolicyId?:string | number;
  startDate?: string | number | undefined;
  endDate?: string | number | undefined;
  reason?: string;
  status?: string | number;
}


export interface StatusItem {
  id: number;
  name: string;
}

export interface StatusResponse {
  statuses: StatusItem[];
}

export interface LeaveSummaryQueryParamsType extends PaginationOptionsDto {
  StartDate?:  string ;
  EndDate?:  string;
  userId?: string;
}