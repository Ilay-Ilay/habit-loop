import { Spinner } from "../ui/spinner";

function LoadingSpinner() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Spinner className="size-12" />
    </div>
  );
}

export default LoadingSpinner;
