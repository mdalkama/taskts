import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/useTypedHooks";

type ProtectedRoutesProps = {
    children: React.ReactNode;
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    } else {
        return children;
    }
};

export default ProtectedRoutes;
