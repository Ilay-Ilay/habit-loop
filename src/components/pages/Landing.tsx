import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-4 items-start sm:items-center p-6 sm:p-8">
        <h1 className="text-4xl font-semibold lg:text-5xl">
          Build habits that actually stick
        </h1>
        <span className="text-muted-foreground">
          Track your habits, build consistency, and understand your progress
          over time.
        </span>
        <Link to="/sign_up">
          <Button size="lg">
            Get started free <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
