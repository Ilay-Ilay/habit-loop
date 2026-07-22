import { Navigate } from "react-router-dom";
import useAuth from "../../../providers/AuthContext";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPassword() {
  const { isRecovery } = useAuth();

  if (!isRecovery) return <Navigate to="/account" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <ResetPasswordForm />
    </div>
  );
}
export default ResetPassword;
