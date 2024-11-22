import type { ImageProps } from '@graphcommerce/image'
import { Image } from '@graphcommerce/image'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { memo } from 'react'
import type { AssetFragment } from './Asset.gql'

export type { AssetFragment } from './Asset.gql'

type ImageAsset = Omit<AssetFragment, 'width' | 'height'> & {
  width: number
  height: number
}

function isImage(asset: AssetFragment): asset is ImageAsset {
  return !!(asset.width && asset.height)
}

type AssetProps = {
  asset: AssetFragment
  sx?: SxProps<Theme>
} & Omit<ImageProps, 'src' | 'width' | 'height' | 'alt' | 'sx'>

export const Asset = memo<AssetProps>((props) => {
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
})
