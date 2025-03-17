// store/slices/interviewSlice.js
import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    interviews: [],
  },
  reducers: {
    addInterview: (state, action) => {
      state.interviews.push(action.payload);
    },
  },
});

export const { addInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
