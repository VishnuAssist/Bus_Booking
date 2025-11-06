import type { dictionarytype } from "../../../model/Dictionary";

export const dictionaryTableDataService = (
  dictionaries: dictionarytype[] | undefined
) => {
  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "categoryName", label: "Category Name", minWidth: 120 },
    { id: "name", label: "Name", minWidth: 120 },
    { id: "code", label: "Code", minWidth: 100 },
    { id: "description", label: "Description", minWidth: 150 },
    {
      id: "isActive",
      label: "Status",
      minWidth: 80,
      format: (value: boolean) => (value ? "Active" : "Inactive"),
    },
  ];

  const rows = dictionaries
    ? dictionaries.map((item: dictionarytype) => ({
        id: item.id,
        categoryName: item?.categoryName,
        name: item.name,
        code: item.code,
        description: item.description,
        isActive: item.isActive,
      }))
    : [];

  return { columns, rows };
};
