export interface QueryParamsType {
  Category?: number | null | string;
  OrderBy?: string;
  SearchTerm?: string;
  PageNumber?: number;
  CurrencyCode?: number;
  CurrencyCodes?: number[];
  PageSize?: number;
  StartYear?: number;
  EndYear?: number;
  isAll?: boolean;
  spaceId?: number;
  maxDaysUntilExpiry?: number;
  chargeId?: number;
  LandlordId?: number;
  propertyId?: number;
  StatusId?: number;
  IsActive?: string | boolean | null;
  leaseId?: number;
  leaseIds?: number[];
  Code?: string;
  month?: number;
  year?: number;
  date?: string;
  groupBy?: "Month" | "Year";
  pagesize?: number;
  billStatus?: number;
  Role?: string;
  startDate?: string;
  endDate?: string;
  StartDate?: string;
  EndDate?: string;
  Status?: string | number;
  DateFilter?: number;
  isProfit?: boolean;
  ExcludeStatuses?: string;
  landlordId?: number;
  chargeType?: number;
  ids?: string | number | (string | number)[] | undefined;
  fromCurrency?: number;
  toCurrency?: number;
  effectiveDate?: string;
  Page?: string;
  PageId?: string;
  userId?: string;
}

export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}
export interface ColumnConfig<T> {
  id: keyof T;
  label: string;
  icon?: React.ReactNode;
  format?: (value: any, row: T) => React.ReactNode;
  size?: { sm?: number; md?: number; lg?: number };
}

export interface FilterData {
  id: number;
  name: string;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
export type contentMode = "Create" | "Edit" | "View";

export interface SalesData {
  spaceId: number;
  salesDate: string;
  amount: number;
  quantity: number;
  currencyCodeId: number;
  invoiceNo: string;
  spaceName: string;
  currencyName: string;
  invoiceCount: number;
}
export interface notificationtype {
  id: number;
  page: string;
  pageId: string;
  message: string;
  title: string;
  createdOn: string;
}
export interface ExportJob {
  id: number;
  page: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  fileName?: string;

  issue: string;
  requestedBy: string;
  date: string;
}

export interface ExportStartResponse {
  message: string;
  data: ExportJob;
}

export interface ExportStatusResponse {
  message: string;
  data: ExportJob[];
}

export interface ExportStopResponse {
  message: string;
  data: ExportJob;
}
