import type { ImageProps } from '@graphcommerce/image'
import { Image } from '@graphcommerce/image'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import { memo } from 'react'
import type { StoryblokAssetData } from '../types'

const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'ogg', 'mov', 'avi'])
const SVG_EXTENSIONS = new Set(['svg'])

function getExtension(filename: string): string {
  const clean = filename.split('?')[0].split('#')[0]
  const dot = clean.lastIndexOf('.')
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : ''
}

/**
 * Storyblok encodes image dimensions in the asset URL:
 * `//a.storyblok.com/f/{space}/{width}x{height}/{hash}/{filename}`
 */
function parseDimensions(filename: string): { width: number; height: number } | null {
  const match = filename.match(/\/(\d+)x(\d+)\//)
  if (!match) return null
  const width = Number(match[1])
  const height = Number(match[2])
  return width > 0 && height > 0 ? { width, height } : null
}

function isVideo(filename: string): boolean {
  return VIDEO_EXTENSIONS.has(getExtension(filename))
}

function isSvg(filename: string): boolean {
  return SVG_EXTENSIONS.has(getExtension(filename))
}

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

  if (process.env.NODE_ENV !== 'production')
    return <div>Unsupported asset: {asset.filename}</div>

  return null
}

export const Asset = memo(AssetBase)
