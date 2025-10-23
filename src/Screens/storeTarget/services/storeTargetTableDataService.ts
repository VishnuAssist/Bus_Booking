import type { StoreMonthlyTargetDto } from "../../../model/storeTargetType";

export const storeTargetTableDataService = (
  storeTargets: StoreMonthlyTargetDto[] | undefined
) => {
  const StoreTargetColumns = [
    { id: "id", label: "ID" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },
    { id: "brandCode", label: "Brand Code" },
    {
      id: "targetAmount",
      label: "Target Amount",
      format: (value: number) => `₹${value.toLocaleString()}`,
    },
  ];

  const rows = storeTargets
    ? storeTargets.map((target: StoreMonthlyTargetDto) => {
        return {
          id: target.id,
          storeId: target.storeId,
          year: target.year,
          month: target.month,
          brandCode: target.brandCode,
          targetAmount: target.targetAmount,
        };
      })
    : [];

  return { columns: StoreTargetColumns, rows };
};
