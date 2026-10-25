const BASE_URL = "https://fakestoreapi.com";

async function request(endpoint, { signal } = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw new Error(
      "Network error. Please check your internet connection and try again.",
      { cause: error }
    );
  }

  if (!response.ok) {
    throw new Error(`Unable to load data. Server returned ${response.status}.`);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new Error("The server returned invalid JSON data.", { cause: error });
  }
}

function validateProducts(data) {
  if (!Array.isArray(data)) {
    throw new Error("The API returned an unexpected product list.");
  }

  return data.filter(
    (product) =>
      product &&
      product.id !== undefined &&
      typeof product.title === "string" &&
      product.title.trim().length > 0 &&
      Number.isFinite(Number(product.price)) &&
      Number(product.price) >= 0
  );
}

export async function fetchProducts(options = {}) {
  return validateProducts(await request("/products", options));
}

export async function fetchFeaturedProducts(limit = 8, options = {}) {
  const parsedLimit = Number(limit);
  const safeLimit = Number.isFinite(parsedLimit)
    ? Math.max(1, Math.min(20, Math.floor(parsedLimit)))
    : 8;

  return validateProducts(
    await request(`/products?limit=${safeLimit}`, options)
  );
}

export async function fetchCategories(options = {}) {
  const data = await request("/products/categories", options);
  if (!Array.isArray(data) || !data.every((category) => typeof category === "string")) {
    throw new Error("The API returned an unexpected category list.");
  }
  return data;
}

export async function fetchProductsByCategory(category, options = {}) {
  if (typeof category !== "string" || !category.trim()) {
    throw new Error("Please select a valid product category.");
  }

  return validateProducts(
    await request(`/products/category/${encodeURIComponent(category.trim())}`, options)
  );
}

export async function fetchProductById(productId, options = {}) {
  const id = Number(productId);
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("This product link is invalid.");
  }

  const product = await request(`/products/${id}`, options);
  if (
    !product ||
    typeof product !== "object" ||
    Number(product.id) !== id ||
    typeof product.title !== "string" ||
    !product.title.trim() ||
    !Number.isFinite(Number(product.price)) ||
    Number(product.price) < 0
  ) {
    throw new Error("This product could not be found. It may have been removed.");
  }

  return product;
}
