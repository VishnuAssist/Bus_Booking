export interface DictionaryType {
  id: number;
  category: string;
  entryname: string;
  countryname?: string;
  code?: string;
  status: string;
  description: string;
  discountPercentage: string;
  brandimage: string | null;
}

export interface DictionaryType1 {
  name: string;
  description: string;
  grade: string;
  storeCategoryId: number;
  city: string;
  subBrandsId: number;
  sectorId: number;
  brandId: string | number ;
  categoryId: number | string | undefined;
  image: string | null;
  isActive: boolean;
  id: string | number | undefined;
  category?: { id: number; name: string };
  message?: string;
}

export interface CategoryType {
  id: number;
  name: string;
}
