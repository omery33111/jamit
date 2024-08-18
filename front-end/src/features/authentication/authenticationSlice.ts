import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { jwtDecode } from "jwt-decode";
import { loginUser, logoutUser, registerAdmin, registerUser } from "./authenticationAPI";
import { Login, MyToken, Register } from "../../models/Authentication";



export interface AuthenticationState
{
    userName: string,
    isLogged: boolean,
    
    access: string | null,
    refresh: string | null,

    isAdmin: boolean
}


const initialState: AuthenticationState =
{
    userName: "",
    isLogged: false,
    
    access: "",
    refresh: "",

    isAdmin: false
};



export const registerAdminAsync = createAsyncThunk(
    'authentication/registerAdmin',
    async (userData: Register) => {
      const response = await registerAdmin(userData);
      return response.data;
    }
);



export const registerUserAsync = createAsyncThunk(
    'authentication/registerUser',
    async (userData: Register) => {
      const response = await registerUser(userData);
      return response.data;
    }
);



export const loginUserAsync = createAsyncThunk(
    'authentication/loginUser',
    async (userData: Login) => {
      const response = await loginUser(userData);
      return response;
    }
);



export const logoutUserAsync = createAsyncThunk(
    'authentication/logoutUser',
    async () => {
      const response = logoutUser();
      return response;
    }
);


export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerAdminAsync.fulfilled, (state, action) =>
        {

        })

        .addCase(registerUserAsync.fulfilled, (state, action) =>
        {

        })

        .addCase(loginUserAsync.fulfilled, (state, action) => {
            const decoded: MyToken = jwtDecode(action.payload.data.access)
        
            sessionStorage.setItem("isAdmin", JSON.stringify(decoded.is_admin));
            state.isAdmin = decoded.is_admin;

            sessionStorage.setItem("userName", JSON.stringify(decoded.username));
            state.userName = decoded.username
            state.isLogged = true

            state.access = action.payload.data.access
            state.refresh = action.payload.data.refresh
            sessionStorage.setItem("access", JSON.stringify(state.access));
            sessionStorage.setItem("refresh", JSON.stringify(state.refresh));
        })

        .addCase(logoutUserAsync.fulfilled, (state, action) => {
            state.isLogged = false
            state.access = ""
            state.refresh = ""
            state.userName = ""
        })

    }

})


export const selectIsAdmin = (state: RootState) => state.authentication.isAdmin;
export const selectIsLogged = (state: RootState) => state.authentication.isLogged;
export const selectAccessToken = (state: RootState) => state.authentication.access;
export const selectRefreshToken = (state: RootState) => state.authentication.refresh;
export const selectUsername = (state: RootState) => state.authentication.userName;


export default authenticationSlice.reducer;