import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fathersName: string;
  fathersOccupation: string;
  fathersContactNo: string;
  mothersName: string;
  mothersOccupation: string;
  mothersContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  image?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// for creating instance
// export interface StudentMethods {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: string): Promise<TStudent | null>; // id is intentionally unused
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

// for crating static
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
}
