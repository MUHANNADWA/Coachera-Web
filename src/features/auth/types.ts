// auth/types/auth.ts
import { Instructor, Organization, Student } from "../../shared/types/types";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ORGANIZATION = "ORGANIZATION",
}

export interface User {
  accessToken: string;
  user: Userinfo;
}

interface BaseUserinfo {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  isVerified: boolean;
}

// Discriminated union by enum role
export type Userinfo =
  | (BaseUserinfo & { role: UserRole.STUDENT; details: Student })
  | (BaseUserinfo & { role: UserRole.INSTRUCTOR; details: Instructor })
  | (BaseUserinfo & { role: UserRole.ORGANIZATION; details: Organization })
  | (BaseUserinfo & { role: UserRole.ADMIN; details?: null });

export interface AuthState {
  user: User | null;
}
