export enum UserRoleType {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VISITOR = 'visitor',
}
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

export type CreateUserParams = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'userName'
>;

export type UpdateUserParams = Pick<
  User,
  'firstName' | 'lastName' | 'userName'
>;
