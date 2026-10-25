
import { useNavigate } from "react-router-dom";
import { House, ChevronRight } from "lucide-react";

export default function Breadcrumbs({
  items = [],
  onCategorySelect,
}) {
  const navigate = useNavigate();

  function handleItemClick(item, index) {
    // Run a custom action when one is provided.
    if (typeof item.onClick === "function") {
      item.onClick();
      return;
    }

    // Navigate to the specified route.
    if (item.to) {
      navigate(item.to);
      return;
    }

    // Select a category when the parent provides a callback.
    if (
      item.category &&
      typeof onCategorySelect === "function"
    ) {
      onCategorySelect(item.category);
      return;
    }

    // Fallback category navigation.
    if (item.category) {
      navigate(
        `/?category=${encodeURIComponent(item.category)}`
      );
      return;
    }

    // Home is always a working navigation action.
    if (index === 0) {
      navigate("/");
      return;
    }

    // A breadcrumb without a destination scrolls to the top.
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome =
            index === 0 &&
            item.label?.toLowerCase() === "home";

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1.5"
            >
              <button
                type="button"
                onClick={() => handleItemClick(item, index)}
                aria-label={
                  isHome ? "Go to home page" : `Go to ${item.label}`
                }
                aria-current={isLast ? "page" : undefined}
                title={item.label}
                className={`inline-flex min-w-0 items-center gap-1.5 rounded-md px-1 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isLast
                    ? "max-w-[220px] cursor-pointer font-semibold text-slate-900 hover:text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                {isHome && (
                  <House
                    size={15}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                )}

                <span className="truncate">
                  {item.label}
                </span>
              </button>

              {!isLast && (
                <ChevronRight
                  size={15}
                  className="shrink-0 text-slate-400"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
