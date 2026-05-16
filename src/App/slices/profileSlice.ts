import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileForm } from "../../types/profileType";
import { storageService } from "../../services/storageService";

type ProfileState = {
    profile: ProfileForm | null;
};

const profileSlice = createSlice({
    name: "profile",
    initialState: { profile: storageService.getProfile() } as ProfileState,
    reducers: {
        saveProfile: (state, action: PayloadAction<ProfileForm>) => {
            state.profile = action.payload;
        },
        clearProfile: (state) => {
            state.profile = null;
        },
    },
});

export const { saveProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
