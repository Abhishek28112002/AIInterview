import { configureStore } from "@reduxjs/toolkit";
import { globalReducer, setModalInfo, setUser } from "./slices/global";
import {
  interviewReducer,
  setSkills,
  setQuestions,
  setCorrectAnswers,
  setUserAnswers,
} from "./slices/interview";

// Configure the Redux store
const store = configureStore({
  reducer: {
    global: globalReducer,
    interview: interviewReducer,
  },
});
export default store;
// Export the store and actions
export {
  // Global slice actions
  setModalInfo,
  setUser,
  // Interview slice actions
  setSkills,
  setQuestions,
  setCorrectAnswers,
  setUserAnswers,
};
