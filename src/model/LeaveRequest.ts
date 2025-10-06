export interface leaverequesttype {
  id: number;
  requestType: string;
  reason: string;
  date: string;
  upload: string;
  status: "Pending" | "Approved" | "Rejected";
}