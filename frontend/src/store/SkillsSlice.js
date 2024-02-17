import {createSlice} from '@reduxjs/toolkit';
const SkillsSlice = createSlice({
    name: 'skills',
    initialState: {
        skills: [],
    },
    reducers: {
        setSkills: (state, action) => {
            console.log(action.payload)
            state.skills = action.payload;
        },
        getSkills: (state) => {
            return state.skills;
        }
    }
});
export const {setSkills,getSkills} = SkillsSlice.actions;
export default SkillsSlice.reducer;