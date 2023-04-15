export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VISITOR = 'visitor',
  CREATOR = 'creator',
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateUserParams = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'userName' | 'password' | 'role'
>;

export type UpdateUserParams = Pick<
  User,
  'firstName' | 'lastName' | 'userName' | 'role'
>;
