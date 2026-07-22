import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../providers/AuthContext";
import PublicNavBar from "../PublicNavBar";

function Public() {
  const { session } = useAuth();
  if (session) return <Navigate to="/habits" replace />;

  return (
    <div className="flex flex-col">
      <PublicNavBar />
      <Outlet />
    </div>
  );
}

export default Public;
