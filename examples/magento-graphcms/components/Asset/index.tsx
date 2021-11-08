import { Image, ImageProps } from '@graphcommerce/image'
import React from 'react'
import { AssetFragment } from './Asset.graphql'

type ImageAsset = Pick<AssetFragment, 'url' | 'alt'> & {
  width: number
  height: number
}

function isImage(asset: AssetFragment): asset is ImageAsset {
  return !!(asset.width && asset.height)
}

type AssetProps = {
  asset: AssetFragment
} & Pick<ImageProps, 'sizes' | 'layout' | 'loading'>

export default function Asset(props: AssetProps) {
  const { asset, sizes } = props

  if (isImage(asset)) {
    return (
      <Image
        src={asset.url}
        height={asset.height}
        width={asset.width}
        alt={asset.alt ?? undefined}
        sizes={sizes}
      />
    )
  }

  if (asset.mimeType === 'video/mp4') {
    return <video src={asset.url} autoPlay muted loop playsInline />
  }

  return <div>{asset.mimeType} not supported</div>
}
