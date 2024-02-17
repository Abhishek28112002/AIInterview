import { configureStore } from "@reduxjs/toolkit";
import SkillsReducer from "./SkillsSlice";
import ResponseReducer from "./ResponseSlice";

export default configureStore({
    reducer: {
        skills: SkillsReducer,
        response: ResponseReducer
    }
});
