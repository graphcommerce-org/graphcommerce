# @graphcommerce/image

Since we're using a ton of images on the website we wanted to optimize the
images further than what `next/image` has to offer.

## Goals

- Only provide an image, no wrapping divs which changes how images work.

- Support the next/image layout properties.

- Optimize images further than what next/image does.

## Quality

1. Set `quality='product'` on images from the Magento catalog. An `<Image>`
   without `quality` uses `content`.

   ```tsx
   <Image
     src={product.small_image.url}
     width={300}
     height={300}
     quality='product'
   />
   ```

2. Change the qualities in `graphcommerce.config.ts`. The defaults are
   `content: 75` and `product: 52`.

   ```ts
   imageQuality: { content: 80 },
   ```

`withGraphCommerce` adds the values of `imageQuality` to `images.qualities`. Add
a number that you pass as `quality={90}` to `images.qualities` in
`next.config.ts`.

## Serving the right images for low dpi screens (1x)

Jake Archibald's blog
https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/
recommends serving high quality, but low resolution images on low dpi screens:
[high resolution screens and low resolution screens](https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/#compressing-images-for-high-density-screens)

- high dpi screens need `high res` images but it is very acceptable to have
  `quality=44` images
- `quality=80`: low dpi screens need `low res` images but also need to have high
  quality images.

In our [testing](https://u5uol.sse.codesandbox.io/)
([code](https://codesandbox.io/s/strange-fermi-u5uol?file=/pages/index.tsx)),
for low dpi screens it doesn't really seem to matter if we serve
`high res, quality=44`.

Advantage: We need significantly less resizes, which is good for the backend.
Disadvantage: The image size for the `low res, quality=44` images is about 30%
larger than `high res, quality=80`

We deemed this to be acceptable for desktop as internet connections are fairly
acceptable and we're winning a great deal by lowering the quality already.

## Capping image fidelity on ultra-high resolution devices (2.5x-+)

https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html

## Defaulting to 50vw the sizes attribute `<img sizes=".."/>`

The `sizes` attribute allows browsers to download images even before the CSS has
finished loading. This means that the browser is able to download images as
early as an img with only an src attribute.

> When the browser starts to load a page, it starts to download (preload) any
> images before the main parser has started to load and interpret the page's CSS
> and JavaScript.
> [Why can't we just do this using CSS or JavaScript?](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#why_cant_we_just_do_this_using_css_or_javascript)
