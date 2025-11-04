import type { Policy } from "../../../../model/policyType";


const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const policyTableDataService = (
  policy: Policy[] | undefined
) => {
  const PolicyColumns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Policy Name" },
    { id: "startDate", label: "Start Date",format: formatDate },
    { id: "endDate", label: "End Date",format: formatDate },
    { id: "maxDays", label: "Leave Days" },
    { id: "description", label: "Description" },

  ];

  const rows = policy || [];

  return { columns: PolicyColumns, rows };
};
