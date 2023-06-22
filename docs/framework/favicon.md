# Favicon

GraphCommerce offers a [magento-graphcms example](../getting-started/readme.md)
that provides an approachable path to building GraphCommerce custom e-commerce
storefront.

Included in the magento-graphcms example, is a
[well-founded implementation ↗](https://medium.com/web-dev-survey-from-kyoto/favicon-nightmare-how-to-maintain-sanity-7628bfc39918)
for a correct favicon and touch icon.

Favicons can be found in the /public directory:

```txt
/public/favicon.ico
/public/favicon.svg
/public/apple-touch-icon.png
/public/manifest/favicon-512.png
/public/manifest/favicon-192.png
```

## Replacing the favicon

To replace the favicon with your own, simply replace the image files located in
the /public and /public/manifest directories. Pay attention to the standardized
["minimum safe zone ↗"](https://web.dev/maskable-icon/?utm_source=devtools#are-my-current-icons-ready)

You can use the GraphCommerce
[favicon sketch template ↗](https://drive.google.com/file/d/1tKiU54TgLd_sbd0tArpaqYdD9VYiYwwt/view?usp=sharing)
to simplify the process of making correct favicons.

<figure>

![Favicon sketch template](https://user-images.githubusercontent.com/1251986/157831064-c786d4dc-5f9c-4f8a-a665-7e513990d6aa.png)

 <figcaption>Favicon sketch template</figcaption>
</figure>

## Open Graph preview image

The Open Graph image is automaticly set for product and category pages if
possible. For product pages the first gallary image will be used and for
category pages the image uploaded to the `Category Image` attribute. If these
images are not availale or on any of the other other pages a preview image will
not be added unless added as `ogImage` prop to the `PageMeta`, `, CategoryMeta`
or `ProductPageMeta` components.

It is possible to enable a fallback image per route by setting the
`ogImageUseFallback` prop to `true` on either the `PageMeta`, `, CategoryMeta`
or `ProductPageMeta` components. The image used as fallback can be found at
`/public/open-graph-image.jpg`

## Next steps

- Lear more about [Static file serving](../framework/static-file-serving.md)
