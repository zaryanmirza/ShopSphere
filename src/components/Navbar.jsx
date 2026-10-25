
import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Search,
  Heart,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const categories = [
  { label: "Men", value: "men's clothing" },
  { label: "Women", value: "women's clothing" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelry", value: "jewelery" },
];

export default function Navbar({
  onHome,
  onCategorySelect,
  onSearch,
  onOpenCart,
  onOpenWishlist,
  cartCount = 0,
  activeCategory = "",
  searchTerm = "",
}) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef(null);

  // Close menus when the user clicks outside or presses Escape.
  useEffect(() => {
    function handlePointerDown(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setCategoryOpen(false);
        setMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setCategoryOpen(false);
        setMobileMenuOpen(false);
        setSearchOpen(false);
        if (searchOpen) onSearch("");
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSearch, searchOpen]);

  function handleHome() {
    setCategoryOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onSearch("");
    onHome();
  }

  function handleCategorySelect(category) {
    setCategoryOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onSearch("");
    onCategorySelect(category.value);
  }

  function handleSearchChange(event) {
    const value = event.target.value;

    onSearch(value);
  }

  function toggleSearch() {
    if (searchOpen) {
      onSearch("");
    }

    setSearchOpen((current) => !current);
    setCategoryOpen(false);
    setMobileMenuOpen(false);
  }

  function openCart() {
    setCategoryOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onOpenCart();
  }

  function openWishlist() {
    setCategoryOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onOpenWishlist();
  }

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo: returns the user to the Home page */}
        <button
          type="button"
          onClick={handleHome}
          aria-label="ShopSphere home"
          className="group flex shrink-0 items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md transition group-hover:-rotate-3 group-hover:bg-indigo-700">
            <ShoppingBag size={23} strokeWidth={2.2} />
          </span>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Shop<span className="text-indigo-600">Sphere</span>
          </span>
        </button>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          <button
            type="button"
            onClick={handleHome}
            className="text-sm font-semibold text-slate-700 transition hover:text-indigo-600"
          >
            Home
          </button>

          {/* Category dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={categoryOpen}
              onClick={() => {
                setCategoryOpen((current) => !current);
                setSearchOpen(false);
              }}
              className={`flex items-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition hover:text-indigo-600 ${
                activeCategory
                  ? "text-indigo-600"
                  : "text-slate-700"
              }`}
            >
              Categories
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Shop by category
                </p>

                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-700 ${
                      activeCategory === category.value
                        ? "bg-indigo-50 font-semibold text-indigo-700"
                        : "text-slate-700"
                    }`}
                  >
                    {category.label}
                    <ArrowRight size={14} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {searchOpen ? <X size={21} /> : <Search size={21} />}
          </button>

          <button
            type="button"
            onClick={openWishlist}
            aria-label="Open wishlist"
            title="Wishlist"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 sm:flex"
          >
            <Heart size={21} />
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open shopping cart, ${cartCount} items`}
            title="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((current) => !current);
              setCategoryOpen(false);
              setSearchOpen(false);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search bar: filters products as the user types */}
      {searchOpen && (
        <div className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search products
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
              <Search size={20} className="shrink-0 text-slate-400" />

              <input
                id="product-search"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Try headphones, jacket, ring..."
                autoComplete="off"
                className="h-12 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    onSearch("");
                  }}
                  aria-label="Clear search"
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Search results update as you type.
            </p>
          </div>
        </div>
      )}

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <button
            type="button"
            onClick={handleHome}
            className="block w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            Home
          </button>

          <p className="px-3 pb-1 pt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            Categories
          </p>

          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => handleCategorySelect(category)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition hover:bg-indigo-50 hover:text-indigo-700 ${
                activeCategory === category.value
                  ? "bg-indigo-50 font-semibold text-indigo-700"
                  : "text-slate-700"
              }`}
            >
              {category.label}
              <ArrowRight size={15} />
            </button>
          ))}

          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={openWishlist}
              className="flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <Heart size={17} />
              Wishlist
            </button>

            <button
              type="button"
              onClick={openCart}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              <ShoppingBag size={17} />
              Cart ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
