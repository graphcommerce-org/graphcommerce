# FilestackPicture

Creates a picture (with img inside) element that is exactly sized for the
rendered viewport.

The width/height should be the exact value that the image will be rendered on a
Nexus 5X (The device used by Lighthouse).

## Usage

```tsx
<FilestackPicture
  type={(asset.mimeType as MimeTypes) ?? 'image/png'}
  src={asset.url}
  width={Math.round((asset.width! / asset.height!) * 100)}
  height={100}
/>
```

```tsx
<FilestackPicture
  type={(asset.mimeType as MimeTypes) ?? 'image/png'}
  src={asset.url}
  width={100}
  height={Math.round((avatar.height || 1) / (avatar.width || 1)) * 100}
/>
```
