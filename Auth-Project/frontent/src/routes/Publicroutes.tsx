import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type Props = {
    children: ReactNode;
};

const PublicRoutes = ({ children }: Props) => {
    const { loading, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );
    console.log(isAuthenticated)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/Home" replace />;
    }

    return children;
};

export default PublicRoutes;