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
  userIds: string[];
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
