
import { LoaderCircle, ShoppingBag } from "lucide-react";

export default function LoadingSpinner({
  message = "Loading products...",
  fullPage = false,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex w-full flex-col items-center justify-center px-4 text-center ${
        fullPage ? "min-h-[60vh]" : "min-h-[280px] py-12"
      }`}
    >
      {/* Animated brand icon */}
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-3xl bg-indigo-100 animate-pulse" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <ShoppingBag size={30} strokeWidth={1.8} />
        </div>

        <LoaderCircle
          size={88}
          strokeWidth={1.5}
          aria-hidden="true"
          className="absolute inset-[-4px] animate-spin text-indigo-600"
        />
      </div>

      {/* Loading message */}
      <h2 className="text-lg font-bold text-slate-900">
        Please wait
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {message}
      </p>

      {/* Animated loading indicator */}
      <div
        aria-hidden="true"
        className="mt-6 flex items-center gap-1.5"
      >
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
