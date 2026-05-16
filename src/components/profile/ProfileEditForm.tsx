import type { UseFormReturn } from "react-hook-form";
import type { ProfileForm } from "../../types/profileType";
import type { SignUpForm } from "../../types/authType";
import ReadOnlyField from "./ReadOnlyField";
import CreditCardInput from "./CreditCardInput";
import MarriedToggle from "./MarriedToggle";
import SelectField from "../SelectField";
import Input from "../Input";

const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

type User = Pick<SignUpForm, "firstName" | "lastName" | "email">;

type Props = {
    user: User | null;
    form: UseFormReturn<ProfileForm>;
    onSubmit: (data: ProfileForm) => void;
    onCancel: () => void;
    hasSavedProfile: boolean;
};

const ProfileEditForm = ({
    user,
    form,
    onSubmit,
    onCancel,
    hasSavedProfile,
}: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const married = watch("married");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-5 mt-8">
                <ReadOnlyField
                    label="Full Name"
                    value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                />

                <ReadOnlyField label="Email" value={user?.email ?? ""} />

                <SelectField
                    label="Gender"
                    registration={register("gender", { required: "Gender is required" })}
                    options={GENDER_OPTIONS}
                    placeholder="Select Gender"
                    error={errors.gender}
                />

                <Input
                    type="date"
                    label="Date of Birth"
                    registration={register("dob", {
                        required: "Date of birth is required",
                    })}
                    placeholder=""
                    errors={errors.dob}
                />

                <CreditCardInput
                    registration={register("creditCard", {
                        required: "Credit card number is required",
                        validate: (val) =>
                            val.replace(/\s/g, "").length === 16 ||
                            "Card number must be 16 digits",
                    })}
                    error={errors.creditCard}
                />

                <MarriedToggle
                    value={married}
                    onChange={(val) => setValue("married", val)}
                />

                {married && (
                    <Input
                        type="number"
                        label="Number of Children"
                        registration={register("children", {
                            required: "Number of children is required",
                            min: { value: 0, message: "Cannot be negative" },
                            valueAsNumber: true,
                        })}
                        placeholder="Enter number"
                        errors={errors.children}
                    />
                )}
            </div>

            <div className="flex gap-3 mt-8">
                <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                    Save Profile
                </button>

                {hasSavedProfile && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProfileEditForm;
