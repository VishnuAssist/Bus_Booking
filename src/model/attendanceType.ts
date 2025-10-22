
export interface attendanceType
{
  id?: number;
  checkInTime: string;
  checkOutTime: string;
  workingHours: string;
  attendanceStatus: 1;
  shiftId: number;
  notes: string;
  storeId: number | null;
  userId: string;
}