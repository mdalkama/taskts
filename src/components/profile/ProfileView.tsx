import type { ProfileForm } from "../../types/profileType";
import { maskCard } from "../../utils/cardUtils";

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

type Props = {
    user: User | null;
    profile: ProfileForm;
    onEdit: () => void;
};

const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="border rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

const ProfileView = ({ user, profile, onEdit }: Props) => {
    return (
        <div className="mt-8">
            <div className="grid md:grid-cols-2 gap-4">
                <Field
                    label="Full Name"
                    value={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
                />
                <Field label="Email" value={user?.email ?? ""} />
                <Field label="Gender" value={profile.gender || "—"} />
                <Field label="Date of Birth" value={profile.dob || "—"} />
                <Field label="Credit Card" value={maskCard(profile.creditCard)} />
                <Field label="Married" value={profile.married ? "Yes" : "No"} />
                {profile.married && (
                    <Field
                        label="Number of Children"
                        value={String(profile.children ?? 0)}
                    />
                )}
            </div>

            <button
                onClick={onEdit}
                className="w-full mt-8 bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileView;
