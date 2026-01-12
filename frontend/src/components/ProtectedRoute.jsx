import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    console.warn("ProtectedRoute: No token found, redirecting to login.");
    // Redirect to login page but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute: Token found, granting access.");
  return children;
};

export default ProtectedRoute;
