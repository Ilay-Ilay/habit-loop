import SignupForm from "../components/SignUpForm";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignupForm />
      <div className="flex-1 hidden sm:block"></div>
    </div>
  );
}

export default Register;
