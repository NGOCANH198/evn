import { createSlice } from "@reduxjs/toolkit";

const initialState = { accountInfo: undefined };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.accountInfo = action.payload;
    },
  },
});

export const { setAccountInfo } = authSlice.actions;

export default authSlice.reducer;
