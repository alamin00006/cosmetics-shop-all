export interface ISuperAdmin {
  id: string;
  name: string;
  phoneNumber: string;
  gender?: 'Male' | 'Female';
  address?: string;
  userPhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
