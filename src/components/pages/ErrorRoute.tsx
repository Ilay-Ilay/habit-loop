import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function ErrorRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-4">
      <h1 className="text-5xl font-semibold text-muted-foreground">
        Not found!
      </h1>
      <Link to="/">
        <Button size={"lg"}>Back to homepage</Button>
      </Link>
    </div>
  );
}

export default ErrorRoute;
