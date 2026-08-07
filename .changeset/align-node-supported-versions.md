---
'@graphcommerce/magento-graphcms': major
'@graphcommerce/magento-open-source': major
'@graphcommerce/magento-storyblok': major
'@graphcommerce/hygraph-dynamic-rows-ui': major
---

**Breaking change — requires Node.js 22 or newer.** This kicks off GraphCommerce 11.

Node.js 20 hit end-of-life in April 2026, so the framework no longer supports it. `engines.node` is now `>=22.0.0 <27.0.0` across the root and all example storefronts — Node 22 (Maintenance LTS) is the new minimum, Node 24 (Active LTS) is recommended, and Node 26 (current) is also accepted.

- CI: `release-canary`, `release-main` and `pr-analysis` now run on Node 24. `periodic-build` matrix changed from `[20, 22]` to `[22, 24]`, and `actions/setup-node` bumped from v3 to v4.
- `.gitpod.yml` bootstrap moved from `nvm install 18` to `nvm install 24`.
- Getting-started docs and the three example READMEs now point at Node 22/24.

See [docs/upgrading/graphcommerce-10-to-11.md](docs/upgrading/graphcommerce-10-to-11.md) for the migration steps.
