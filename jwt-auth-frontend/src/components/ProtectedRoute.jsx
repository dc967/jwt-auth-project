import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// allowedRoles na diya ho to sirf login check hoga
export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
        <h2 className="text-xl font-semibold">403 — Access denied</h2>
        <p className="text-muted-foreground">Aapke role ({user.role}) ko yeh page dekhne ki permission nahi hai.</p>
      </div>
    );
  }

  return children;
}
