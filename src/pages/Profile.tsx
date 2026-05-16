import { useAppSelector } from "../hooks/useTypedHooks";
import useProfile from "../hooks/useProfile";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileView from "../components/profile/ProfileView";
import ReadOnlyField from "../components/profile/ReadOnlyField";
import CreditCardInput from "../components/profile/CreditCardInput";
import MarriedToggle from "../components/profile/MarriedToggle";
import SelectField from "../components/SelectField";
import Input from "../components/Input";

const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

const Profile = () => {
    const { user } = useAppSelector((state) => state.auth);
    const {
        form,
        savedProfile,
        isEditing,
        setIsEditing,
        saveSuccess,
        onSubmit,
        handleCancel,
    } = useProfile();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = form;
    const married = watch("married");

    return (
        <div className="min-h-[calc(100vh-65px)] bg-gray-100 flex justify-center items-center px-4 py-10">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-8">
                {/* Header: avatar + name + email */}
                <ProfileHeader
                    firstName={user?.firstName ?? ""}
                    lastName={user?.lastName ?? ""}
                    email={user?.email ?? ""}
                />

                {/* Success banner */}
                {saveSuccess && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                        Profile saved successfully!
                    </div>
                )}

                {/* VIEW MODE — show saved data with Edit button */}
                {!isEditing && savedProfile && (
                    <ProfileView
                        user={user}
                        profile={savedProfile}
                        onEdit={() => setIsEditing(true)}
                    />
                )}

                {/* EDIT MODE — form to fill / update profile */}
                {isEditing && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            {/* read-only — pulled from signup */}
                            <ReadOnlyField
                                label="Full Name"
                                value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                            />
                            <ReadOnlyField label="Email" value={user?.email ?? ""} />

                            <SelectField
                                label="Gender"
                                registration={register("gender", {
                                    required: "Gender is required",
                                })}
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
                                    required: "Credit card is required",
                                    validate: (val) =>
                                        val.replace(/\s/g, "").length === 16 ||
                                        "Card must be 16 digits",
                                })}
                                error={errors.creditCard}
                            />

                            <MarriedToggle
                                value={married}
                                onChange={(val) => setValue("married", val)}
                            />

                            {/* show children field only when married is Yes */}
                            {married && (
                                <Input
                                    type="number"
                                    label="Number of Children"
                                    registration={register("children", {
                                        required: "Required",
                                        min: { value: 0, message: "Cannot be negative" },
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Enter number"
                                    errors={errors.children}
                                />
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="submit"
                                className="flex-1 bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                            >
                                Save Profile
                            </button>

                            {/* Cancel only makes sense when a profile already exists */}
                            {savedProfile && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
