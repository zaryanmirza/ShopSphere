import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ShopContext } from "./shopContext";

const CART_STORAGE_KEY = "shopsphere-cart";
const WISHLIST_STORAGE_KEY = "shopsphere-wishlist";
const MAX_QUANTITY = 99;

function isValidProduct(product) {
  return Boolean(
    product &&
    typeof product === "object" &&
    product.id !== undefined &&
    product.id !== null &&
    String(product.title || "").trim() &&
    Number.isFinite(Number(product.price)) &&
    Number(product.price) >= 0
  );
}

function readStorage(key) {
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readCart() {
  const products = readStorage(CART_STORAGE_KEY);
  const merged = new Map();

  for (const item of products) {
    if (!isValidProduct(item)) continue;

    const quantity = Number(item.quantity);
    if (!Number.isFinite(quantity) || quantity < 1) continue;

    const normalized = {
      ...item,
      id: item.id,
      title: String(item.title),
      price: Number(item.price),
      image: typeof item.image === "string" ? item.image : "",
      quantity: Math.min(MAX_QUANTITY, Math.floor(quantity)),
    };

    const existing = merged.get(normalized.id);
    if (existing) {
      existing.quantity = Math.min(
        MAX_QUANTITY,
        existing.quantity + normalized.quantity
      );
    } else {
      merged.set(normalized.id, normalized);
    }
  }

  return [...merged.values()];
}

function readWishlist() {
  const products = readStorage(WISHLIST_STORAGE_KEY);
  const unique = new Map();

  for (const product of products) {
    if (!isValidProduct(product)) continue;
    if (!unique.has(product.id)) {
      unique.set(product.id, {
        ...product,
        id: product.id,
        title: String(product.title),
        price: Number(product.price),
        image: typeof product.image === "string" ? product.image : "",
      });
    }
  }

  return [...unique.values()];
}

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState(readCart);
  const [wishlist, setWishlist] = useState(readWishlist);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save the cart to local storage:", error);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Could not save the wishlist to local storage:", error);
    }
  }, [wishlist]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!isValidProduct(product)) return;

    const amount = Math.floor(Number(quantity));
    if (!Number.isFinite(amount) || amount < 1) return;

    setCartItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id);
      const safeProduct = {
        ...product,
        id: product.id,
        title: String(product.title),
        price: Number(product.price),
        image: typeof product.image === "string" ? product.image : "",
      };

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(MAX_QUANTITY, item.quantity + amount),
              }
            : item
        );
      }

      return [
        ...currentItems,
        { ...safeProduct, quantity: Math.min(MAX_QUANTITY, amount) },
      ];
    });
  }, []);

  const updateCartQuantity = useCallback((productId, quantity) => {
    const amount = Math.floor(Number(quantity));
    if (!Number.isFinite(amount)) return;

    setCartItems((currentItems) => {
      if (amount <= 0) {
        return currentItems.filter((item) => item.id !== productId);
      }

      return currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(MAX_QUANTITY, amount) }
          : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const toggleWishlist = useCallback((product) => {
    if (!isValidProduct(product)) return;

    setWishlist((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);
      if (exists) {
        return currentItems.filter((item) => item.id !== product.id);
      }

      return [
        ...currentItems,
        {
          ...product,
          id: product.id,
          title: String(product.title),
          price: Number(product.price),
          image: typeof product.image === "string" ? product.image : "",
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const clearWishlist = useCallback(() => setWishlist([]), []);

  const isWishlisted = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      wishlist,
      cartOpen,
      setCartOpen,
      cartCount,
      cartSubtotal,
      wishlistCount: wishlist.length,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    }),
    [
      cartItems,
      wishlist,
      cartOpen,
      cartCount,
      cartSubtotal,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isWishlisted,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

