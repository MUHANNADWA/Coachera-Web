export interface User {
  accessToken?: string;
  userDTO: UserDTO;
}

export interface UserDTO {
  _id: string;
  username: string;
  email: string;
  isAdmin?: boolean;
}



export interface AuthState {
  user: User | null;
}