export enum Role {
  SuperAdmin = 'SuperAdmin',
  Admin = 'admin',
  HOSPITAL = 'hospital',
  DOCTOR = 'doctor',
  USER = 'user',
}


export const USER_ROLE = {
  SuperAdmin :'SuperAdmin',
  Admin : 'admin',
  HOSPITAL : 'hospital',
  DOCTOR : 'doctor',
  USER : 'user',
}  ;
export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];