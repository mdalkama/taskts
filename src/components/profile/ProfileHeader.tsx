type Props = {
    firstName: string;
    lastName: string;
    email: string;
};

const ProfileHeader = ({ firstName, lastName, email }: Props) => {
    return (
        <div className="flex flex-col items-center border-b pb-6">
            <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
            />
            <h1 className="text-2xl font-bold mt-4">{firstName + " " + lastName}</h1>
            <p className="text-gray-500">{email}</p>
        </div>
    );
};

export default ProfileHeader;
