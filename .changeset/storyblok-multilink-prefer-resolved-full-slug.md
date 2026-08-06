---
'@graphcommerce/storyblok-ui': patch
---

Resolve `story` multilinks against the target's current slug instead of the frozen `cached_url`. `cached_url` is a snapshot taken when the *referencing* story was last published, so renaming the target left every link to it pointing at a 404 until an editor re-published each referencing story. `multilinkHref` now prefers `story.full_slug` — populated from the `links` map the CDN resolves on every read, since `sbParams` always sends `resolve_links: 'story'` — which makes story links self-healing across renames. Other link types are unaffected.
