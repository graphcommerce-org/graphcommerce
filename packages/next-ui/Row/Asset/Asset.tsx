import { Image, ImageProps } from '@graphcommerce/image'
import { styled, SxProps, Theme } from '@mui/material'
import { AssetProps } from './type'

type ImageAsset = Omit<AssetProps, 'width' | 'height'> & {
  width: number
  height: number
}

function isImage(asset: AssetProps): asset is ImageAsset {
  return !!(asset.width && asset.height)
}

export function Asset(
  props: { asset: AssetProps; sx?: SxProps<Theme> } & Omit<
    ImageProps,
    'src' | 'width' | 'height' | 'alt' | 'sx'
  >,
) {
  const { asset, sx = [], ...imgProps } = props

  if (isImage(asset)) {
    const { url, height, mimeType, size, width, alt, ...assetProps } = asset
    return (
      <Image
        src={url}
        height={height}
        width={width}
        alt={alt ?? undefined}
        {...imgProps}
        {...assetProps}
        unoptimized={mimeType === 'image/svg+xml'}
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
      />
    )
  }

  if (asset.mimeType === 'video/mp4') {
    const Video = styled('video')({})

    return (
      <Video
        src={asset.url}
        autoPlay
        muted
        loop
        playsInline
        disableRemotePlayback
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
      />
    )
  }

  if (process.env.NODE_ENV !== 'production') return <div>{asset.mimeType} not supported</div>
  return null
}
