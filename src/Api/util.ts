import type { QueryParamsType } from "../model/common";
export const datawithmeta = (response: any, meta: any) => {
  const pagination = meta.response.headers.get("pagination");
  if (pagination) {
    const parsedPagination = JSON.parse(pagination);
    return {
      items: response,
      metaData: parsedPagination,
    };
  }
  return {
    items: response,
    metaData: null,
  };
};
export function getAxiosParamsA(dictionaryParams: QueryParamsType) {
  const params: any = {};

  params["PageNumber"] = dictionaryParams?.PageNumber?.toString();
  params["PageSize"] = dictionaryParams?.PageSize?.toString();
  
  if (dictionaryParams?.OrderBy) params["OrderBy"] = dictionaryParams?.OrderBy;

  if (dictionaryParams?.Role) params["Role"] = dictionaryParams?.Role;
  if (dictionaryParams?.SearchTerm)
    params["SearchTerm"] = dictionaryParams?.SearchTerm;
  if (dictionaryParams?.Code) params["Code"] = dictionaryParams?.Code;
  if (dictionaryParams?.Category) params["Category"] = dictionaryParams?.Category;



  if (dictionaryParams?.IsActive)
    params["IsActive"] = dictionaryParams?.IsActive?.toString();
  if (typeof dictionaryParams?.IsActive === "boolean") {
    params["IsActive"] = dictionaryParams.IsActive.toString();
  }
 
  if (dictionaryParams?.startDate)
    params["startDate"] = dictionaryParams?.startDate?.toString();
  if (dictionaryParams?.endDate)
    params["endDate"] = dictionaryParams?.endDate?.toString();
  if (dictionaryParams?.StartDate)
    params["StartDate"] = dictionaryParams?.StartDate?.toString();
  if (dictionaryParams?.EndDate)
    params["EndDate"] = dictionaryParams?.EndDate?.toString();

  if (dictionaryParams?.Status)
    params["Status"] = dictionaryParams?.Status?.toString();
 

  if (dictionaryParams?.fromCurrency)
    params["fromCurrency"] = dictionaryParams?.fromCurrency?.toString();
  if (dictionaryParams?.toCurrency)
    params["toCurrency"] = dictionaryParams?.toCurrency?.toString();
  if (dictionaryParams?.effectiveDate)
    params["effectiveDate"] = dictionaryParams?.effectiveDate?.toString();

 
  return params;
}
