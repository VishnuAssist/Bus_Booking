import type { StoreUser } from "../Component/storeUserType";


export const storeUserTableDataService = (
  storeUsers: StoreUser[] | undefined
) => {
  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "storeName", label: "StoreName", minWidth: 120 },
    { id: "email", label: "Email", minWidth: 120 },
    { id: "storeCode", label: "Storecode", minWidth: 100 },
    {
      id: "isActive",
      label: "Status",
      minWidth: 80,
      format: (value: boolean) => (value ? "Active" : "Inactive"),
    },
  ];

  

        
  const rows = storeUsers
    ? storeUsers.map((item: StoreUser) => ({
        id: item.id,
        storeName: item?.storeName,
        email: item.email,
        storeCode: item.storecode,
        
        isActive: item.isActive,
      }))
    : [];

  return { columns, rows };
};
