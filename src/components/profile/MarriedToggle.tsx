type Props = {
    value: boolean;
    onChange: (val: boolean) => void;
};

const MarriedToggle = ({ value, onChange }: Props) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">Married</label>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => onChange(true)}
                    className={`px-5 py-2 rounded-lg border transition ${value ? "bg-black text-white" : "bg-white"
                        }`}
                >
                    Yes
                </button>

                <button
                    type="button"
                    onClick={() => onChange(false)}
                    className={`px-5 py-2 rounded-lg border transition ${!value ? "bg-black text-white" : "bg-white"
                        }`}
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default MarriedToggle;
