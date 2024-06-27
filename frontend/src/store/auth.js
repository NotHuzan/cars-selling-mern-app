import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem("activeUser")) ? true : false,
    activeUser: JSON.parse(localStorage.getItem("activeUser")) || null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.activeUser = action.payload;
      localStorage.setItem("activeUser", JSON.stringify(state.activeUser));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.activeUser = null;
      localStorage.clear("activeUser");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

