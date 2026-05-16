import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Option = {
    value: string;
    label: string;
};

type Props = {
    label: string;
    registration: UseFormRegisterReturn;
    options: Option[];
    placeholder: string;
    error?: FieldError;
};

const SelectField = ({
    label,
    registration,
    options,
    placeholder,
    error,
}: Props) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <select
                {...registration}
                className={`w-full border rounded-lg px-4 py-3 outline-none ${error ? "border-red-500" : "border-gray-300"
                    }`}
            >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default SelectField;
