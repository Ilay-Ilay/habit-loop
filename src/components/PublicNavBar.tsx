import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function PublicNavBar() {
  return (
    <header className="fixed w-full top-0 flex justify-between shrink-0 items-center gap-2 border-b bg-background px-8 py-4 z-50">
      <Link to="/">
        <img src="/Logo.svg" alt="Loop logo" className="h-8 w-auto" />
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant={"ghost"} size="lg">
            Login
          </Button>
        </Link>
        <Link to="/sign_up">
          <Button size="lg">Sign up</Button>
        </Link>
      </div>
    </header>
  );
}

export default PublicNavBar;
