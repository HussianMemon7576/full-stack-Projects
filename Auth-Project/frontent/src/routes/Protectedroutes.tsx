import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type Props = {
    children: ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
    const { loading, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/Login" replace />;
    }

    return children;
};

export default ProtectedRoutes;