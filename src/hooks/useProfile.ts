import { useState } from "react";
import { useForm } from "react-hook-form";
import { saveProfile } from "../App/slices/profileSlice";
import type { ProfileForm } from "../types/profileType";
import { useAppDispatch, useAppSelector } from "./useTypedHooks";
import { storageService } from "../services/storageService";

const DEFAULT_VALUES: ProfileForm = {
    gender: "",
    dob: "",
    creditCard: "",
    married: false,
    children: undefined,
};

const useProfile = () => {
    const savedProfile = useAppSelector((state) => state.profile.profile);
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(!savedProfile);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const form = useForm<ProfileForm>({
        defaultValues: savedProfile ?? DEFAULT_VALUES,
    });

    const onSubmit = (data: ProfileForm) => {
        const toSave: ProfileForm = {
            ...data,
            children: data.married ? data.children : undefined,
        };
        dispatch(saveProfile(toSave));
        storageService.setProfile(toSave);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setIsEditing(false);
    };

    const handleCancel = () => {
        form.reset(savedProfile ?? DEFAULT_VALUES);
        setIsEditing(false);
    };

    return {
        form,
        savedProfile,
        isEditing,
        setIsEditing,
        saveSuccess,
        onSubmit,
        handleCancel,
    };
};

export default useProfile;
