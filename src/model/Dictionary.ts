import type { PaginationOptionsDto } from "../Dto/paginationOptionsDto";

export interface dictionarytype {
  id?: number;
  categoryId: number;
  name: string;
  value?: string;
  label?: string | undefined;
  code?: string;
  isActive: boolean;
  dictionaryEntryId?: number | null;
  dictionaryEntryName?: string;
  systemDefined?: boolean;
  description?: string;

  // fields from add and edit dictionary
  createdBy?: string;
  createdOn?: string;
  lastModifiedBy?: string;
  lastModifiedOn?: string;
}
export interface dictionarycategoryType {
  id: number;
  name: string;
}

export interface DictionaryQueryParamsType extends PaginationOptionsDto {
  categoryId?: number;
  Ids?: number;
  category: string;
}
