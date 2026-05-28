---
'@graphcommerce/magento-open-source': minor
'@graphcommerce/magento-storyblok': minor
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/next-ui': minor
---

Refactored `LayoutNavigation` into composable pieces (`Header`, `HeaderContainer`, `MenuOverlay`, project-local `LayoutDefault`).
The old version is preserved as `LayoutNavigationLegacy.tsx` and swappable via a one-line edit in `components/Layout/index.ts`. 
`LayoutDefault` / `LayoutDefaultProps` in `@graphcommerce/next-ui` are marked `@deprecated` — the canonical version now lives locally in `components/Layout/`.
