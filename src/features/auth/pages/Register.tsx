import SignupForm from "../components/SignUpForm";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-8 p-8">
      <SignupForm />
      <div className="hidden sm:flex items-center flex-1 justify-center">
        <img src="/Checkboxes.svg" className="rounded-lg" alt="" />
      </div>
    </div>
  );
}

export default Register;
