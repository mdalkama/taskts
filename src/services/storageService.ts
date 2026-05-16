import type { SignUpForm } from "../types/authType";
import type { ProfileForm } from "../types/profileType";

// Safe JSON parse — returns null if the key is missing or data is corrupted
const parseItem = <T>(key: string): T | null => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        return null;
    }
};

export const storageService = {
    getAuth: () => parseItem<SignUpForm>("auth"),
    getProfile: () => parseItem<ProfileForm>("profile"),
    setAuth: (data: SignUpForm) => localStorage.setItem("auth", JSON.stringify(data)),
    setProfile: (data: ProfileForm) => localStorage.setItem("profile", JSON.stringify(data)),
    removeAuth: () => localStorage.removeItem("auth"),
    removeProfile: () => localStorage.removeItem("profile"),
};
