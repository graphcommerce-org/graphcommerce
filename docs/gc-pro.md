---
menu: GraphCommerce Pro
metaTitle: GraphCommerce Pro - Magento packages
metaDescription:
  'Production-ready packages for Magento: PageBuilder, Multi-Cart, Cache
  Invalidation, Private Pricing, and more.'
metaUrl: graphcommerce-pro
---

# GraphCommerce Pro

Production-ready packages extending GraphCommerce with Magento Open Source
compatible features. Also see
[GraphCommerce Pro for Adobe Commerce](./gc-pro-adobe-commerce)

GC Pro license is €1000 per year, send an email to sales@graphcommerce.org for a
license. Multi year bundles available. Each license is valid for one brand or
installation, we'll send details. All of the packages belof will are included.

---

## `@graphcommerce/magento-multi-cart`

Flexible product list system supporting multiple named carts per customer.
Supports various use cases beyond shopping carts:

**B2C:** Wishlists, Save for Later, Room/Project Lists

**B2B:** Requisition Lists, Project Carts, Spare Parts / Reorder Lists

Requires: `GraphCommerce_MultiCart` Magento module.

**Features:**

- Multiple cart groups with configurable behavior
- Tab-based UI to switch between lists
- Create/rename/delete lists within each group
- Move or copy items between lists
- Convert entire list to another group
- Checkout from any list

**Mutations:** `multiCartCreate`, `multiCartUpdate`, `multiCartTrash`,
`multiCartSelectCart`, `multiCartMakeReal`, `multiCartCopyItemsToCart`,
`multiCartMoveItemsBetweenCarts`, `multiCartMoveToOtherCartGroup`

---

## `@graphcommerce/cache-notify`

Near-realtime SSG revalidation via webhooks. GraphCommerce by default statically
generates pages (SSG) and revalidates after 20 minutes (sometimes more). This
package adds a `/api/cache-notify` endpoint to handle notifications from Magento
and Hygraph, so pages are revalidated immediately after content changes.

Requires: `GraphCommerce_GraphQLCacheNotify` Magento module.

**Handlers:**

- `@graphcommerce/cache-notify-magento` — Revalidates on `product.create`,
  `product.update`, `product.delete`, `category.update` events
- `@graphcommerce/cache-notify-hygraph` — Revalidates on page publish/unpublish

---

## `@graphcommerce/graphql-mesh-cache-varnish`

Cache GraphQL POST requests in Varnish. Computes SHA256 hash of operation +
variables and sends as `X-Document-ID` header. Varnish uses this header as cache
key.

Requires: Varnish VCL modifications (included in package as `varnish6.vcl`).

---

## `@graphcommerce/magento-pagebuilder`

Renders Magento PageBuilder content in the headless storefront. Implementation
strives to match the source Magento visual implementation.

**Content Types:** `PageBuilderRow`, `PageBuilderColumn`,
`PageBuilderColumnGroup`, `PageBuilderText`, `PageBuilderHeading`,
`PageBuilderImage`, `PageBuilderVideo`, `PageBuilderBanner`,
`PageBuilderSlider`, `PageBuilderSlide`, `PageBuilderTabs`,
`PageBuilderButtonsList`, `PageBuilderDivider`, `PageBuilderHtml`,
`PageBuilderMap`, `PageBuilderProductList`, `PageBuilderStaticBlock`

**Features:** Background images/videos, parallax effects (Jarallax), responsive
columns.

Demo:
https://graphcommerce-pro-ac-git-canary-reachdigital.vercel.app/page/test-page
Test Page: https://graphcommerce-pro-ac-git-canary-reachdigital.vercel.app/

---

## `@graphcommerce/magento-private-pricing`

Hide prices for guests with "Login for prices" messaging. Adds `catalogPricing`
permission to the GraphCommerce permissions system.

**Config:**

```ts
const config = {
  permissions: {
    catalogPricing: 'CUSTOMER_ONLY',
  },
}
```

**Components:** `PrivatePricingMessage`, `PrivatePricingProductListPrice`,
`PrivatePricingProductPagePriceTiers`, `PrivatePricingSignInButton`

Components can be replaced via plugins for custom rendering.

---

## `@graphcommerce/magento-price-view`

Frontend price display mode switcher. Adds a section to the Store Switcher for
price view configuration. Stores selection in cookie, sends as header to backend
for custom price logic.

**Components:** `StoreSwitcherPriceView`, `PriceViewOption`

---

## `@graphcommerce/magento-price-view-vat`

Adds Incl./Excl. VAT toggle option to the price view switcher.
