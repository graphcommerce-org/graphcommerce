import { Image, ImageProps } from '@graphcommerce/image'
import React from 'react'
import { AssetFragment } from './Asset.gql'

type ImageAsset = Pick<AssetFragment, 'url' | 'alt'> & {
  width: number
  height: number
}

function isImage(asset: AssetFragment): asset is ImageAsset {
  return !!(asset.width && asset.height)
}

type AssetProps = {
  asset: AssetFragment
} & Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'>

export default function Asset(props: AssetProps) {
  const { asset, ...imgProps } = props

  if (isImage(asset)) {
    return (
      <Image
        src={asset.url}
        height={asset.height}
        width={asset.width}
        alt={asset.alt ?? undefined}
        {...imgProps}
      />
    )
  }

  if (asset.mimeType === 'video/mp4') {
    return <video src={asset.url} autoPlay muted loop playsInline disableRemotePlayback />
  }

  if (process.env.NODE_ENV !== 'production') return <div>{asset.mimeType} not supported</div>
  return null
}
