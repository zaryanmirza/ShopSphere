
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Heart,
  Mail,
  ArrowUp,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

import InfoModal from "./InfoModal";

const categories = [
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelry", value: "jewelery" },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
    hoverColor: "hover:bg-blue-600",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/",
    hoverColor: "hover:bg-pink-600",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/",
    hoverColor: "hover:bg-red-600",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/",
    hoverColor: "hover:bg-blue-700",
  },
];

export default function Footer({ onHome, onCategorySelect }) {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState("about");

  function openInfoModal(view) {
    setModalView(view);
    setModalOpen(true);
  }

  function closeInfoModal() {
    setModalOpen(false);
  }

  function goHome() {
    if (typeof onHome === "function") {
      onHome();
    } else {
      navigate("/");
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleCategoryClick(category) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (typeof onCategorySelect === "function") {
      onCategorySelect(category);
    } else {
      // Fallback navigation until the parent connects category filtering.
      navigate(`/?category=${encodeURIComponent(category)}`);
    }
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <footer className="mt-16 border-t border-slate-200 bg-slate-50">
        {/* Main footer */}
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="button"
                onClick={goHome}
                aria-label="ShopSphere home"
                className="group inline-flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md transition group-hover:-rotate-3 group-hover:bg-indigo-700">
                  <ShoppingBag size={23} />
                </span>

                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Shop<span className="text-indigo-600">Sphere</span>
                </span>
              </button>

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
                Discover your next favorite thing. Explore fashion,
                electronics, and more in one simple shopping experience.
              </p>

              <button
                type="button"
                onClick={() => openInfoModal("about")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:gap-3 hover:text-indigo-800"
              >
                Discover our story
                <ArrowRight size={16} />
              </button>

              {/* Social media links */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Follow along
                </p>

                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const SocialIcon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${social.label} in a new tab`}
                        title={social.label}
                        className={`group/social relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition duration-200 hover:-translate-y-1 hover:border-transparent hover:text-white ${social.hoverColor} focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
                      >
                        <SocialIcon size={18} />

                        {/* Tooltip visible on hover and keyboard focus */}
                        <span
                          role="tooltip"
                          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover/social:opacity-100 group-focus-visible/social:opacity-100"
                        >
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Shopping categories */}
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Shop
              </h2>

              <ul className="mt-5 space-y-3">
                {categories.map((category) => (
                  <li key={category.value}>
                    <button
                      type="button"
                      onClick={() =>
                        handleCategoryClick(category.value)
                      }
                      className="group inline-flex items-center gap-2 text-left text-sm text-slate-500 transition hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      <span>{category.label}</span>

                      <ArrowRight
                        size={14}
                        className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={goHome}
                className="mt-5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
              >
                Browse all products
              </button>
            </div>

            {/* Company links */}
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Company
              </h2>

              <ul className="mt-5 space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={() => openInfoModal("about")}
                    className="text-sm text-slate-500 transition hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    About Us
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => openInfoModal("contact")}
                    className="text-sm text-slate-500 transition hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    Contact Us
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={() => openInfoModal("about")}
                    className="text-sm text-slate-500 transition hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    Our Mission
                  </button>
                </li>
              </ul>
            </div>

            {/* Help section */}
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                Need Help?
              </h2>

              <p className="mt-5 text-sm leading-6 text-slate-500">
                Have a question about the store or want to share feedback?
                Open our contact form.
              </p>

              <button
                type="button"
                onClick={() => openInfoModal("contact")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
              >
                <Mail size={17} />
                Contact Support
              </button>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
                <Heart
                  size={19}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />

                <p className="text-xs leading-5 text-slate-600">
                  A learning project built with React, Tailwind CSS,
                  and the Fake Store API.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="text-center text-xs leading-5 text-slate-500 sm:text-left">
              © {new Date().getFullYear()} ShopSphere. Built for learning.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-xs text-slate-400">
                Demo store · No real payments
              </span>

              <button
                type="button"
                onClick={goToTop}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Back to top
                <ArrowUp size={15} />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Reusable About Us / Contact modal */}
      <InfoModal
        key={`${modalView}-${modalOpen ? "open" : "closed"}`}
        isOpen={modalOpen}
        initialView={modalView}
        onClose={closeInfoModal}
      />
    </>
  );
}
