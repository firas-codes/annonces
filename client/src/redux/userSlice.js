import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isLoggedIn: false,
    isAdmin : false,
    isUser: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state,action)=>{
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.isAdmin = action.payload.isAdmin;
            state.isUser = action.payload.isUser;
        },
        logout: (state) =>{
            state.user = null;
            state.isLoggedIn = false;
            state.isAdmin = false;
            state.isUser = false;
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;