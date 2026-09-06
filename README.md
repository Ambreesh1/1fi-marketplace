# 1Fi Marketplace — SDE Intern Assignment

Implementation of the **1Fi Marketplace** section within the existing **Shop** page, following the assignment brief in `1Fi SDE Intern Assignment.pdf`.

## Note on reference material

The assignment document mentions reference screens/content for the Marketplace section provided separately. **No such reference material was found in the PDF attachment or shared separately**, despite a follow-up email requesting it before the submission deadline. As a result, the Marketplace UI (product fields, EMI flow, layout) was designed based on the written requirements in the assignment document and the visual language of the existing 1Fi Shop page screenshots (purple/indigo brand color, pill-style tabs, rounded cards).

## Why Expo (React Native)

Built using **Expo (SDK 57) with Expo Router**, chosen for fast iteration within the timeline and because it doesn't require a native Android/iOS build environment to run and preview — the app runs directly via Expo Go.

## What's included

- **Shop page** with 3 tabs: `Top Brands` (blank placeholder), `Nearby Stores` (blank placeholder), `1Fi Marketplace` (fully implemented) — registered as a new bottom-tab, "Shop", alongside the existing Home/Explore tabs.
- **Product list** (`src/app/shop/index.tsx`) — search, product cards with image/name/price/EMI-from hint, loading/error/empty states.
- **Product detail** (`src/app/shop/product/[id].tsx`) — image, description, variant selector, EMI plan selector (tenure + monthly amount), sticky CTA to proceed. Pushed as a nested stack screen within the Shop tab (proper header + back button).
- **Mock data layer** (`src/api/marketplaceApi.ts`) — simulates network delay and error paths; product/EMI data is structured like a real API response (`src/data/mockProducts.ts`), not hardcoded into components. Swapping to a real backend later only requires editing `marketplaceApi.ts`.
- Extended the existing `Colors` theme (`src/constants/theme.ts`) with brand tokens (`primary`, `primaryLight`, `border`, `success`) matched to the 1Fi app's purple/indigo palette, in both light and dark mode, reusing the app's existing `ThemedView`/`ThemedText` components for consistency.
Demo-<img width="200" height="500" alt="WhatsApp Image 2026-09-06 at 11 48 25 AM" src="https://github.com/user-attachments/assets/967699d6-75d2-459b-b36e-6d597e544520" />
<img width="200" height="500" alt="WhatsApp Image 2026-09-06 at 11 48 25 AM (1)" src="https://github.com/user-attachments/assets/3ab44e29-40e8-4629-9a29-ee3077a8b0c2" />
<img width="200" height="500" alt="WhatsApp Image 2026-09-06 at 11 48 24 AM" src="https://github.com/user-attachments/assets/a83064e0-b793-48f1-ade1-d7d9305b4a94" />
## Project structure (new/changed files only)

```
src/
├── constants/theme.ts          # (edited) added primary/primaryLight/border/success tokens
├── data/mockProducts.ts        # (new) mock product/EMI data, typed
├── api/marketplaceApi.ts       # (new) fetchProducts, fetchProductById, submitEmiSelection
├── components/
│   ├── app-tabs.tsx             # (edited) added "Shop" native tab trigger
│   ├── app-tabs.web.tsx         # (edited) added "Shop" web tab trigger
│   └── marketplace/
│       ├── product-card.tsx    # (new)
│       └── emi-plan-card.tsx   # (new)
└── app/
    └── shop/
        ├── _layout.tsx          # (new) Stack navigator for this tab's screens
        ├── index.tsx            # (new) Shop page: 3-tab switcher + Marketplace list
        └── product/[id].tsx     # (new) Product detail + EMI selection screen
```

## Setup & running

This project already has all dependencies installed (Expo SDK 57, Expo Router, TypeScript). No new packages are required — the Marketplace feature only uses what's already in `package.json`.

```
npm install        # only needed if node_modules isn't present
npx expo start
```

Scan the QR code with **Expo Go** on your phone. Go to the new **Shop** tab at the bottom, tap **1Fi Marketplace**, then tap any product to see the detail + EMI selection screen.
