# Static File Serving

When building your custom storefront, it can be useful to have access to static
files not already hosted elsewhere, like images or text documents. This guide
describes how to reference and serve static files in GraphCommerce.

## How static file serving works

Static files are files your app downloads from a server. Next.js serves static
assets at the root path /. For example, you can create a file called
public/icon.png and reference it in your code as /icon.png.

Product images are served from the Magento database, so you don't need to place
those images in the /public directory.

### Best practices

- Don't rename the /public directory as it's the only directory used to serve
  static files. You can add subdirectories, like /public/docs

## CSS background images

CSS background images are common assets you would place in the /public
directory. It's a good practice to limit these to .svg images.

If you need to use a .jpg file as part of the design, place them in the /public
directory but render them with the `'@graphcommerce/image'` [Image component]().
This will benefit performance, due to the component's features such as
CDN-caching, srcset, and viewport loading.

## Images

Images that are part of a page or component's content (for example, product
images), should always be rendered with the `'@graphcommerce/image'`
[Image component](). This will benefit performance, due to the component's
features such as CDN-caching, srcset, and viewport loading.

## Next steps

- Learn more about
  [Next.js static file serving ↗](https://nextjs.org/docs/basic-features/static-file-serving)
  in the Next.js docs
- Learn how to modify your GraphCommerce app's
  [favicon](../framework/favicon.md)
