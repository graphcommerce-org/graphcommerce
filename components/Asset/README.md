# Asset

Image example:

Also see [FilestackPicture](../FilestackPicture/README.md)

```
<FilestackPicture
  type={(asset.mimeType as MimeTypes) ?? 'image/png'}
  src={asset.url}
  width={Math.round((asset.width! / asset.height!) * 40)}
  height={40}
/>
```

Video example:

```
<video autoPlay loop muted playsInline id='video' className={classes.video}>
  <source src={video.url} type={video.mimeType!} />
</video>
```
