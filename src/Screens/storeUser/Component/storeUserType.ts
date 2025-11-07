export interface StoreUser {
  id: number;
  email: string;
  storeName: string;
  password: string;
  brands:string[];
  image: string;
  isActive: boolean;
  isMultiBrand: boolean | null;
  storecode: string;
  role: string;
  createdAt: string | number;
  updatedAt: string | number;
  message: string;
}