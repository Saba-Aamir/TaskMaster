import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
