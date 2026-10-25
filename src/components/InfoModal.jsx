
import { useEffect, useState } from "react";
import {
  X,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  Mail,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function InfoModal({
  isOpen = false,
  onClose = () => {},
  initialView = "about",
}) {
  const [activeView, setActiveView] = useState(initialView);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Close the modal with Escape and prevent background scrolling.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    // Allow the form to be edited again after submission.
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // This is a frontend demonstration, not a real email service.
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  function handleTabChange(view) {
    setActiveView(view);
    setSubmitted(false);
  }

  function handleClose() {
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Modal header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-6 pb-7 pt-6 text-white sm:px-8">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-16 h-48 w-48 rounded-full border-[30px] border-white/10"
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                {activeView === "about" ? (
                  <ShoppingBag size={25} />
                ) : (
                  <MessageCircle size={25} />
                )}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
                  ShopSphere
                </p>

                <h2
                  id="info-modal-title"
                  className="mt-1 text-2xl font-extrabold tracking-tight"
                >
                  {activeView === "about"
                    ? "Our Story"
                    : "Let's Talk"}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close dialog"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={22} />
            </button>
          </div>

          <p className="relative mt-4 max-w-lg text-sm leading-6 text-indigo-100">
            {activeView === "about"
              ? "A modern shopping experience built around simplicity, discovery, and great design."
              : "Have a question or suggestion? Use the form below to try our contact experience."}
          </p>
        </div>

        {/* Modal tabs */}
        <div
          role="tablist"
          aria-label="Information sections"
          className="flex gap-2 border-b border-slate-100 px-6 pt-4 sm:px-8"
        >
          <button
            type="button"
            role="tab"
            id="about-tab"
            aria-selected={activeView === "about"}
            aria-controls="about-panel"
            onClick={() => handleTabChange("about")}
            className={`rounded-t-xl border-b-2 px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeView === "about"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-slate-500 hover:text-indigo-600"
            }`}
          >
            About Us
          </button>

          <button
            type="button"
            role="tab"
            id="contact-tab"
            aria-selected={activeView === "contact"}
            aria-controls="contact-panel"
            onClick={() => handleTabChange("contact")}
            className={`rounded-t-xl border-b-2 px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeView === "contact"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-slate-500 hover:text-indigo-600"
            }`}
          >
            Contact
          </button>
        </div>

        {/* About section */}
        {activeView === "about" && (
          <div
            id="about-panel"
            role="tabpanel"
            aria-labelledby="about-tab"
            className="px-6 py-7 sm:px-8 sm:py-8"
          >
            <h3 className="text-lg font-bold text-slate-900">
              Shopping made simple
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              ShopSphere is a frontend e-commerce demonstration built
              with React and Tailwind CSS. It brings product discovery,
              category browsing, wishlists, and a shopping cart together
              in one simple interface.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Our goal is to make browsing feel clear and enjoyable,
              whether you are exploring electronics, clothing, or jewelry.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Heart size={20} />
                </div>

                <h4 className="mt-3 text-sm font-bold text-slate-900">
                  Personal Picks
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Save favorite products to your wishlist.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Truck size={20} />
                </div>

                <h4 className="mt-3 text-sm font-bold text-slate-900">
                  Easy Shopping
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Browse products and manage your cart.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <ShieldCheck size={20} />
                </div>

                <h4 className="mt-3 text-sm font-bold text-slate-900">
                  Demo Project
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Explore the interface without real payments.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleTabChange("contact")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
            >
              <Mail size={17} />
              Get in Touch
            </button>
          </div>
        )}

        {/* Contact section */}
        {activeView === "contact" && (
          <div
            id="contact-panel"
            role="tabpanel"
            aria-labelledby="contact-tab"
            className="px-6 py-7 sm:px-8 sm:py-8"
          >
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center py-5 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={36} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                  Message form completed!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                  Your form passed frontend validation. This demo does not
                  send or store messages because no contact backend is
                  connected.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    Send us a message
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in the fields below to test the contact form.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Your Name
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        maxLength={80}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Email Address
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        required
                        maxLength={254}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can we help?"
                      rows={4}
                      required
                      minLength={10}
                      maxLength={2000}
                      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-5 text-slate-400">
                      Demo only. Your message will not be emailed or saved.
                    </p>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
                    >
                      <Send size={17} />
                      Submit Message
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Modal footer */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-8">
          <p className="text-xs text-slate-400">
            ShopSphere · React demo store
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
}
