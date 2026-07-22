import AppSidebar from "../AppSidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import useAuth from "../../providers/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Protected() {
  const { session, isRecovery } = useAuth();

  const location = useLocation();

  if (!session) return <Navigate to="/login" replace />;

  if (isRecovery && location.pathname !== "/reset_password") {
    return <Navigate to="/reset_password" replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
