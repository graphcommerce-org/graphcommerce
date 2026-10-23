---
'@graphcommerce/magento-open-source': minor
'@graphcommerce/magento-storyblok': minor
'@graphcommerce/magento-graphcms': minor
'@graphcommerce/next-ui': minor
---

Refactored `LayoutNavigation` into composable pieces (`Header`, `HeaderContainer`, `MenuOverlay`, project-local `LayoutDefault`). `LayoutDefault` / `LayoutDefaultProps` in `@graphcommerce/next-ui` are marked `@deprecated`. If you are upgrading and do not want these changes, you can just discard them. This is just a structural change for more ease of use. No visually change.
