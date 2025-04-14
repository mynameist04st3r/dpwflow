import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userRole, minimumRole, children }) => {
  return userRole >= minimumRole ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
