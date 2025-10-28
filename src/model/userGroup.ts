export interface userGroupType {
  id?: number;
  groupName: string;
  description: string;
  creatorId: string;
  creatorName: string;
  isActive: true;
  memberCount: 0;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroupMember {
  id: number;
  userGroupId: number;
  userGroupName: string;
  userId: string;
  userName: string;
  userEmail: string;
  employeeCode: string;
  isActive: boolean;
  createdAt: string;
}

export interface UserGroup {
  id: number;
  groupName: string;
  description: string;
  creatorId: string | null;
  creatorName: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
  members: UserGroupMember[];
  groupTargets: any[];
}
