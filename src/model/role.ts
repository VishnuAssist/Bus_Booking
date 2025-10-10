export interface CommissionData {
  id: number;
  userId: string;
  userName: string;
  designation: string;
  target: number;
  sales: number;
  payout: number;
  storeTargetAchievement: number;
  storeKpiAchievement: number;
  numberOfMcUplDays: number;
  totalNoOfWorkingDays: number;
  totalPayout: number;
  remarks: string;
  commissionTypeId: number;
}
