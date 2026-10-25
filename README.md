# ShopSphere

ShopSphere is a responsive demo e-commerce storefront built with **React**, **Vite**, and **Tailwind CSS**. Product data is loaded from the [Fake Store API](https://fakestoreapi.com).

- **Live demo:** https://shopsphere-blush-delta.vercel.app/
- **Source code:** https://github.com/zaryanmirza/ShopSphere

> **Note:** This is a front-end learning project. The cart and wishlist are stored in the current browser's `localStorage`, and checkout is simulated locally. There is no payment processor, production order backend, shipping service, or account system.

## Features

- Responsive navigation and layout
- Live product search and category filtering
- Product data loaded from Fake Store API, with loading and retryable error states
- Product cards with product details, wishlist toggles, and Add to Cart actions
- Product detail page with breadcrumbs and quantity selection
- Cart drawer with quantity controls, remove actions, subtotal, and checkout navigation
- Wishlist page with add-all-to-cart and remove actions
- Demo checkout form with client-side validation and a local confirmation screen
- About/Contact modal and responsive footer
- Dedicated 404 page for unknown routes
- Cart and wishlist persisted in browser `localStorage`

## Tech stack

- React
- Vite
- Tailwind CSS
- React Router for client-side navigation
- Fake Store API
- Browser `localStorage`
- Vercel for deployment

## Run locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- Internet access for package installation and Fake Store API requests

### Installation

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

`npm run build` creates the production site in `dist/`. The `dist/` directory is generated output and should not be edited by hand.

## How AI assisted development

I used AI as a development assistant throughout the project, but I did not ask it to generate the entire application in one response. I first provided the main project prompt below and asked for the folder structure, then requested one component at a time. After receiving each component, I reviewed the code and checked what it did before adding it to my project. I integrated the components incrementally so I could understand and test the application as it grew.

When I encountered a bug or unexpected behavior, I usually described the problem to the AI assistant in a follow-up prompt and asked it to help diagnose and fix the issue. Most bug fixes were AI-assisted: I reviewed the proposed code, applied the relevant changes, and tested the result. I also made some adjustments myself when needed. This meant the workflow involved reviewing, prompting, integrating, testing, and iterating—not simply accepting a single large code dump.

I did not write a separate long prompt for every component. The main prompt below established the requirements and the one-component-at-a-time workflow; short follow-up messages such as **“Give me the next component”** continued that process. Additional prompts were mainly used when a bug, layout issue, or behavior needed to be corrected.

## Main development prompt (translated from Urdu)

The following is an English translation of the main prompt I provided at the start of development:

> I want to build a fully functional e-commerce web application using React (Vite) and Tailwind CSS. Use the Fake Store API (https://fakestoreapi.com) for the data.
>
> **Important:** Do not complete the entire project yourself. Your task is to give me the code for each component separately, one at a time. I will add each component to my project, test it, understand it, and make changes myself where needed. Do not dump all the code at once. Stop after each step and wait for my next message.
>
> **Very important rule:** Everything visible on the page—every button, logo, icon, link, or text that looks clickable—must actually do something. There must be no dead or inactive elements. If a button does not have its full feature implemented yet, it should at least show an alert, toast, or placeholder state instead of doing nothing.
>
> **Feature list:**
>
> **1. Navbar**
> - Clicking the logo should navigate back to the home page.
> - Include a category dropdown (Men, Women, Electronics, Jewelry); clicking a category should display filtered products.
> - Clicking the search icon should open a search bar with live filtering.
> - Clicking the cart icon should open a side cart, and a badge should display the item count.
>
> **2. Home page**
> - Clicking a product card should open that product's detail page.
> - The “Add to Cart” button inside each card must work independently from the card click. Use `event.stopPropagation()` to keep the two actions separate.
> - Clicking the Wishlist heart should add or remove the product from the wishlist, and the icon's color should change accordingly.
>
> **3. Product detail page**
> - The quantity increase (+) and decrease (-) buttons must work.
> - Both “Add to Cart” and “Buy Now” buttons must be functional.
> - Every breadcrumb (for example, Home > Electronics > Product Name) should be clickable.
>
> **4. Cart sidebar**
> - The quantity +/- controls and “Remove” button for each item must work.
> - The “Checkout” button should navigate to a demo checkout page.
> - If the cart is empty, the “Continue Shopping” button should navigate to the home page.
>
> **5. Footer**
> - Social media icons (Facebook, Instagram, etc.) should show a tooltip on hover and open in a new tab when clicked. Placeholder links are acceptable.
> - Links such as “About Us” and “Contact” should open a small demo modal or page instead of being empty.
>
> **6. General requirements**
> - Every button should have a hover state, such as a slight color or size change, so users can tell it is clickable.
> - Show both loading and error states while handling API data.
>
> First, provide the complete folder structure. Then provide only the first component's code (for example, `App.jsx` or `Navbar.jsx`) and briefly explain what it does. After that, stop and wait for me to say **“Give me the next component.”**

## Review, improvements, and testing

I did not add each component blindly. I reviewed each component's code and purpose before integrating it, then checked the behavior in the running app. When something did not work or look right, I usually prompted the AI assistant with the specific issue and used its suggested fix after reviewing it. Most bug-fixing was AI-assisted, while I also made some manual adjustments and checked the final behavior myself.

Examples of refinements and project checks during completion included:

- Addressed product-card button alignment so cards look more consistent when product titles have different lengths; I used AI assistance to help troubleshoot UI issues and reviewed the result.
- Improved the search field's focus appearance to avoid an unwanted square outline.
- Changed the footer's social icon/link from GitHub to LinkedIn. The link currently points to LinkedIn's homepage; replace it with a personal profile URL if that is the intended destination.
- Checked the `.gitignore` so generated files and local configuration—such as `node_modules/`, `dist/`, and `.env` files—are excluded from Git.
- Ran `npm run lint` and `npm run build`; both completed successfully during the final checks.
- Deployed the app to Vercel and opened the live site to check that it was running.

These are examples of the review-and-fix workflow, not a claim that every change was written entirely by hand. AI provided most of the bug-fix suggestions, and I reviewed and tested the resulting changes as part of integrating them.

## Important limitations

- Fake Store API provides demonstration product data, not a production inventory service.
- Checkout displays a local confirmation screen. It does not send an order to a backend or charge a payment method.
- Cart and wishlist data are stored only in the current browser and do not sync across devices or user accounts.
- Product images are hosted remotely and require an internet connection; the UI has fallback states for unavailable images.
- Social links are placeholders and should be replaced with the intended profile URLs before using the site publicly as a personal brand.

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
│   ├── NotFoundPage.jsx
│   ├── ProductDetailsPage.jsx
│   └── WishlistPage.jsx
├── services/
│   └── fakeStoreApi.js
├── App.jsx
├── index.css
└── main.jsx
```

## Deployment

The application is deployed on Vercel:

**Live URL:** https://shopsphere-blush-delta.vercel.app/

To deploy another build, run `npm run build` and deploy the generated `dist/` directory to a static host such as Vercel or Netlify. Configure the host to serve `index.html` as a fallback for client-side routes such as `/products/1`, `/wishlist`, and `/checkout`.