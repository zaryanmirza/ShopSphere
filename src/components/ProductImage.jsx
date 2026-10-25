import { useState } from "react";
import { ImageOff } from "lucide-react";

/** Image wrapper with a graceful placeholder when an external product image fails. */
export default function ProductImage({
  src,
  alt = "Product image",
  className = "h-full w-full object-contain",
  fallbackClassName = "flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400",
  loading = "lazy",
}) {
  const [hasError, setHasError] = useState(!src);

  if (!src || hasError) {
    return (
      <span role="img" aria-label={`${alt} unavailable`} className={fallbackClassName}>
        <ImageOff size={24} aria-hidden="true" />
        <span className="text-center text-xs">Image unavailable</span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
