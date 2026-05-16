import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Input = {
    errors?: FieldError;
    registration: UseFormRegisterReturn;
    placeholder: string;
    label: string;
    type: string;
    blurAction?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Input> = ({
    errors,
    registration,
    placeholder,
    label,
    type = "text",
    blurAction = () => { },
}) => {
    return (
        <div className="w-full mb-3">
            <label className="text-sm">{label}</label>
            <input
                className={`w-full h-10 pl-2 border rounded-md ${errors ? "border-red-500" : "border-gray-300"}`}
                {...registration}
                onBlur={(e) => {
                    registration.onBlur(e);
                    blurAction(e);
                }}
                type={type}
                placeholder={placeholder}
            />
            {errors && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
        </div>
    );
};

export default Input;
