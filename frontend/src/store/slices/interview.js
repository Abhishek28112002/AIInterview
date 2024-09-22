import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
  name: "interview",
  initialState: {
    skills: [],
    questions: [],
    correctAnswers: [],
    userAnswers: [],
  },
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCorrectAnswers: (state, action) => {
      state.correctAnswers = action.payload;
    },
    setUserAnswers: (state, action) => {
      state.userAnswers = action.payload;
    },
  },
});
export const { setSkills, setQuestions, setCorrectAnswers, setUserAnswers } =
  interviewSlice.actions;
export const interviewReducer = interviewSlice.reducer;
