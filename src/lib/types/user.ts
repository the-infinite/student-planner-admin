import { DocumentReference } from "firebase-admin/firestore";

export type UserModel = {
  uid: string;
  name: string;
  email: string;
  college: DocumentReference;
  department: DocumentReference;
  studentId: String;
  level: number;
};

export type UnitDTO = {
  code: string;
  isDepartment: boolean;
  name: string;
  path: string;
};

export type UserDTO = {
  uid: string;
  name: string;
  email: string;
  college: UnitDTO;
  department: UnitDTO;
  studentID: String;
  level: number;
};