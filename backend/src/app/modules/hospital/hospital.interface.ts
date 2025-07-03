import { hospitalType } from '../../../enums/hospitalType'
import { IAdminUser } from '../adminUser/admin.user.interface'

export interface IHospitalLocation {
  state: string;
  city: string;
  postCode: string;
  address: string;
}

export interface IHospitalBanners {
  title?: string;
  src: string;
}
export interface IHospital extends IAdminUser {
  id: string;
  userName: string;
  hospitalName: string;
  email: string;
  hospitalType: hospitalType;
  specialty?: string;
  hospitalRegistrationNum: string;
  yearsOfEstablishment: string;
  hospitalContactNumber?: string;
  contactNumber?: string;
  website?: string;
  hospitalMail?: string;
  location?: IHospitalLocation;
  password: string;
  hospitalOpenTime: string;
  hospitalCloseTime: string;
  banners: IHospitalBanners[];
  logo?: string;
}
