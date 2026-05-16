import type { SignUpForm } from "../types/authType";
import type { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { logout, setUserRecordCache, signUp } from "../App/slices/authSlice";
import { clearProfile } from "../App/slices/profileSlice";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./useTypedHooks";
import type { JSONPlaceholderUser } from "../types/userType";
import { userService } from "../services/userService";
import { storageService } from "../services/storageService";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { userRecordCache } = useAppSelector((state) => state.auth);

    const handleSignup: SubmitHandler<SignUpForm> = (data) => {
        storageService.setAuth(data);
        dispatch(signUp(data));
        navigate("/profile");
    };

    const handleLogout = () => {
        storageService.removeAuth();
        storageService.removeProfile();
        dispatch(logout());
        dispatch(clearProfile());
        navigate("/");
    };

    const checkEmail = async (
        email: string,
        setValue: UseFormSetValue<SignUpForm>,
    ): Promise<boolean> => {
        try {
            let users: JSONPlaceholderUser[] | null = userRecordCache;
            if (!users) {
                users = await userService.fetchUsers();
                dispatch(setUserRecordCache(users));
            }
            console.log(users);
            const user = users.find(
                (u) => u.email.toLowerCase() === email.toLowerCase(),
            );

            if (user) {
                setValue("firstName", user.name.split(" ")[0], {
                    shouldValidate: true,
                });
                setValue("lastName", user.name.split(" ")[1] ?? "", {
                    shouldValidate: true,
                });
                return true;
            }
            return false;
        } catch {
            // network failure — just treat the email as not found
            return false;
        }
    };

    return { handleSignup, handleLogout, checkEmail };
};

export default useAuth;
