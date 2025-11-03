import type { StoreDto } from "../../../model/storeType";

export const userTableDataService = (
  storeData: StoreDto[] | undefined
) => {
  const StoreColumns = [
    { id: "storeId", label: "Store ID" },
    { id: "name", label: "Store Name" },
    { id: "code", label: "Store Code" },
    { id: "countryCode", label: "Country Code" },
  ];

  const rows = storeData
    ? storeData.map((store: StoreDto) => {
        return {
          storeId: store.storeId,
          name: store.name,
          code: store.code,
          countryCode: store.countryCode,
        };
      })
    : [];

  return { columns: StoreColumns, rows };
};