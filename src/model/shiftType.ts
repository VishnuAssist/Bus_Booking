export interface ShiftType {
  id?: number;
  startTime: string;
  endTime: string; 
  shiftType: number; 
  startDate: string;
  endDate: string; 
  skipDate: string; 
  notes: string;
  storeId: number;
}

export interface Shift {
  id: number;
  userIds?: string[];
  users?: { id: string; userName?: string; firstName?: string; lastName?: string; fullName?: string }[];
  startTime: string;
  endTime: string;
  duration: string;
  groupIds?: string[] | undefined;
  shiftType: string;
  startDate: string; 
  endDate: string; 
  skipDates: string;
  notes: string;
  reason: string;
  status: number;
  storeId: number;
}

export interface ShiftUser {
  id: string;
  userName: string;
  email: string;
}

export interface ShiftResponse {
  id: number;
  users: ShiftUser[];
  startTime: string;
  endTime: string;
  duration: string;
  shiftType: string;
  startDate: string;
  endDate: string;  
  skipDates: string;
  notes: string;
  reason: string;
  status: number;
  storeId: number;
}

export type ShiftList = ShiftResponse[];


export interface ShiftUser {
  id: string;
  userName: string;
  email: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface ShiftCal {
  id: number;
  users: ShiftUser[];
  startTime: string; 
  endTime: string;   
  duration: string;  
  shiftType: string;
  startDate: string; 
  endDate: string;   
  skipDates: string; 
  notes: string;
  reason: string;
  status: number;
  statusText: string;
  storeId: number;
  storeName: string;
  createdOn: string; 
  createdBy: string;
  lastModifiedOn: string | null;
  lastModifiedBy: string | null;
}