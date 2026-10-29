
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function RootRedirect() {
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/Home" replace />;
  }

  return <Navigate to="/Login" replace />;

  
}
