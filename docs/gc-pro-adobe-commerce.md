---
menu: GraphCommerce Pro Adobe Commerce
metaTitle: GraphCommerce Pro - Adobe Commerce packages
metaDescription:
  'Production-ready packages for Adobe Commerce: Gift Cards, Store Credit,
  Reward Points, Returns, and more.'
metaUrl: graphcommerce-pro-adobe-commerce
---

# GraphCommerce Pro for Adobe Commerce

Production-ready packages extending GraphCommerce with Adobe Commerce features.

For Magento Open Source features, see [GraphCommerce Pro](./gc-pro).

GC Pro for Adobe Commerce license is €2500 per year, send an email to
sales@graphcommerce.org for a license. Multi year bundles available. Each
license is valid for one brand or installation, we'll send details.

---

## `@graphcommerce/adobe-commerce`

Adobe Commerce staging preview support. Adds datetime picker to preview mode
toolbar for previewing scheduled content changes.

**Plugin:** `AdobeCommercePreviewModeToolbar` — sets `magentoPreviewVersion`
(unix timestamp) in preview mode.

---

## `@graphcommerce/adobe-commerce-gift-c`

Gift card products, cart application, and account management. Supports virtual,
physical, and combined gift cards.

Note: Package named `gift-c` because `gift-card` is forbidden on npm.

**Components:** `ProductPageGiftCard`, `ApplyGiftCardToCartForm`,
`GiftCardCartAccordion`, `GiftCardTotals`, `GiftCardAccount`, `GiftCardPage`

**Mutations:** `applyGiftCardToCart`, `removeGiftCardFromCart`

**Query:** `giftCardAccount` — check balance by code

---

## `@graphcommerce/adobe-commerce-store-credit`

Apply store credit at checkout, view balance and history in customer account.

**Components:** `StoreCreditAccordion`, `StoreCreditCurrentBalance`,
`StoreCreditHistory`, `StoreCreditPage`, `StoreCreditAccountMenuItem`

**Mutations:** `applyStoreCreditToCart`, `removeStoreCreditFromCart`

**Known issue:** `applied_store_credit` throws error for guest carts (patch
included).

---

## `@graphcommerce/adobe-commerce-reward-points`

Earn and redeem reward points. Shows earnings for cart, registration, and
newsletter signup.

**Components:** `RewardPointsAccordion`, `RewardPointsCurrentPoints`,
`RewardPointsHistory`, `RewardPointsEarningsCart`,
`RewardPointsEarningsRegister`, `RewardPointsEarningsNewsletterCustomer`,
`RewardPointsBanner`, `RewardPointsPage`, `RewardPointsMenuItem`

---

## `@graphcommerce/adobe-commerce-returns`

Customer-facing RMA (Return Merchandise Authorization) flow. Customers can
request returns, select items/quantities, add tracking, and communicate with the
store.

Limitation: Customer-only, no guest return support via GraphQL API.

**Queries:** `OrdersEligibleForReturns`, `ReturnsAttributeList`,
`Return_Details`

**Mutations:** `requestReturn`, `addReturnTracking`, `removeReturnTracking`,
`addReturnComment`

---

## Additional Packages

| Package                                             | Description                          |
| --------------------------------------------------- | ------------------------------------ |
| `@graphcommerce/adobe-commerce-gift-c-store-credit` | Gift card purchase with store credit |
| `@graphcommerce/adobe-commerce-gift-registry`       | Gift registry creation and sharing   |
| `@graphcommerce/adobe-commerce-gift-wrapping`       | Gift wrapping options per order/item |
| `@graphcommerce/adobe-commerce-multi-coupon`        | Multiple coupon codes per cart       |
| `@graphcommerce/adobe-commerce-multi-wishlists`     | Multiple wishlists per customer      |
| `@graphcommerce/adobe-commerce-dynamic-blocks`      | Customer segment targeted content    |
| `@graphcommerce/adobe-commerce-cart`                | `clearCart` mutation                 |
