type Props = {
    label: string;
    value: string;
};

const ReadOnlyField = ({ label, value }: Props) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <input
                value={value}
                disabled
                className="w-full border rounded-lg px-4 py-3 bg-gray-100 outline-none"
            />
        </div>
    );
};

export default ReadOnlyField;
