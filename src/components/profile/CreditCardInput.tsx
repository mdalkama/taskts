import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { formatCard } from "../../utils/cardUtils";

type Props = {
    registration: UseFormRegisterReturn;
    error?: FieldError;
};

const CreditCardInput = ({ registration, error }: Props) => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <label className="block text-sm font-medium mb-2">
                Credit Card Number
            </label>

            <div className="relative">
                <input
                    {...registration}
                    type={show ? "text" : "password"}
                    onChange={(e) => {
                        e.target.value = formatCard(e.target.value);
                        registration.onChange(e);
                    }}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full border rounded-lg px-4 py-3 pr-12 outline-none ${error ? "border-red-500" : "border-gray-300"
                        }`}
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default CreditCardInput;
