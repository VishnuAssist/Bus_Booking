import type { Policy } from "../../../../model/policyType";

export const policyTableDataService = (
  policy: Policy[] | undefined
) => {
  const PolicyColumns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Policy Name" },
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "maxDays", label: "Leave Days" },
    { id: "description", label: "Description" },

  ];

  const rows = policy || [];

  return { columns: PolicyColumns, rows };
};
