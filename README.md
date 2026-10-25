# ShopSphere

ShopSphere is a responsive React + Vite demo storefront using the [Fake Store API](https://fakestoreapi.com). It is a frontend learning project: cart and wishlist state are saved in the current browser's local storage, and checkout is simulated locally. There is no payment processor, order backend, real shipping, or account system.

## Requirements

- Node.js 20.19+ or 22.12+ (the Vite version in this project requires a recent Node release)
- npm
- Internet connection for the Fake Store API and package installation

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` creates the production site in `dist/`. The `dist/` folder is generated output and should not be edited by hand.

## Main features

- Responsive navigation with category filtering and controlled live search
- Products loaded from Fake Store API, loading and retryable error states
- Product cards with details navigation, Wishlist toggle, and Add to Cart
- Product detail page with breadcrumbs and quantity selection
- Cart drawer with quantity controls, remove actions, subtotal, and checkout navigation
- Wishlist page with add-all-to-cart and remove actions
- Demo checkout form with client-side validation and an in-session confirmation screen
- About/Contact modal and responsive footer
- Unknown routes use a dedicated 404 page
- Cart and Wishlist are persisted in `localStorage` in the same browser

## Important limitations

- Fake Store API is demonstration data, not a production inventory or order service.
- Checkout only creates a local confirmation screen. It does not send an order to a backend or charge a payment method.
- Footer social icons link to the platforms' public homepages; replace these with your actual profile URLs before publishing.
- Product images are remotely hosted by the API, so they need an internet connection. The UI includes fallback states for unavailable images.

## Main source structure

```text
src/
├── components/
│   ├── Breadcrumbs.jsx
│   ├── ErrorState.jsx
│   ├── Footer.jsx
│   ├── InfoModal.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── ProductImage.jsx
│   └── QuantitySelector.jsx
├── context/
│   └── ShopContext.jsx
├── pages/
│   ├── CheckoutPage.jsx
│   ├── HomePage.jsx
│   ├── NotFoundPage.jsx
│   ├── ProductDetailsPage.jsx
│   └── WishlistPage.jsx
├── services/
│   └── fakeStoreApi.js
├── App.jsx
├── index.css
└── main.jsx
```

## Deploy

Build the project with `npm run build`, then deploy the generated `dist/` output to a static host such as Vercel or Netlify. Configure the host to serve `index.html` as a fallback for client-side routes such as `/products/1`, `/wishlist`, and `/checkout`.
