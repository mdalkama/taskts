import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";
import useAuth from "../hooks/useAuth";
import { useAppSelector } from "../hooks/useTypedHooks";

const Navbar = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);

    const [menuOpen, setMenuOpen] = useState(false);
    const { handleLogout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black text-white">
            <div className="flex h-16 items-center justify-between px-5 md:px-10">
                {/* Logo */}
                <h1 className="cursor-pointer text-xl font-bold tracking-wide sm:text-2xl">
                    Onboard
                </h1>

                {/* Desktop Navbar */}
                {isAuthenticated && (
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-end flex-col">
                            {/* full name */}
                            <p className="max-w-[220px] truncate text-sm text-zinc-400">
                                {user?.firstName + " " + user?.lastName}
                            </p>

                            {/* Email */}
                            <p className="max-w-[220px] truncate text-sm text-zinc-400">
                                {user?.email}
                            </p>
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative group">
                            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700">
                                <FaUser />
                            </button>

                            <div className="absolute right-0 top-full hidden pt-2 group-hover:block hover:block z-50">
                                <div className="w-44 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl">
                                    <button className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-800">
                                        Profile
                                    </button>

                                    <button
                                        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10"
                                        onClick={() => {
                                            handleLogout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Menu Button */}
                {isAuthenticated && (
                    <button
                        className="text-2xl md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <IoCloseOutline /> : <HiOutlineBars3 />}
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {menuOpen && isAuthenticated && (
                <div className="border-t border-zinc-800 bg-zinc-950 px-5 py-4 md:hidden">
                    {/* User Info */}
                    <div className="mb-4 flex items-center gap-3 border-b border-zinc-800 pb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800">
                            <FaUser />
                        </div>

                        <div className="overflow-hidden">
                            <p className="text-sm text-zinc-300">
                                {user?.firstName + " " + user?.lastName}
                            </p>
                            <p className="truncate text-sm text-zinc-300">{user?.email}</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-3">
                        <button className="text-left text-sm text-zinc-300 hover:text-white">
                            Profile
                        </button>

                        <button
                            className="text-left text-sm text-red-400 hover:text-red-300"
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
