export interface User {
  accessToken: string;
  user: Userinfo;
}

export interface Userinfo {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "STUDENT" | "INSTRUCTOR" | "ORGANIZATION";
  profileImage: string;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
}
