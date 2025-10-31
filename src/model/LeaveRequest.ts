export interface leaverequesttype {
  id: number;
  leaveDays: number | string;
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
  upload: string;
  approverComments: string;
  approvedBy: string;
  approvedOn: string;
  status: number;
}
export interface Adminleaverequesttype {
  id: number;
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
