
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the products. Please check your connection and try again.",
  onRetry,
  retryLabel = "Try Again",
  fullPage = false,
}) {
  function handleRetry() {
    if (typeof onRetry === "function") {
      onRetry();
      return;
    }

    // Fallback: reload the current page if no retry handler was provided.
    window.location.reload();
  }

  return (
    <section
      role="alert"
      className={`flex w-full flex-col items-center justify-center px-5 text-center ${
        fullPage ? "min-h-[60vh]" : "min-h-[320px] py-12"
      }`}
    >
      {/* Error illustration */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
        <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-amber-100 text-amber-600">
          <WifiOff size={15} />
        </div>

        <AlertTriangle size={38} strokeWidth={1.7} />
      </div>

      {/* Error heading */}
      <h2 className="mt-6 text-xl font-extrabold text-slate-900 sm:text-2xl">
        {title}
      </h2>

      {/* Error description */}
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
        {message}
      </p>

      {/* Retry button */}
      <button
        type="button"
        onClick={handleRetry}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:translate-y-0"
      >
        <RefreshCw size={18} />
        {retryLabel}
      </button>

      <p className="mt-4 text-xs text-slate-400">
        Your shopping experience is still here. Let's try again.
      </p>
    </section>
  );
}
