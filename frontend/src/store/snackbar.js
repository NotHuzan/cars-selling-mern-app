import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    snackbar: false,
    snackText: {},
  },

  reducers: {
    openSnackbar(state, action) {
      state.snackbar = true;
      state.snackText = action.payload;
    },
    closeSnackbar(state) {
      console.log("closing snackbar");
      state.snackbar = false;
      state.snackText = {};
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;
