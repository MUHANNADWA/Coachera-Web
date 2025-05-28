import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "./types";

const getInitialCollapsedState = (): boolean => {
  try {
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  } catch (error) {
    console.error("Error reading sidebar state from localStorage", error);
    return false;
  }
};

const initialState: SidebarState = {
  collapsed: getInitialCollapsedState(),
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(state.collapsed));
    },
    setSidebarState: (state, action: { payload: boolean }) => {
      state.collapsed = action.payload;
      localStorage.setItem("sidebarCollapsed", JSON.stringify(action.payload));
    },
    resetSidebar: (state) => {
      state.collapsed = false;
      localStorage.removeItem("sidebarCollapsed");
    },
  },
});

export const { toggleSidebar, setSidebarState, resetSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;