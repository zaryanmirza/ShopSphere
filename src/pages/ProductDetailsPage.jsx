
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

import Breadcrumbs from "../components/Breadcrumbs";
import QuantitySelector from "../components/QuantitySelector";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import { fetchProductById } from "../services/fakeStoreApi";
import { useShop } from "../context/useShop";

const CATEGORY_LABELS = {
  "men's clothing": "Men",
  "women's clothing": "Women",
  electronics: "Electronics",
  jewelery: "Jewelry",
};

export default function ProductDetailsPage({
  onCategorySelect,
}) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    openCart,
    toggleWishlist,
    isWishlisted,
  } = useShop();

  const [loadedProduct, setLoadedProduct] = useState(null);
  const [quantitySelection, setQuantitySelection] = useState({
    productId: null,
    quantity: 1,
  });
  const quantity = quantitySelection.productId === productId
    ? quantitySelection.quantity
    : 1;
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState({
    productId: null,
    message: "",
  });
  const [retryKey, setRetryKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Only use product/error data belonging to the currently requested ID.
  // This shows the loading state immediately when navigating between products.
  const product = loadedProduct && String(loadedProduct.id) === String(productId)
    ? loadedProduct
    : null;
  const error = errorState.productId === String(productId)
    ? errorState.message
    : "";
  const isLoadingCurrentProduct = isLoading || (!product && !error);

  // Fetch the product whenever its ID changes or retry is requested.
  // No state is changed synchronously before the first await.
  const loadProduct = useCallback(async (signal) => {
    try {
      const data = await fetchProductById(productId, { signal });
      if (signal?.aborted) return;
      setLoadedProduct(data);
      setErrorState({ productId: null, message: "" });
      setImageError(false);
      setFeedback("");
    } catch (err) {
      if (signal?.aborted || err?.name === "AbortError") return;
      setErrorState({
        productId: String(productId),
        message: err instanceof Error
          ? err.message
          : "Unable to load this product.",
      });
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        void loadProduct(controller.signal);
      }
    });
    return () => controller.abort();
  }, [loadProduct, retryKey]);

  function handleRetryProduct() {
    setIsLoading(true);
    setErrorState({ productId: null, message: "" });
    setRetryKey((current) => current + 1);
  }

  if (isLoadingCurrentProduct) {
    return (
      <main>
        <LoadingSpinner
          message="Loading product details..."
          fullPage
        />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main>
        <ErrorState
          title="Couldn't load this product"
          message={error || "The requested product was not found."}
          onRetry={handleRetryProduct}
          retryLabel="Try Again"
          fullPage
        />

        <div className="-mt-12 mb-12 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Shop
          </button>
        </div>
      </main>
    );
  }

  const rating = Number(product.rating?.rate) || 0;
  const reviewCount = Number(product.rating?.count) || 0;
  const price = Number(product.price) || 0;

  const categoryLabel =
    CATEGORY_LABELS[product.category] ||
    product.category ||
    "Collection";

  const saved = isWishlisted(product.id);

  const breadcrumbs = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: categoryLabel,
      category: product.category,
    },
    {
      label: product.title,
      onClick: () => {
        document
          .getElementById("product-details-top")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  function handleAddToCart() {
    addToCart(product, quantity);
    setFeedback(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart.`
    );
  }

  function handleBuyNow() {
    addToCart(product, quantity);
    navigate("/checkout");
  }

  function handleWishlist() {
    toggleWishlist(product);
    setFeedback(
      saved
        ? "Removed from your wishlist."
        : "Added to your wishlist."
    );
  }

  function handleCategoryClick(category) {
    if (typeof onCategorySelect === "function") {
      onCategorySelect(category);
    } else {
      navigate(`/?category=${encodeURIComponent(category)}`);
    }
  }

  return (
    <main
      id="product-details-top"
      className="min-h-screen bg-white"
    >
      <Breadcrumbs
        items={breadcrumbs}
        onCategorySelect={handleCategoryClick}
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Product image */}
          <div className="relative flex min-h-[340px] items-center justify-center rounded-3xl border border-slate-100 bg-slate-50 p-8 sm:min-h-[480px] sm:p-12">
            {!imageError && product.image ? (
              <img
                src={product.image}
                alt={product.title}
                onError={() => setImageError(true)}
                className="max-h-[420px] w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <ShoppingBag size={48} />
                <span className="text-sm">Image unavailable</span>
              </div>
            )}

            <span className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              {categoryLabel}
            </span>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                saved
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
              aria-pressed={saved}
              className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-sm transition hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${saved
                  ? "border-rose-200 text-rose-600"
                  : "border-slate-200 text-slate-500 hover:text-rose-600"
                }`}
            >
              <Heart
                size={21}
                fill={saved ? "currentColor" : "none"}
              />
            </button>
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              ShopSphere Collection
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("product-description")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-4 flex w-fit items-center gap-2 rounded-lg py-1 text-sm text-slate-500 transition hover:text-indigo-600"
              aria-label={`View rating details, ${rating} out of 5`}
            >
              <span className="flex items-center gap-1 text-amber-500">
                <Star size={17} fill="currentColor" />
                <span className="font-bold text-slate-800">
                  {rating.toFixed(1)}
                </span>
              </span>

              <span>({reviewCount} reviews)</span>
            </button>

            <div className="mt-6 flex items-baseline gap-3">
              <p className="text-3xl font-extrabold tracking-tight text-slate-950">
                ${price.toFixed(2)}
              </p>

              <span className="text-xs font-medium text-slate-400">
                Demo catalog price
              </span>
            </div>

            <div
              id="product-description"
              className="mt-7 border-t border-slate-100 pt-6"
            >
              <h2 className="text-sm font-bold text-slate-900">
                Product Description
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {product.description}
              </p>
            </div>

            {/* Quantity selection */}
            <div className="mt-7">
              <QuantitySelector
                quantity={quantity}
                onChange={(nextQuantity) =>
                  setQuantitySelection({ productId, quantity: nextQuantity })
                }
                min={1}
                max={99}
                label="Quantity"
              />
            </div>

            {/* Purchase actions */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                <ShoppingBag size={19} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3.5 font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                Buy Now
                <ShoppingBag size={18} />
              </button>
            </div>

            {feedback && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
              >
                <CheckCircle2
                  size={18}
                  className="shrink-0"
                />
                <span>{feedback}</span>
                <button
                  type="button"
                  onClick={() => setFeedback("")}
                  aria-label="Dismiss message"
                  className="ml-auto rounded-md px-2 py-1 transition hover:bg-emerald-100"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={openCart}
                  className="shrink-0 rounded-lg px-2 py-1 font-bold text-indigo-700 transition hover:bg-indigo-50"
                >
                  View Cart
                </button>
              </div>
            )}

            {/* Store information */}
            <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3">
                <Truck
                  size={20}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Shipping Information
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    This is a demo store. No real orders are shipped.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RotateCcw
                  size={20}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Return Policy
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Return handling is not connected in this demo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Demo Checkout
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    No real payment details are collected.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-8 w-fit rounded-lg py-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
            >
              ← Continue browsing
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
