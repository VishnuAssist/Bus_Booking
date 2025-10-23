import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";

export const defaultparams = {
  PageNumber: 1,
  PageSize: 10,
};

export const DEFAULT_PAGINATION_OPTIONS: PaginationOptionsDto = {
  OrderBy: "createdAt",
  PageNumber: 1,
  PageSize: 10,
};
