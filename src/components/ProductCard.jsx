
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  ArrowUpRight,
} from "lucide-react";

import { useShop } from "../context/useShop";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  const [imageError, setImageError] = useState(false);
  const [feedback, setFeedback] = useState("");

  const feedbackTimer = useRef(null);

  const saved = isWishlisted(product.id);
  const rating = Number(product.rating?.rate) || 0;
  const reviewCount = Number(product.rating?.count) || 0;
  const price = Number(product.price) || 0;

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) {
        clearTimeout(feedbackTimer.current);
      }
    };
  }, []);

  function showFeedback(message) {
    setFeedback(message);

    if (feedbackTimer.current) {
      clearTimeout(feedbackTimer.current);
    }

    feedbackTimer.current = setTimeout(() => {
      setFeedback("");
    }, 2200);
  }

  function openProductDetails() {
    navigate(`/products/${product.id}`);
  }

  function handleCardKeyDown(event) {
    // Allow keyboard navigation when the card itself has focus.
    // Do not intercept keyboard events from buttons inside the card.
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductDetails();
    }
  }

  function handleAddToCart(event) {
    event.stopPropagation();

    addToCart(product, 1);
    showFeedback("Added to your cart!");
  }

  function handleWishlist(event) {
    event.stopPropagation();

    toggleWishlist(product);

    showFeedback(
      saved
        ? "Removed from your wishlist"
        : "Added to your wishlist!"
    );
  }

  function handleImageError() {
    setImageError(true);
  }

  const categoryLabel = {
    "men's clothing": "Men",
    "women's clothing": "Women",
    electronics: "Electronics",
    jewelery: "Jewelry",
  }[product.category] || product.category || "Collection";

  return (
    <article
      role="group"
      tabIndex={0}
      aria-label={`Product card: ${product.title}. Press Enter to view details.`}
      onClick={openProductDetails}
      onKeyDown={handleCardKeyDown}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      {/* Product image */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-slate-50 p-6 sm:h-64">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onError={handleImageError}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ShoppingBag size={36} />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}

        {/* Category badge */}
        <span className="absolute left-3 top-3 max-w-[65%] truncate rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
          {categoryLabel}
        </span>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            saved
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          aria-pressed={saved}
          title={saved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
            saved
              ? "border-rose-200 bg-rose-50 text-rose-600"
              : "border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          }`}
        >
          <Heart
            size={19}
            fill={saved ? "currentColor" : "none"}
            strokeWidth={saved ? 2.3 : 1.8}
          />
        </button>

        {/* Temporary feedback message */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl bg-slate-900/95 px-3 py-2.5 text-xs font-semibold text-white shadow-lg"
          >
            <Check size={15} className="shrink-0 text-emerald-400" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-1.5 text-amber-500">
          <Star size={15} fill="currentColor" />

          <span className="text-sm font-bold text-slate-700">
            {rating.toFixed(1)}
          </span>

          <span className="text-xs text-slate-400">
            ({reviewCount} reviews)
          </span>
        </div>

        <h3 className="mt-3 h-[4.5rem] line-clamp-3 text-sm font-semibold leading-6 text-slate-800 transition group-hover:text-indigo-600 sm:text-base">
          {product.title}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-extrabold tracking-tight text-slate-900">
            ${price.toFixed(2)}
          </p>

          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-700"
            aria-hidden="true"
          >
            <ArrowUpRight size={17} />
          </span>
        </div>

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:translate-y-0"
        >
          <ShoppingBag size={17} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
