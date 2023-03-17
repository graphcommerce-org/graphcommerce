---
menu: SEO Migration
---

# SEO Migration

GraphCommerce uses a different URL structure than default Magento to achieve
better performance.

## How are routes handled?

- Products have a different URL structure: `/p/[url]`. e.g.
  `/p/my-product-url-key` (different route can be configured with
  [productRoute config](../framework/config.md#productroute-string))
- Categories use same URL structure: `/[...url]`. e.g. `/my/category/path`.
- GraphCommerce does not use any URL suffixes. e.g. `.html`.

## Why doesn't GraphCommerce support full URL rewrites?

GraphCommerce splits the loaded JavaScript into route specific bundles improves
performance. This means that the products and categories (and checkout) all have
their own JavaScript bundle.

To load the page the user is visiting as fast as possibble, we directly need to
know what type of route we are viewing (e.g. `/p/[url]` or `/[...url]`).

We don't believe this is a problem for SEO. Most of the big platforms use
similar structure to do this. (amazon.com, apple.com, wallmart.com, target.com,
otto.de, etc.)

## How do I migrate my SEO URLs?

A permanent redirect for product URLs to the `/p/[url]` is made automatically.

A permanent redirect for product and category paths ending in the configured
suffix (e.g. `.html`) is made automatically.

Categories use the same URL structure as Magento, no redirection there.

Redirects provided by Magento are automatically handled.

## Next steps

- [Overview](./readme)
