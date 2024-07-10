---
menu: Roadmap
---

# Roadmap

The following overview contains the status of items on the GraphCommerce
roadmap.

## In progress / planned

[Upcoming in the next release](https://github.com/graphcommerce-org/graphcommerce/releases?q=prerelease%3Atrue&expanded=true)

- [ ] Product page gallery improvements: Grid of images, animated thumbnails,
      Video support + disable zoom feature.
- [ ] Create a generic CMS integration framework, removing the hard Hygraph
      requirement
- [ ] Web Migration to next/image in favor of @graphcommerce/image
- [ ] Improved cache invalidation logic for category and product pages by using
      the Varnish PURGE functionality of Magento.
- [ ] Support for very large carts with 100+ items.
- [ ] Abstractions for integration with multiple catalog/search API's like
      Algolia, Magento Live Search and various layered navigation modules.

## Considering / researching

- [ ] Adobe Sensei integration
- [ ] Gallery support on category/search pages.
- [ ] Authorize.net payment service integration
- [ ] Web Vitals: Use CSS theme variables or wait for MUI v6 release with static
      extraction.
- [ ] React Server Components integration with streaming for faster loads.
- [ ] Windows support
- [ ] Store locator
- [ ] PageBuilder support
      [depends on ↗](https://github.com/magento/magento2/issues/37768)

## Released

[See all releases](https://github.com/graphcommerce-org/graphcommerce/releases?q=prerelease%3Afalse+&expanded=true)

- [x] Web Vitals: Reduce Total Blocking Time, to improve INP metic.
- [x] Web Vitals: Defer rendering of elements further on the page, to improve
      INP metic.
- [x] Magento Open Source GraphQL API Coverage with detailed GraphQL analysis
      per version.
- [x] Plugin system redesign so typescript correctly identifies plugins and can
      type check all the integrations.
- [x] Google Datalayer improvements to better handling gtag.js or GTM
- [x] Improved category navigation: Navigate to sibling categories + Category
      tree navigation in sidebar.
- [x] i18n configuration separation from URL structure.
- [x] Customer specific pricing support for category and product pages.

---

- [x] Product page gallery improvements: Thumbnails
- [x] Major improvements to Accessibility
      [issue ↗](https://github.com/graphcommerce-org/graphcommerce/issues/1995)
- [x] Show Crosssells in the cart
- [x] Support for Github Codespaces
- [x] Faster loading performance for the category page
- [x] Recently viewed products
- [x] Global store messages
- [x] Invalid session handling improvements
- [x] Product thumbnails on product page
- [x] Wishlist redesign
- [x] Success page redesign
- [x] Dutch Postcode API upgrades
- [x] Configurable variants for simple products
      [ocs ↗](https://graphcommerce.org/docs/magento/configurable-products)
- [x] Cart redesign
- [x] Hygraph schema migrations
      [docs ↗](https://graphcommerce.org/docs/hygraph/cli)
- [x] [Algolia Search (beta)](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/algolia-search)
- [x] [Dynamic Rows](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/hygraph-dynamic-rows)
- [x] [Product compare](https://github.com/graphcommerce-org/graphcommerce/blob/main/packages/magento-compare/Config.graphqls)
- [x] Google Tagmanager 4 datalayer implementation
      [docs ↗](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/googleanalytics)
- [x] Paypal Express payment service
      [docs ↗](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-paypal)
- [x] Adyen payment service
      [docs ↗](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/magento-payment-adyen)
- [x] Postcode check integration
      [docs ↗](https://github.com/graphcommerce-org/graphcommerce/tree/main/packages/address-fields-nl)
- [x] Redesigned layered navigation for mobile and desktop
- [x] Crosssells overlay after adding a product to cart
- [x] Bundle product
      [example ↗](https://graphcommerce.vercel.app/nl/p/giftcard-bundle-gc-570)
- [x] Configurable product image swatches
      [example ↗](https://graphcommerce.vercel.app/nl/p/gc-puncturing-sock)
- [x] Virtual product, downloadable products
- [x] Multilingual Hygraph (Hygraph) setup support
- [x] Multisafepay payment service
- [x] Multilingual product sitemap generation
- [x] Multi level Navigation (Mega Menu)
- [x] Pick up in store checkout integration
- [x] Checkout shipping method selection rebuild
- [x] Checkout payment selection rebuild
- [x] Core stability (hydratation, caching, query optimization)

## Next steps

- Refer to the
  [Changelog](https://github.com/graphcommerce-org/graphcommerce/releases) to
  see what's new
