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

// Storyblok encodes image dimensions in the CDN URL (`/WxH/`), but its image
// processor only runs for uploads made through the web UI. Assets uploaded via
// the Management API — which is what the CLI's `assets push` (used by our
// bootstrap script) does — never get that segment, so `parseDimensions`
// returns null for them. next/image requires non-zero width/height or it
// emits a 1w placeholder in srcset that some browsers pick inside the
// Storyblok Visual Editor iframe, leaving images blank. These fallbacks
// satisfy next/image; the rendered size is controlled by CSS (sx).
//
// In practice this only affects the bootstrapped demo content — assets
// editors upload through the Storyblok UI get proper dimensions in the URL
// and hit the `parseDimensions` path above.
const FALLBACK_WIDTH = 500
const FALLBACK_HEIGHT = 500

function AssetBase(props: AssetProps) {
  const { asset, sx = [], ...imgProps } = props

  if (!asset.filename) return null

  if (isVideo(asset.filename)) {
    return (
      <Video src={asset.filename} autoPlay muted loop playsInline disableRemotePlayback sx={sx} />
    )
  }

  const dimensions = parseDimensions(asset.filename)

  if (isSvg(asset.filename)) {
    return (
      <Image
        src={asset.filename}
        width={dimensions?.width ?? 0}
        height={dimensions?.height ?? 0}
        alt={asset.alt ?? ''}
        unoptimized
        {...imgProps}
        sx={
          dimensions ? sx : [{ width: '100%', height: 'auto' }, ...(Array.isArray(sx) ? sx : [sx])]
        }
      />
    )
  }

  return (
    <Image
      src={asset.filename}
      width={dimensions?.width ?? FALLBACK_WIDTH}
      height={dimensions?.height ?? FALLBACK_HEIGHT}
      alt={asset.alt ?? ''}
      {...imgProps}
      sx={sx}
    />
  )
}

export const Asset = memo(AssetBase)
