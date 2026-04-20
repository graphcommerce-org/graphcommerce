import type { ImageProps } from '@graphcommerce/image'
import { Image } from '@graphcommerce/image'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { memo } from 'react'
import type { StoryblokAssetData } from '../types'
import { isSvg, isVideo, parseDimensions } from '../utils'

export type AssetProps = {
  asset: StoryblokAssetData
  sx?: SxProps<Theme>
} & Omit<ImageProps, 'src' | 'width' | 'height' | 'alt' | 'sx'>

const Video = styled('video')({})

function AssetBase(props: AssetProps) {
  const { asset, sx = [], ...imgProps } = props

  if (!asset.filename) return null

  if (isVideo(asset.filename)) {
    return (
      <Video src={asset.filename} autoPlay muted loop playsInline disableRemotePlayback sx={sx} />
    )
  }

  const dimensions = parseDimensions(asset.filename)
  if (dimensions) {
    return (
      <Image
        src={asset.filename}
        width={dimensions.width}
        height={dimensions.height}
        alt={asset.alt ?? ''}
        unoptimized={isSvg(asset.filename)}
        {...imgProps}
        sx={sx}
      />
    )
  }

  // SVGs and other assets without dimensions in the URL
  if (isSvg(asset.filename)) {
    return (
      <Image
        src={asset.filename}
        width={0}
        height={0}
        alt={asset.alt ?? ''}
        unoptimized
        {...imgProps}
        sx={[{ width: '100%', height: 'auto' }, ...(Array.isArray(sx) ? sx : [sx])]}
      />
    )
  }

  if (process.env.NODE_ENV !== 'production') return <div>Unsupported asset: {asset.filename}</div>

  return null
}

export const Asset = memo(AssetBase)
