import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="flex items-center bg-sidebar p-8 min-h-screen">
      <div className="flex flex-col gap-8 items-center mx-auto">
        <div className="flex flex-col gap-4 text-center items-center p-8 md:p-24">
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
        <img
          src="/Hero.svg"
          alt="Hero"
          className="absolute top-1/2 sm:top-10 w-[130%] max-w-none sm:w-360 z-0"
        />
      </div>
    </section>
  );
}

export default Landing;
