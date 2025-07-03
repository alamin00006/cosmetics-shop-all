import { IAdminUser } from '../adminUser/admin.user.interface'

export interface LoginResponse {
  adminUser: Omit<IAdminUser, 'password'>;
  token: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
