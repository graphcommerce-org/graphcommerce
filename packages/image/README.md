# @graphcommerce/image

Since we're using a ton of images on the website we wanted to optimize the
images further than what `next/image` has to offer.

## Goals

- Only provide an image, no wrapping divs which changes how images work.

- Support the next/image layout properties.

- Optimize images further than what next/image does.

## Optimizing the images on high dpi sreens (1.5x-2.5x)

It seems that it doesn't really matter if we lower the quality of images for 2x
screens. So we lowered the quality to 44 as recommended.

To view the difference between quality=100 and quality=44, open this on a high
dpi screen: https://u5uol.sse.codesandbox.io/ and see the difference between the
'High resolution' variants.

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
