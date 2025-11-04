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
  userName: string;
  approved: number | string;
  remainingBalance: number | string;
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
  id: number;
  userName: string;
  leaveType: string | number;
  startDate: string;
  endDate: string;
  reason: string;
  status: string | number;
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