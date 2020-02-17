## Goals

- Load images that are in the viewport as fast as native images.
- Load images outside the viewport when they come into view.
- Load the correct image for the rendered size.
- No user agent sniffing (to prevent any caching issues..)
- A bot should be able to find the 'original' image for SEO purposes.

## Fastest FCP (First Contentful Paint)

To achieve native performance we need to leverage browsers HTML-parser (Service
side rendered HTML). The browser natively knows what images should be downloaded
and will start them as soon as possible.

Triggering the download with _any_ JavaScript, doesn't matter how small, will
result in a performance penalty, because it will now do all the other HTML stuff
and _then_ start downloading images..

We use JavaScript to enhance the user-experience, but the initial paint should
be browser native.

## Lazy loading

By adding `loading=lazy` to the images only images in the viewport are loaded
when the page loads even if there isn't any Javascript enabled.

_Note: loading=lazy`doesn't have full coverate yet.
[browser support](https://caniuse.com/#feat=loading-lazy-attr)_

There are polyfills available:
https://github.com/mfranzke/loading-attribute-polyfill which allows us to solve
the attribute, they cause image downloading to be fully JS dependend for all
implementations.. This will slow down Chrome + Browsers with high-bandwidth
connections.. [Benchmark?]

We expect Safari support to be implemented hopefull soonish, because a patch
already exists: https://bugs.webkit.org/show_bug.cgi?id=196698

(Since we stated that we dont allow user sniffing, we can't "send custom HTML
for Safari" or something)

## Correct image size

2.

### SSR HTML Output

```html
<picture>
  <noscript>
    <source media="(min-width: 40em)" srcset="simpleimage.huge.jpg" />
    <!-- Research required: is it better to simply send a second <img> tag?, how dumb are bots? -->
  </noscript>
  <img
    src="image-expected-render-size-on-a-phone-400px-wide"
    loading="lazy"
    decoding="async"
  />
</picture>
```

### Client upgrade

```html
<picture
  ><source
    type="image/jpeg"
    srcset="
      https://picsum.photos/id/1/400/400    400w,
      https://picsum.photos/id/1/600/600    600w,
      https://picsum.photos/id/1/800/800    800w,
      https://picsum.photos/id/1/1000/1000 1000w,
      https://picsum.photos/id/1/1200/1200 1200w,
      https://picsum.photos/id/1/1400/1400 1400w,
      https://picsum.photos/id/1/1600/1600 1600w
    "
    sizes="269px"/>
  <img
    src="https://picsum.photos/id/1/400/400"
    loading="lazy"
    decoding="async"
    style="width: 400px; max-height: 400px; object-fit: contain;"
/></picture>
```

---

The idea is that we make the image async:

- Let it determine the rendered size of the image and set it's
  <source size="xxx"/> attribute.
- The browser now chooses the right image to download and render.

The problem with this is dat we require JS to always be initialized before it
can render. This makes downloading images almost always slower on a
high-bandwidth connection.. Even when the images we download are larger than
they are displayed..

For low-bandwidth situations it's actually more important to download the right
image as opposed to being as early as possible..

So in conclusion: A somewhat to big image downloads faster on a high-bandwidth
connection than the perfect async image.. And vice versa on a low-bandwidth

Even if the javascript is almost 0 kb, it will still impact performance as the
image download doesn't start when the html is parsed, it can only start when the
the JS initiates it.

Possible solutions:

- Give all images the <img loading=lazy /> directly from the server.
- Give all the images an image that is somewhat too big for a default mobile
  device.
- If an image is downloading while the JS is initialized wait for that image to
  be loaded.
- If the image is downloaded OR the image is outside the viewport do the
  measure+setSizes

In theory this will give a native loading experience for in-viewport images,
albeit with a potential wrong resolution that will be upgraded to the 'right'
image.

We download a somewhat too big image on mobile because we absolutely want to
prevent double downloads if those can be avoided.

This feature only works for Chrome so all other browsers will download images
directly.

- This isn't a problem for high-bandwidth connections as it will download
  relatively small images which maybe get upgraded.

- This is a problem on Safari Mobile as it will download all images at once..

PictureResponsive enhances the native picture element:

- It measures the width of the image and sets the height with the help of the
  intrinsicsize property. This is based on a canceled spec, but because of a
  better alternative we still use it.
  https://github.com/WICG/intrinsicsize-attribute
- It measures the width of the image and sets the 'sizes' attribute of each
  source respectively: By doing this we load the perfect image. We also take in
  account object-fit: contain, because that will render a smaller image.
- It sets the loading='lazy' on the image tag, making it lazy loading. Limited
  to Chrome right now, but other browsers will follow soon.

Tips:

- Images can be positioned by using the `object-fit: cover` or
  `object-fit: contain` properties on the img tag.
- You can add <img href="{lqip}"/> to create a low quality image placeholder for
  the image.

Alternatives:

- https://github.com/aFarkas/lazysizes

/
