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
