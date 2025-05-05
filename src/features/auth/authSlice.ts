import { createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";

const getUserFromStorage = (): User | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    return null;
  }
};

const initialState: AuthState = {
  user: getUserFromStorage(),
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    register: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, register, logout } = authSlice.actions;

export default authSlice.reducer;
