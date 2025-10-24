import type { StoreTargetDto } from "../../../model/storeTargetType";

export const storeTargetTableDataService = (
  storeTargets: StoreTargetDto[] | undefined
) => {
  const StoreTargetColumns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "year", label: "Year" },
    { id: "month", label: "Month" },
    { id: "type", label: "Type" },
    { id: "status", label: "Status" },
    {
      id: "targetAmount",
      label: "Target Amount",
      format: (value: number) => `₹${value.toLocaleString()}`,
    },
    { id: "description", label: "Description" },
  ];

  const rows = storeTargets || [];

  return { columns: StoreTargetColumns, rows };
};
