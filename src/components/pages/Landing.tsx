import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/Hero.svg"
        alt="Hero"
        className="absolute top-1/2 sm:top-10 w-[130%] max-w-none sm:w-360"
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6 px-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Build habits that actually stick
        </h1>

        <p className="max-w-lg text-muted-foreground text-lg">
          Track your habits, build consistency, and understand your progress
          over time.
        </p>

        <Link to="/sign_up">
          <Button size="lg">
            Get started free
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Landing;
