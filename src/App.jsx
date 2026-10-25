import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ArrowRight, ShoppingBag, X } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductImage from "./components/ProductImage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ShopProvider } from "./context/ShopContext.jsx";
import { useShop } from "./context/useShop";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function CartDrawer({ onClose }) {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
  } = useShop();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function goToCheckout() {
    onClose();
    navigate("/checkout");
  }

  function continueShopping() {
    onClose();
    navigate("/");
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close shopping cart"
        className="absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
          <div>
            <h2 id="cart-title" className="text-xl font-extrabold text-slate-900">
              Your Cart
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {cartCount} {cartCount === 1 ? "item" : "items"} in your bag
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart panel"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X size={21} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <ShoppingBag size={34} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">Your cart is empty</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Discover something you love and add it to your shopping bag.
            </p>
            <button
              type="button"
              onClick={continueShopping}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
              {cartItems.map((item) => (
                <article key={item.id} className="flex gap-3 rounded-2xl border border-slate-100 p-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(`/products/${item.id}`);
                    }}
                    aria-label={`View ${item.title}`}
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      fallbackClassName="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400"
                    />
                  </button>

                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate(`/products/${item.id}`);
                      }}
                      className="line-clamp-2 text-left text-sm font-semibold text-slate-800 transition hover:text-indigo-600"
                    >
                      {item.title}
                    </button>
                    <p className="mt-2 text-sm font-bold text-indigo-600">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.title}`}
                          disabled={item.quantity <= 1}
                          className="px-2.5 py-1.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-8 px-2 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.title}`}
                          disabled={item.quantity >= 99}
                          className="px-2.5 py-1.5 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-md px-2 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-slate-100 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600">Subtotal</span>
                <span className="text-xl font-extrabold text-slate-900">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Shipping and taxes are not included here. This demo does not collect real payments.
              </p>
              <button
                type="button"
                onClick={goToCheckout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={continueShopping}
                className="mt-3 w-full rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function ShopLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, cartOpen, openCart, closeCart } = useShop();
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  function handleHome() {
    setActiveCategory("");
    setSearchTerm("");
    navigate("/");
  }

  function handleCategorySelect(category) {
    setActiveCategory(category || "");
    setSearchTerm("");
    navigate("/");

    window.requestAnimationFrame(() => {
      document.getElementById("shop-collection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function handleSearch(value) {
    setSearchTerm(value);
    if (value.trim()) setActiveCategory("");
    if (location.pathname !== "/") navigate("/");
  }

  function handleOpenWishlist() {
    navigate("/wishlist");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollToTop />
      <Navbar
        onHome={handleHome}
        onCategorySelect={handleCategorySelect}
        onSearch={handleSearch}
        onOpenCart={openCart}
        onOpenWishlist={handleOpenWishlist}
        cartCount={cartCount}
        activeCategory={activeCategory}
        searchTerm={searchTerm}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              searchTerm={searchTerm}
              activeCategory={activeCategory}
              onSearch={handleSearch}
              onCategorySelect={handleCategorySelect}
            />
          }
        />
        <Route
          path="/products/:productId"
          element={
            <ProductDetailsPage
              key={location.pathname}
              onCategorySelect={handleCategorySelect}
            />
          }
        />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer onHome={handleHome} onCategorySelect={handleCategorySelect} />
      {cartOpen && <CartDrawer onClose={closeCart} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <ShopLayout />
      </ShopProvider>
    </BrowserRouter>
  );
}
