interface PersonalDetails {
  fathersName?: string;
  mothersName?: string;
  birthDate?: Date;
  nidOrPassportNo?: string;
  nidOrPassportPhoto?: string;
  nidOrPassportBackSidePhoto?: string;
  userPhoto?: string;
}

interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface IUser {
  _id: any;
  id?: string;
  name: string;
  phoneNumber?: string;
  email: string;
  password: string;
  role: 'User';
  otp?: string;
  otpExpiration?: Date;
  lastLogin?: Date;
  isVerified: boolean;
  personalDetails: PersonalDetails;
  address: Address;
  status: 'active' | 'deactive' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
