export interface User {
  accessToken: string;
  user: Userinfo;
}

export interface Userinfo {
  id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
  profileImage: string;
}

export interface AuthState {
  user: User | null;
}
