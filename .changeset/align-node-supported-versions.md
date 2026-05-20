---
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/magento-open-source': minor
'@graphcommerce/magento-storyblok': minor
'@graphcommerce/hygraph-dynamic-rows-ui': minor
---

Align Node.js support with the official release schedule. Drop Node 20 (EOL April 2026), require Node 22 (Maintenance LTS) at minimum, and allow up to Node 26.

- `engines.node` set to `>=22.0.0 <27.0.0` across the root and all example storefronts.
- CI: `release-canary`, `release-main` and `pr-analysis` now run on Node 24 (Active LTS). `periodic-build` matrix changed from `[20, 22]` to `[22, 24]` and `actions/setup-node` bumped from v3 to v4.
- `.gitpod.yml` bootstrap moved from `nvm install 18` to `nvm install 24`.
- Getting-started docs and example READMEs now point at Node 22/24.
