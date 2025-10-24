export interface UserType {
  id?: string;
  userName?: string;
  email?: string;
  role?: string;
  roleName?: string;
  isActive?: boolean;
  countryCode?: string;
  firstName?: string;
  lastName?: string;
  employeeCode?: string;
  departmentId?: number;
  brandId?: number;
  companyId?: number;
  categoryId?: number;
  branchId?: number;
  storeId?: number;
  designation?: string;
  dateJoined?: string; 
  dateOfBirth?: string;
}
export interface UserList {
  id: string;
  userName?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  employeeCode?: string;
  userType?: UserType[]; 
}
