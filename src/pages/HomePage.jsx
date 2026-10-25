import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowDown,
  ArrowRight,
  ShoppingBag,
  Laptop,
  Shirt,
  Sparkles,
  Watch,
} from "lucide-react";

import ProductGrid from "../components/ProductGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorState from "../components/ErrorState";

import { fetchProducts } from "../services/fakeStoreApi";

const CATEGORIES = [
  {
    label: "Men",
    value: "men's clothing",
    description: "Everyday style and essentials",
    icon: Shirt,
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Women",
    value: "women's clothing",
    description: "Discover your next look",
    icon: Sparkles,
    color: "bg-rose-50 text-rose-700",
  },
  {
    label: "Electronics",
    value: "electronics",
    description: "Technology for daily life",
    icon: Laptop,
    color: "bg-violet-50 text-violet-700",
  },
  {
    label: "Jewelry",
    value: "jewelery",
    description: "Small details, big impact",
    icon: Watch,
    color: "bg-amber-50 text-amber-700",
  },
];

export default function HomePage({
  searchTerm,
  activeCategory,
  onSearch,
  onCategorySelect,
}) {
  const [localSearch, setLocalSearch] = useState("");
  const [localCategory, setLocalCategory] = useState("");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Support both parent-controlled state and standalone use.
  const currentSearch = searchTerm ?? localSearch;
  const currentCategory = activeCategory ?? localCategory;

  // Load product data from Fake Store API. State updates happen only after
  // the async request settles, avoiding cascading renders from the effect.
  const loadProducts = useCallback(async (signal) => {
    try {
      const data = await fetchProducts({ signal });
      if (signal?.aborted) return;
      setProducts(data);
      setError("");
    } catch (err) {
      if (signal?.aborted || err?.name === "AbortError") return;
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load products. Please try again."
      );
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        void loadProducts(controller.signal);
      }
    });
    return () => controller.abort();
  }, [loadProducts]);

  const handleRetryProducts = useCallback(() => {
    setIsLoading(true);
    setError("");
    void loadProducts();
  }, [loadProducts]);

  // Handle search input changes from the parent Navbar or locally.
  const handleSearch = useCallback(
    (value) => {
      if (typeof onSearch === "function") {
        onSearch(value);
      } else {
        setLocalSearch(value);
      }
    },
    [onSearch]
  );

  // Handle category selections from the Navbar or category cards.
  const handleCategorySelect = useCallback(
    (category) => {
      if (typeof onCategorySelect === "function") {
        onCategorySelect(category);
      } else {
        setLocalCategory(category);
      }
    },
    [onCategorySelect]
  );

  // Clear both the search and category filters.
  function clearFilters() {
    handleSearch("");
    handleCategorySelect("");
  }

  function showCollection() {
    document
      .getElementById("shop-collection")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  function handleExploreAll() {
    clearFilters();

    // Allow the filter state to update before scrolling.
    requestAnimationFrame(showCollection);
  }

  // Apply live search and category filtering.
  const filteredProducts = useMemo(() => {
    const query = currentSearch.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        !currentCategory ||
        product.category === currentCategory;

      const searchableText = [
        product.title,
        product.description,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, currentSearch, currentCategory]);

  const selectedCategory = CATEGORIES.find(
    (category) => category.value === currentCategory
  );

  const pageTitle = currentSearch.trim()
    ? "Search Results"
    : selectedCategory
      ? `${selectedCategory.label} Collection`
      : "Explore Our Collection";

  const pageSubtitle = currentSearch.trim()
    ? `Products matching "${currentSearch.trim()}".`
    : selectedCategory
      ? `Explore products in ${selectedCategory.label}.`
      : "Discover fashion, technology, and accessories for every day.";

  return (
    <main>
      {/* Hero section */}
      <section className="overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-2 shadow-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Sparkles size={14} />
              </span>

              <span className="text-xs font-bold tracking-wide text-indigo-700">
                YOUR EVERYDAY SHOPPING DESTINATION
              </span>
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find your next
              <span className="block text-indigo-600">
                favorite thing.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              From everyday essentials to standout accessories,
              discover a collection made for your style and lifestyle.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExploreAll}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:translate-y-0"
              >
                Explore Products
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={showCollection}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100"
              >
                View Collection
                <ArrowDown size={18} />
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Multiple categories
              </span>

              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                Live product data
              </span>
            </div>
          </div>

          {/* Decorative hero artwork made with CSS and icons */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-violet-200/60 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-36 w-36 rounded-full bg-indigo-200/60 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                    ShopSphere
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                    Made to discover.
                  </h2>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                  <ShoppingBag size={24} />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {CATEGORIES.map((category) => {
                  const CategoryIcon = category.icon;

                  return (
                    <button
                      type="button"
                      key={category.value}
                      onClick={() =>
                        handleCategorySelect(category.value)
                      }
                      className={`group min-h-32 rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${currentCategory === category.value
                          ? "border-indigo-300 bg-white shadow-md"
                          : "border-slate-100 bg-white/80"
                        }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${category.color}`}
                      >
                        <CategoryIcon size={20} />
                      </span>

                      <span className="mt-3 block text-sm font-bold text-slate-900">
                        {category.label}
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        {category.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="absolute -bottom-5 right-6 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:right-10">
              <p className="text-xs font-semibold text-slate-500">
                One place to explore
              </p>

              <p className="mt-1 text-sm font-extrabold text-slate-900">
                Your next find awaits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category navigation */}
      <section
        aria-labelledby="categories-heading"
        className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
              Browse by interest
            </p>

            <h2
              id="categories-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              Shop your way
            </h2>
          </div>

          <button
            type="button"
            onClick={handleExploreAll}
            className="inline-flex w-fit items-center gap-2 rounded-lg py-2 text-sm font-semibold text-indigo-600 transition hover:gap-3 hover:text-indigo-800"
          >
            All products
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleCategorySelect("")}
            aria-pressed={!currentCategory}
            className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${!currentCategory
                ? "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                : "border-slate-200 bg-white text-slate-600"
              }`}
          >
            All
          </button>

          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category.value}
              onClick={() => handleCategorySelect(category.value)}
              aria-pressed={currentCategory === category.value}
              className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${currentCategory === category.value
                  ? "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white"
                  : "border-slate-200 bg-white text-slate-600"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Product collection */}
      <div id="shop-collection" className="scroll-mt-28">
        {isLoading ? (
          <LoadingSpinner
            message="Fetching products from Fake Store API..."
          />
        ) : error ? (
          <ErrorState
            title="We couldn't load the products"
            message={error}
            onRetry={handleRetryProducts}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            title={pageTitle}
            subtitle={pageSubtitle}
            searchTerm={currentSearch}
            activeCategory={currentCategory}
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </main>
  );
}
