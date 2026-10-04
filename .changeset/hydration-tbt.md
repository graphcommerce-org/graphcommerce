---
'@graphcommerce/next-ui': patch
'@graphcommerce/graphql': patch
'@graphcommerce/magento-customer': patch
---

Reduce Total Blocking Time by removing synchronous re-renders right after hydration and splitting up startup work:

- `usePrivateQuery` no longer uses `useIsSSR()`. Its `useSyncExternalStore` server/client mismatch forced a synchronous re-render of the whole page after hydration, even for guests. Without a private context the mask stays on, which is inert because it only hides content while the `private-query` CSS flag is set.
- `useCookie(name)` subscribes to a single cookie via `useSyncExternalStore` (server snapshot `null`), so it only re-renders after hydration when that cookie is actually set.
- `usePrivateQueryContext` (magento-customer plugin) subscribes to the derived `loggedIn` boolean on the Apollo cache instead of the full `CustomerToken` query result, so the page doesn't re-render when the query result object changes but `loggedIn` doesn't.
- `CssAndFramerMotionProvider` loads framer-motion features after hydration and applies them in `startTransition`, so the re-render of all `m` components is time-sliced and the features stay out of the startup bundle.
- Examples: `ThemeProvider` uses `noSsr`, avoiding MUI's color scheme provider re-rendering every styled component after hydration (`colorSchemeSelector: 'class'` already handles the color scheme in CSS before paint).
- Examples: added `patch-package` patches for `next@16.2.6` (Pages Router hydrates inside `startTransition`, like the App Router; the route loader yields between `_app` and page instantiation) and `react-hook-form@7.67.0` (only set `formState.isReady` when it is subscribed to; the unconditional update re-rendered every form synchronously after mount).
