import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) => {
  const { isAuthenticated,rol} = useAuthStore();
  const location = useLocation();
  const userRole = rol;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <Navigate to="/unauthorized" state={{ from: location }} replace={true} />
    );
  }

  return <>{children}</>;
};
export default ProtectedRoute;
