import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/amazon/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;