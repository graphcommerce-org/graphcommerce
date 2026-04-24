---
'@graphcommerce/magento-storyblok': minor
'@graphcommerce/storyblok-ui': minor
---

## Storyblok example

We're shipping `examples/magento-storyblok` — a full Storyblok CMS integration alongside the existing Hygraph example, so teams can pick the headless CMS that fits their workflow.

**What's in the box**

- Visual editing: live preview, click-to-edit on every blok, and SSR with client hydration
- Row components out of the box: hero banners, special banners, quotes, button link lists, service options, product grids, blog content, and USPs — all editable in the Storyblok Visual Editor
- Global config pattern for content shared across pages (footer links, social links, USPs) with live updates in the editor
- Type-safe integration: generated TypeScript types for every component schema via the Storyblok CLI
- `@graphcommerce/storyblok-ui` helpers: rich text renderer, asset component with video/image support, multilink resolution, product block resolution, and Visual Editor utilities

**Getting started**

- `yarn storyblok:bootstrap` seeds a new Storyblok space with all demo content (components, stories, assets) so a fresh install is editable in minutes
- `spaceId` lives in `graphcommerce.config.cjs` alongside your other config — no separate env juggling
- Components, stories, and assets are committed to the repo as the source of truth

**Also includes**

- Storyblok-aware Footer, Navigation, and PDP layouts wired to the global config
- Blog support with tag filtering and pagination
- Preview URL routing so the Visual Editor opens the right page for each story type
