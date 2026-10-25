
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";

import { useShop } from "../context/useShop";
import ProductImage from "../components/ProductImage";

const SHIPPING_FEE = 5.99;
const FREE_SHIPPING_THRESHOLD = 100;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "Pakistan",
};

function formatPrice(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useShop();

  const [formData, setFormData] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const subtotal = Number(cartSubtotal) || 0;

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;

  const total = subtotal + shipping;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  }

  function handlePlaceOrder(event) {
    event.preventDefault();
    setFormError("");

    if (cartItems.length === 0) {
      setFormError("Your cart is empty. Add a product before checking out.");
      return;
    }

    // Save an order snapshot before clearing the cart.
    const orderSnapshot = {
      orderNumber: `SS-${Date.now().toString().slice(-8)}`,
      customer: { ...formData },
      items: cartItems.map((item) => ({ ...item })),
      subtotal,
      shipping,
      total,
      createdAt: new Date().toLocaleString(),
    };

    setPlacedOrder(orderSnapshot);

    // This is a local demo order, not a real purchase.
    clearCart();
  }

  function handleStartShopping() {
    navigate("/");
  }

  function handleContinueBrowsing() {
    navigate("/");
  }

  // Demo order confirmation screen.
  if (placedOrder) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={42} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Demo order completed
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Thank you, {placedOrder.customer.fullName}!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600">
              Your demo order has been created successfully in this
              session. No real purchase or payment was made.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm">
              <PackageCheck size={19} className="text-emerald-600" />
              <span className="text-slate-500">Order reference:</span>
              <span className="font-extrabold text-slate-900">
                {placedOrder.orderNumber}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="text-lg font-extrabold text-slate-900">
              Order summary
            </h2>

            <div className="mt-5 divide-y divide-slate-100">
              {placedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                      fallbackClassName="flex h-full w-full flex-col items-center justify-center gap-1 text-slate-400"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold text-slate-900">
                    {formatPrice(Number(item.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 border-t border-slate-200 pt-5">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(placedOrder.subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span>
                  {placedOrder.shipping === 0
                    ? "Free"
                    : formatPrice(placedOrder.shipping)}
                </span>
              </div>

              <div className="flex justify-between pt-2 text-lg font-extrabold text-slate-900">
                <span>Total</span>
                <span>{formatPrice(placedOrder.total)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">
                Delivery details
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {placedOrder.customer.address}
                <br />
                {placedOrder.customer.city},{" "}
                {placedOrder.customer.postalCode}
                <br />
                {placedOrder.customer.country}
              </p>
            </div>

            <button
              type="button"
              onClick={handleContinueBrowsing}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
    );
  }

  // Empty cart state.
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-slate-50 px-4 py-12">
        <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
            <ShoppingBag size={38} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Add something you love to your cart before proceeding
            to checkout.
          </p>

          <button
            type="button"
            onClick={handleStartShopping}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
          >
            <ShoppingBag size={18} />
            Explore Products
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Checkout page heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-5 inline-flex items-center gap-2 rounded-lg py-1 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShoppingBag size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Checkout
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Review your order and enter your delivery details.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 sm:text-sm">
            <span className="inline-flex items-center gap-2 text-indigo-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
                1
              </span>
              Delivery details
            </span>

            <span className="h-px w-8 bg-slate-200" />

            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                2
              </span>
              Review order
            </span>

            <span className="h-px w-8 bg-slate-200" />

            <span className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                3
              </span>
              Confirmation
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-12">
        {/* Delivery form */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <MapPin size={22} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Delivery information
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Enter the information for this demo order.
              </p>
            </div>
          </div>

          {formError && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-700"
            >
              {formError}
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                maxLength={100}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92 300 1234567"
                  required
                  maxLength={30}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Street address
              </label>

              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="House number, street, area"
                required
                maxLength={200}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Your city"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Postal code
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal code"
                  required
                  maxLength={20}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Country
              </label>

              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="Pakistan">Pakistan</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-700"
                />

                <div>
                  <p className="text-sm font-bold text-amber-900">
                    Learning project — Demo checkout
                  </p>
                  <p className="mt-1 text-xs leading-6 text-amber-800">
                    This form creates a local confirmation only. It does
                    not send your information to a server, arrange
                    shipping, or process any payment.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 active:translate-y-0"
              >
                <CheckCircle2 size={19} />
                Place Demo Order
                <ArrowRight size={18} />
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                No payment details required.
              </p>
            </div>
          </form>
        </section>

        {/* Order summary */}
        <aside className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-28">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-slate-900">
                Order Summary
              </h2>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          <div className="max-h-[360px] space-y-4 overflow-y-auto p-5 sm:p-6">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="flex gap-3"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/products/${item.id}`)}
                  aria-label={`View ${item.title}`}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2"
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
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="line-clamp-2 text-left text-xs font-semibold leading-5 text-slate-800 transition hover:text-indigo-600"
                  >
                    {item.title}
                  </button>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="px-2 py-1 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus size={12} />
                      </button>

                      <span className="min-w-7 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.title}`}
                        disabled={item.quantity >= 99}
                        className="px-2 py-1 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from cart`}
                      title="Remove item"
                      className="rounded-md p-1 text-rose-500 transition hover:bg-rose-50 hover:text-rose-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="shrink-0 text-xs font-bold text-slate-900">
                  {formatPrice(Number(item.price) * item.quantity)}
                </p>
              </article>
            ))}
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 p-5 sm:p-6">
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="mb-5 rounded-xl bg-indigo-50 p-3">
                <p className="text-xs leading-5 text-indigo-800">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more
                  to qualify for free shipping.
                </p>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-indigo-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{
                      width: `${Math.min(
                        100,
                        (subtotal / FREE_SHIPPING_THRESHOLD) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {subtotal >= FREE_SHIPPING_THRESHOLD && (
              <div className="mb-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
                <Truck size={17} />
                You've qualified for free shipping!
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-extrabold text-slate-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Demo prices are displayed in USD. No real transaction
              will take place.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}