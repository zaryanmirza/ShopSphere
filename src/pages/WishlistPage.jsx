
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Sparkles,
  CheckCircle2,
  PackageOpen,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import { useShop } from "../context/useShop";

export default function WishlistPage() {
  const navigate = useNavigate();

  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    addToCart,
  } = useShop();

  const [feedback, setFeedback] = useState("");

  // Automatically clear the success message after a short time.
  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => {
      setFeedback("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [feedback]);

  function handleContinueShopping() {
    navigate("/");
  }

  function handleAddAllToCart() {
    if (wishlist.length === 0) {
      setFeedback("Your wishlist is empty.");
      return;
    }

    wishlist.forEach((product) => {
      addToCart(product, 1);
    });

    setFeedback(
      `${wishlist.length} ${wishlist.length === 1 ? "product" : "products"} added to your cart.`
    );
  }

  function handleRemoveFromWishlist(product) {
    removeFromWishlist(product.id);
    setFeedback(`Removed "${product.title}" from your wishlist.`);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page header */}
      <section className="overflow-hidden bg-gradient-to-br from-rose-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <button
            type="button"
            onClick={handleContinueShopping}
            className="mb-8 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm sm:h-16 sm:w-16">
                <Heart size={30} strokeWidth={1.8} />
              </div>

              <div>
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-600">
                  <Sparkles size={14} />
                  Your Personal Collection
                </p>

                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  My Wishlist
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  Keep the things you love in one place, and come back
                  whenever you're ready to shop.
                </p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-4 rounded-2xl border border-white bg-white/90 px-5 py-4 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <Heart size={22} />
              </div>

              <div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {wishlistCount}
                </p>

                <p className="text-xs font-medium text-slate-500">
                  Saved {wishlistCount === 1 ? "product" : "products"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main wishlist content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Success / feedback message */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />

            <p className="flex-1 leading-6">{feedback}</p>

            <button
              type="button"
              onClick={() => setFeedback("")}
              aria-label="Dismiss message"
              className="rounded-md px-2 py-1 font-semibold transition hover:bg-emerald-100"
            >
              ×
            </button>
          </div>
        )}

        {wishlist.length === 0 ? (
          /* Empty wishlist */
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-400">
              <PackageOpen size={38} strokeWidth={1.6} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
              Your wishlist is waiting
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
              You haven't saved any products yet. Browse our collection
              and tap the heart icon on anything you like.
            </p>

            <button
              type="button"
              onClick={handleContinueShopping}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist toolbar */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Your saved items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Revisit a favorite or add it to your shopping cart.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddAllToCart}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                <ShoppingBag size={17} />
                Add All to Cart
              </button>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="relative min-w-0"
                >
                  <ProductCard product={product} />
                  <button
                    type="button"
                    onClick={() => handleRemoveFromWishlist(product)}
                    aria-label={`Remove ${product.title} from wishlist`}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <Trash2 size={16} />
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom action */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:px-7">
              <div>
                <h3 className="font-bold text-slate-900">
                  Still exploring?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Discover more products to add to your collection.
                </p>
              </div>

              <button
                type="button"
                onClick={handleContinueShopping}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Browse More
                <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
