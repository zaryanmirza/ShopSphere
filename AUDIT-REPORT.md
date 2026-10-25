# ShopSphere source audit and fixes

This report summarizes source-level fixes applied during review. This is a frontend demo storefront; it is not a production commerce backend.

## Fixes applied

- Replaced the recursive `QuantitySelector.jsx` from the uploaded archive with the working quantity component.
- Made Navbar search a controlled input tied to the shared App state, so the text shown in the field does not drift out of sync when filters are changed from other parts of the UI.
- Clear the active category when a non-empty search begins, and scroll to the filtered product collection after category navigation.
- Reset global search/category state when returning home through the Footer logo or Browse All Products.
- Added route-change scroll reset and `Escape`/body-scroll handling for the Cart drawer.
- Normalized/validated persisted cart and wishlist records, deduplicated restored items, and capped quantities at 99 to prevent malformed local storage from breaking totals.
- Added API payload validation and proper handling for invalid/nonexistent product IDs; added AbortSignal support so stale page requests are canceled when routes change.
- Added a reusable `ProductImage.jsx` fallback for broken/missing API images in the cart and checkout views.
- Removed the overlapping absolute-positioned Wishlist remove button; the explicit Remove action now sits below each card.
- Made product cards announce themselves as labeled groups while preserving keyboard activation and keeping inner buttons separate from card navigation.
- Added missing max-quantity disabling in Cart and Checkout controls.
- Improved the 404 Back action fallback, document title/description, README, `.gitignore`, and Vercel SPA route rewrite.
- Removed the unused starter `src/App.css` file to avoid keeping an irrelevant Vite-template stylesheet in the project.

## Checks performed in this environment

- Parsed every JavaScript/JSX source file using the TypeScript compiler's JSX parser: passed.
- Checked all relative source imports resolve to files: passed.
- Checked dependencies referenced by source are declared in `package.json`: passed.
- Checked `package.json` dependency declarations match the root entries in `package-lock.json`: passed.

A complete fresh Vite production build and ESLint run could not be completed here because npm dependency installation timed out in this environment. Please run these commands locally after extracting the project:

```bash
npm install
npm run lint
npm run build
```

Fix any environment-specific lint/build message that remains before deploying.

## Known project limitations

- Fake Store API provides demo products only.
- Cart and Wishlist are stored in the current browser's local storage, not a user account or backend.
- Checkout creates a local in-session confirmation only. There is no payment processing, real order storage, or shipping integration.
- Social icons link to the social platforms' general homepages; replace them with your own profile URLs before publishing.


## Lint follow-up

Fixed the four ESLint findings reported during local verification:
- Split `ShopContext` creation, `ShopProvider`, and `useShop` into separate modules for Fast Refresh compatibility.
- Removed synchronous state resets from effect-triggered product loading functions; retry handlers now own loading resets.
- Preserved fetch/JSON parse errors with the `cause` option.

Run `npm run lint` and `npm run build` locally to verify with your installed versions.
