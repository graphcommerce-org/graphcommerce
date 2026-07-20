---
'@graphcommerce/next-ui': minor
---

`HeroBanner` gains an `asset?: React.ReactNode` prop, and `videoSrc` is deprecated.

The banner rendered a `<video>` itself, from a raw URL — so it could only ever hold a video, and left nowhere to hang a poster, the one place a poster matters most (a full-bleed autoplaying video above the fold). It now takes a node and renders it, the way its sibling `SpecialBanner` already does; positioning stays with the banner, stretching whatever is passed to fill via `& img, & video`.

```diff
- <HeroBanner videoSrc={asset.filename} … />
+ <HeroBanner asset={<Asset asset={asset} poster={poster} />} … />
```

Taking a node rather than a source also keeps `next-ui` free of any CMS: the Storyblok and Hygraph examples each pass their own `<Asset>`, both of which already render images and video.

`videoSrc` still works but is deprecated: when set (and `asset` is not) it renders a bare autoplaying video, keeping the `HeroBanner-video` class. The only behavioural change on that path is that the scroll parallax is gone, along with the `framer-motion`, `useScrollY` and `clientSize` machinery it needed. Migrate to `asset` to regain images, posters, and control over how the media is rendered.
