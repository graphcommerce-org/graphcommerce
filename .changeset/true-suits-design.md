---
'@graphcommerce/magento-open-source': minor
'@graphcommerce/magento-storyblok': minor
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/next-ui': minor
---

Refactored `LayoutNavigation` into composable pieces (`Header`, `HeaderContainer`, `MenuOverlay`, project-local `LayoutDefault`). `LayoutDefault` / `LayoutDefaultProps` in `@graphcommerce/next-ui` are marked `@deprecated` — the canonical version now lives locally in `components/Layout/`.
