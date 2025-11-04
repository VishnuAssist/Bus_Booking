export interface LeavePolicy {
  id: number;
  name: string;
  description: string;
  maxDays: number;
  startDate: string; 
  endDate: string; 
  users: {
    id: string;
    userName: string;
  }[];
  groups: {
    id: number;
    groupName: string;
  }[];
}
