
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  SearchX,
  ShoppingBag,
} from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  function goBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16">
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-indigo-100/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-violet-100/70 blur-3xl"
      />

      {/* Main content */}
      <section className="relative w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white bg-white shadow-xl shadow-indigo-950/5 sm:h-44 sm:w-44">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 sm:h-28 sm:w-28">
            <SearchX size={58} strokeWidth={1.4} />
          </div>

          <span className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-extrabold text-white shadow-lg shadow-indigo-600/25">
            404
          </span>
        </div>

        {/* Error message */}
        <p className="mt-9 text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">
          Page not found
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
          Oops! Lost your way?
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
          The page you're looking for may have moved, been removed,
          or never existed. Don't worry — there are plenty of great
          products waiting for you at ShopSphere.
        </p>

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-indigo-600/15 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:translate-y-0"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight size={17} />
          </button>

          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100 active:translate-y-0"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Brand reminder */}
        <div className="mx-auto mt-12 flex max-w-sm items-center justify-center gap-3 border-t border-slate-200 pt-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <ShoppingBag size={20} />
          </div>

          <div className="text-left">
            <p className="font-extrabold text-slate-900">
              ShopSphere
            </p>
            <p className="text-xs text-slate-500">
              Find your next favorite thing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
