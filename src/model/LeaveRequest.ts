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

export interface StatusItem {
  id: number;
  name: string;
}

export interface StatusResponse {
  statuses: StatusItem[];
}
