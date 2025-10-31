import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";

export interface AttendanceType {
  id?: number;
  firstName: string;
  type: string;
  shift: string;
  checkInTime: string;
  checkOutTime: string;
  workingHours: string;
  attendanceStatus: 1;
  shiftId: number;
  notes: string;
  storeId: number | null;
  userId: string;
}

export interface AttendanceQueryParamsType extends PaginationOptionsDto {
  StartDate?: string;
  EndDate?: string;
}
