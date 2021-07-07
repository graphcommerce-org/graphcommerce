# next-picture

`@reachdigital/next-picture` is a replacement for `next/image` with some
changes:

## Goals

- Support modern browsers. next/image supports IE11 and therefor needs to do all
  kinds of fancy stuff to reserve space for images.

- Images should never 'pop' and should just be there. So when we're scrolling we
  don't want to see blank spaces / blur placeholders.

## Great defaults for the `<img sizes=".."/>` attribute

The
[`<img sizes=".."/>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes)
attribute is the star of the show for responsive images.

> When the browser starts to load a page, it starts to download (preload) any
> images before the main parser has started to load and interpret the page's CSS
> and JavaScript.
> [Why can't we just do this using CSS or JavaScript?](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#why_cant_we_just_do_this_using_css_or_javascript)

## Great defaults for the given `quality` on devices:

Jake Archibald's blog
https://jakearchibald.com/2021/serving-sharp-images-to-high-density-screens/
recommends differential serving between different screen sizes:
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
