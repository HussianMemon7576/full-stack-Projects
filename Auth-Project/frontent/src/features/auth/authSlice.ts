
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, SetUserPayload } from "../../types/auth.types";

const initialState: AuthState = {
    accessToken: null,
    isAuthenticated: false,
    user: null,
    otpEmail: null,
    loading: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser: (state, action: PayloadAction<SetUserPayload>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.data;
            state.isAuthenticated = true;
            state.otpEmail = null;
            state.loading = false;
        },

        setOtpEmail: (state, action: PayloadAction<string>) => {
            state.otpEmail = action.payload;
        },

        setSucessRefresh: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },

        setNotSucessRefresh: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
        },

       

        logout: (state) => {
            state.otpEmail = null;
            state.isAuthenticated = false;
            state.accessToken = null;
            state.user = null;
            state.loading = false;
        },
    },
});

export const {
    setUser,
    setOtpEmail,
    
    logout,
    setNotSucessRefresh,
    setSucessRefresh,

} = authSlice.actions;

export default authSlice.reducer;
