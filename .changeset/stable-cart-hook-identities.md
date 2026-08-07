---
'@graphcommerce/magento-cart': patch
'@graphcommerce/magento-cart-payment-method': patch
---

Give `useClearCurrentCartId()` and `useCartLock()`'s `lock`/`unlock` a stable function identity, so consumers can list them in a `useEffect` dependency array without the effect re-running on every render.

`useClearCurrentCartId` returned a bare arrow function and `useCartLock` defined `lock`/`unlock` inline, while the neighbouring `useAssignCurrentCartId` already returned a `useCallback`. `useClearCurrentCartId` now uses `useCallback` with the Apollo `cache` as its only dependency (matching `useAssignCurrentCartId`), and `lock`/`unlock` use `useEventCallback` because they read values that legitimately change (`currentCartId`, the router query state and the Apollo client) — `useEventCallback` keeps the identity stable while always reading the latest values, so no stale closure is introduced.
