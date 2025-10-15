import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shift: "",
};

const shiftSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    updateShift: (state, { payload }) => {
      state.shift = payload;
    },
  },
});

export const { updateShift } = shiftSlice.actions;

export default shiftSlice.reducer;
