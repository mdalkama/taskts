import { useForm } from "react-hook-form";
import Input from "../components/Input";
import type { SignUpForm } from "../types/authType";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../hooks/useTypedHooks";

const Signup = () => {
    const { handleSignup, checkEmail } = useAuth();
    const navigate = useNavigate();
    const [emailFound, setEmailFound] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<SignUpForm>();

    const password = watch("password");
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex md:items-center justify-center">
            <div className="max-w-200 min-w-100 px-5 py-8 flex justify-center flex-col md:shadow-md bg-white md:border-gray-300 md:border rounded-md">
                <p className="w-full text-center font-bold text-xl mb-2.5">Sign Up</p>
                {emailFound && (
                    <div className="mb-3 rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-sm text-blue-700">
                        Email found! Name has been prefilled from our records.
                    </div>
                )}
                <form onSubmit={handleSubmit(handleSignup)}>
                    {/* first name */}
                    <Input
                        type="text"
                        registration={register("firstName", {
                            required: "First name is required",
                        })}
                        label={"First Name"}
                        errors={errors.firstName}
                        placeholder={"Enter First Name"}
                    />
                    {/* last name */}
                    <Input
                        type="text"
                        registration={register("lastName", {
                            required: "Last name is required",
                        })}
                        label={"Last Name"}
                        errors={errors.lastName}
                        placeholder={"Enter Last Name"}
                    />
                    {/* email */}
                    <Input
                        type="email"
                        blurAction={async (e) => {
                            const found = await checkEmail(e.target.value, setValue);
                            setEmailFound(found);
                        }}
                        registration={register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Please enter a valid email",
                            },
                        })}
                        label={"Email"}
                        errors={errors.email}
                        placeholder={"Enter your email"}
                    />
                    {/* password */}
                    <Input
                        type="password"
                        registration={register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 char",
                            },
                        })}
                        label={"Password"}
                        errors={errors.password}
                        placeholder={"*******"}
                    />
                    {/* confirm password */}
                    <Input
                        type="password"
                        registration={register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (val) => val === password || "Passwords do not match",
                        })}
                        label={"Confirm Password"}
                        errors={errors.confirmPassword}
                        placeholder={"*******"}
                    />
                    <button className="w-full bg-black rounded-md h-10 text-white">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
