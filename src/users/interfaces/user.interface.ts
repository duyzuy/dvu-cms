export type UserRoleType = 'superadmin' | 'admin' | 'editor' | 'visitor';
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: UserRoleType;
  isActive: boolean;
  token: string;
  createAt: string;
  updateAt: string;
}
