import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SignUpForm } from "../../types/authType";
import type { JSONPlaceholderUser } from "../../types/userType";
import { storageService } from "../../services/storageService";

type AuthUser = SignUpForm;

type AuthState = {
    isAuthenticated: boolean;
    user: AuthUser | null;
    userRecordCache: JSONPlaceholderUser[] | null;
};

// Read from localStorage when the store is first created (no useEffect needed)
const getInitialState = (): AuthState => {
    const user = storageService.getAuth();
    return { isAuthenticated: !!user, user, userRecordCache: null };
};

const authSlice = createSlice({
    name: "auth",
    initialState: getInitialState(),
    reducers: {
        signUp: (state, action: PayloadAction<AuthUser>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setUserRecordCache: (
            state,
            action: PayloadAction<JSONPlaceholderUser[]>,
        ) => {
            state.userRecordCache = action.payload;
        },
    },
});

export const { signUp, logout, setUserRecordCache } = authSlice.actions;
export default authSlice.reducer;
