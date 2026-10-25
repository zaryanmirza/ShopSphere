
import {
  PackageSearch,
  Search,
  RotateCcw,
} from "lucide-react";

import ProductCard from "./ProductCard";

const CATEGORY_LABELS = {
  "men's clothing": "Men",
  "women's clothing": "Women",
  electronics: "Electronics",
  jewelery: "Jewelry",
};

export default function ProductGrid({
  products = [],
  title = "Our Collection",
  subtitle = "Discover products selected for you.",
  searchTerm = "",
  activeCategory = "",
  onClearFilters,
}) {
  const safeProducts = Array.isArray(products) ? products : [];

  const hasFilters = Boolean(
    searchTerm.trim() || activeCategory
  );

  const categoryLabel =
    CATEGORY_LABELS[activeCategory] || activeCategory;

  return (
    <section
      aria-labelledby="product-grid-heading"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      {/* Section heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            ShopSphere Collection
          </p>

          <h2
            id="product-grid-heading"
            className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {subtitle}
          </p>
        </div>

        {/* Product count */}
        <div
          aria-live="polite"
          className="flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          {safeProducts.length}{" "}
          {safeProducts.length === 1 ? "product" : "products"}
        </div>
      </div>

      {/* Active search and category information */}
      {hasFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {activeCategory && (
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              Category: {categoryLabel}
            </span>
          )}

          {searchTerm.trim() && (
            <span className="max-w-full truncate rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
              Search: "{searchTerm.trim()}"
            </span>
          )}
        </div>
      )}

      {/* Empty state */}
      {safeProducts.length === 0 ? (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/70 px-5 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
            {searchTerm.trim() ? (
              <Search size={30} />
            ) : (
              <PackageSearch size={30} />
            )}
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            {searchTerm.trim()
              ? "No matching products"
              : "No products found"}
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            {searchTerm.trim()
              ? `We couldn't find products matching "${searchTerm.trim()}". Try a different search term or clear your filters.`
              : "There are no products to display with the current selection. Try viewing the full collection."}
          </p>

          {/* Only show this button when a working callback is provided */}
          {hasFilters && typeof onClearFilters === "function" && (
            <button
              type="button"
              onClick={onClearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:translate-y-0"
            >
              <RotateCcw size={16} />
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        /* Responsive product cards */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {safeProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
