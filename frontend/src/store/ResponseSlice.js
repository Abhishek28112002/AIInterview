import {createSlice} from '@reduxjs/toolkit';

const ResponseSlice = createSlice({
    name: 'response',
    initialState: {
        response: [],
    },
    actions: {
        setResponse: (state, action) => {
            state.response = action.payload;
        },
        getResponse: (state) => {
            return state.response;
        }

    }
});
export const {setResponse,getResponse} = ResponseSlice.actions;
export default ResponseSlice.reducer;