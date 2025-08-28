import { Navigate, Outlet } from "react-router-dom";

// COMPONENTS
import { useAuth } from "providers/AuthProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();
  const { isAuthenticated } = auth;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
