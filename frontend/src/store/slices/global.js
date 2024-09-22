import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    modalInfo: [],
    user: {},
  },
  reducers: {
    setModalInfo: (state, action) => {
      state.modalInfo = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setModalInfo, setUser } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
