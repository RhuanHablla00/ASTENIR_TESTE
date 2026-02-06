import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/stores/hooks";
import { selectIsAuthenticated } from "@/stores/authSlice";

export default function RedirectGate() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const workspace = useAppSelector((state) => state.workspace?.selectedWorkspace?.id);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.email_verified && !isAuthenticated) {
    return <Navigate to="/verify-email" replace />;
  }

  if (workspace) {
    return <Navigate to={`/workspace/${workspace}`} replace />;
  }

  return <Navigate to="/workspace/list" replace />;
}
