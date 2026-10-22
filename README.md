# Cryptorunner

A design-system playground for a crypto app UI, built with React Native and Expo Router.

The goal of this project is to explore UI composition: theme tokens, small reusable components and an animated segmented control. It is not a working exchange. Market data is mocked on purpose and served through a service interface, so a real API could replace it without touching the screens.

**Status:** work in progress.

## What is in place

- **Home**: an Exchange / Wallet toggle.
  - *Exchange* shows a market list (pair, last price, change) with a Popular / Winners / Losers filter.
  - *Wallet* shows a mocked portfolio: total balance and change, an allocation bar with a legend, and the list of holdings. Totals and allocation are computed from the holdings.
  - Both views have loading, error-with-retry and content states.
- **Wallet tab**: a static sign-up screen (sign-up button, social login icons, log-in link). The buttons are not wired to any flow.
- **Market** and **Analytics**: placeholder tabs.
- A floating tab bar and a shared header.

## Stack

- React Native 0.79 with Expo SDK 53 and Expo Router (file-based routing, typed routes)
- TypeScript (strict)
- React Native Reanimated for the segmented control indicator
- FlashList for the market and holdings lists
- Vitest for unit tests of pure functions

## Project structure

```
app/                 Expo Router routes
  _layout.tsx        Root stack, fonts, splash screen
  (tabs)/            Tab navigator and the four tab screens
components/          Reusable UI (AssetRow, LoadState, WalletOverview, SegmentedToggle, Box, BaseIcon, core/CContainer)
hooks/               Data hooks (useHome, useWallet, and the generic useLoadable)
services/            MarketService interface and its mock implementation
mocks/               Static mock data used by the mock service
types/               Domain and shared types
utils/               Pure helpers (formatting, category split, wallet totals and allocation), with their unit tests next to them
theme/themes.ts      Design tokens: a raw palette, semantic colors that reference it, a numeric spacing scale, font sizes, shape, typography
```

### Swapping the data source

Screens never import mock data directly. `services/market-service.ts` exports a single `marketService` instance typed as the `MarketService` interface:

```ts
export const marketService: MarketService = new MockMarketService();
```

Pointing the app at a real backend means writing another class that implements `MarketService` and changing that line. `MockMarketService` also takes `latencyMs` and `shouldFail` options, which help when working on the loading and error states.

## Running locally

Requirements: Node.js 18.18 or newer (the minimum declared by React Native 0.79 and Metro), and either Expo Go on a device or an iOS simulator / Android emulator.

```bash
npm install
npm start
```

Then press `i` for the iOS simulator, `a` for the Android emulator, or scan the QR code with Expo Go.

## Scripts

| Script            | What it does                         |
| ----------------- | ------------------------------------ |
| `npm start`       | Start the Expo dev server            |
| `npm run ios`     | Start and open the iOS simulator     |
| `npm run android` | Start and open the Android emulator  |
| `npm test`        | Run the Vitest unit tests once       |

Type checking: `npx tsc --noEmit`.
