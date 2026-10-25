import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity = 1,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  label = "Quantity",
}) {
  const parsedMin = Number(min);
  const minValue = Number.isFinite(parsedMin)
    ? Math.max(0, Math.floor(parsedMin))
    : 1;

  const parsedMax = Number(max);
  const maxValue = Number.isFinite(parsedMax)
    ? Math.max(minValue, Math.floor(parsedMax))
    : 99;

  const parsedQuantity = Number(quantity);
  const currentQuantity = Number.isFinite(parsedQuantity)
    ? Math.min(maxValue, Math.max(minValue, Math.floor(parsedQuantity)))
    : minValue;

  const canDecrease = currentQuantity > minValue;
  const canIncrease = currentQuantity < maxValue;
  const hasChangeHandler = typeof onChange === "function";

  function decrease() {
    if (!disabled && canDecrease && hasChangeHandler) {
      onChange(currentQuantity - 1);
    }
  }

  function increase() {
    if (!disabled && canIncrease && hasChangeHandler) {
      onChange(currentQuantity + 1);
    }
  }

  return (
    <div className="inline-flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>

      <div
        className={`inline-flex h-11 w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-white ${
          disabled ? "opacity-50" : "shadow-sm"
        }`}
      >
        <button
          type="button"
          onClick={decrease}
          disabled={disabled || !canDecrease || !hasChangeHandler}
          aria-label="Decrease quantity"
          className="flex h-full w-11 items-center justify-center text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white"
        >
          <Minus size={16} strokeWidth={2.2} />
        </button>

        <output
          aria-live="polite"
          aria-label={`Current quantity: ${currentQuantity}`}
          className="flex h-full min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold tabular-nums text-slate-900"
        >
          {currentQuantity}
        </output>

        <button
          type="button"
          onClick={increase}
          disabled={disabled || !canIncrease || !hasChangeHandler}
          aria-label="Increase quantity"
          className="flex h-full w-11 items-center justify-center text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-white"
        >
          <Plus size={16} strokeWidth={2.2} />
        </button>
      </div>

      {currentQuantity === maxValue && (
        <p className="text-xs text-slate-500">Maximum quantity: {maxValue}</p>
      )}
    </div>
  );
}
