import { useMemo } from "react";
import type {
  PayoutType,
  StaffGroupSummaryResponseType,
  UserSummaryType,
} from "../../../model/commissionType";
import { useGetalldictionaryQuery } from "../../../Api/dictionaryApi";

export const useStaffGroupSummaryTableData = (
  staffGroupSummaries: StaffGroupSummaryResponseType[] | undefined
) => {
  // Fetch commission types from dictionary
  const { data: dictionaryData } = useGetalldictionaryQuery({
    category: "commissiontype",
  });

  const commissionTypes = useMemo(() => {
    return dictionaryData?.items || [];
  }, [dictionaryData]);

  const columns = useMemo(() => {
    const baseColumns = [
      { id: "groupName", label: "Group Name", minWidth: 120 },
      { id: "employeeCode", label: "Employee Code", minWidth: 120 },
      { id: "userName", label: "User Name", minWidth: 150 },
      { id: "designation", label: "Designation", minWidth: 150 },
      { 
        id: "target", 
        label: "Target", 
        align: "right" as const,
        format: (value: number) => `₹${value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`
      },
      { 
        id: "achievement", 
        label: "Achievement", 
        align: "right" as const,
        format: (value: number) => `₹${value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`
      },
      { id: "workingDays", label: "Working Days", align: "center" as const },
      { id: "leaveDays", label: "Leave Days", align: "center" as const },
    ];

   
    const commissionColumns = commissionTypes.map((type: any) => ({
      id: `commission_${type.id}`,
      label: type.name || type.value,
      align: "right" as const,
      minWidth: 150,
      format: (value: number) => value ? `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₹0.00'
    }));

    return [
      ...baseColumns,
      ...commissionColumns,
      { 
        id: "totalPayout", 
        label: "Total Payout", 
        align: "right" as const,
        minWidth: 150,
        format: (value: number) => `₹${value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 0}`
      },
    ];
  }, [commissionTypes]);

  const rows = useMemo(() => {
    if (!staffGroupSummaries) return [];

    const allUsers: Array<UserSummaryType & { 
      groupName: string; 
      id: number;
      description: string;
      year: number;
      month: number;
    }> = [];

    staffGroupSummaries.forEach((summary: StaffGroupSummaryResponseType) => {
      summary.users.forEach((user: UserSummaryType) => {
        allUsers.push({
          ...user,
          groupName: summary.groupName,
          id: summary.id,
          description: summary.description,
          year: summary.year,
          month: summary.month,
        });
      });
    });

    return allUsers.map((user) => {
     
      const commissionMap = new Map<number, number>();
      user.payouts.forEach((payout: PayoutType) => {
        commissionMap.set(payout?.commissionTypeId, payout.amount);
      });

     
      const rowData: any = {
        id: user.id,
        groupName: user.groupName,
        description: user.description,
        year: user.year,
        month: user.month,
        userId: user.userId,
        userName: user.userName,
        employeeCode: user.employeeCode,
        designation: user.designation,
        target: user.target,
        achievement: user.achievement,
        totalPayout: user.totalPayout,
        workingDays: user.workingDays,
        leaveDays: user.leaveDays,
        // Store full user data for actions
        _fullData: user,
      };

      // Add commission amounts for each type
      commissionTypes.forEach((type: any) => {
        rowData[`commission_${type.id}`] = commissionMap.get(type.id) || 0;
      });

      return rowData;
    });
  }, [staffGroupSummaries, commissionTypes]);

  return { columns, rows };
};