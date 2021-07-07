import { Image, getInt, ImageProps } from '@reachdigital/image'
import React from 'react'
import { AssetFragment } from './Asset.gql'

type ImageAsset = Pick<AssetFragment, 'url'> & {
  width: number
  height: number
}

function isImage(asset: AssetFragment): asset is ImageAsset {
  return !!(asset.width && asset.height)
}

type AssetProps = {
  asset: AssetFragment
} & Omit<ImageProps, 'type' | 'alt' | 'src' | 'height' | 'ref'>

export default function Asset(props: AssetProps) {
  const { asset, width = 1, ...imgProps } = props

  if (isImage(asset)) {
    return (
      <Image
        src={asset.url}
        height={Math.round((asset.height / asset.width) * (getInt(width) ?? 1))}
        width={width}
        {...imgProps}
        alt={asset.url}
      />
    )
  }

  if (asset.mimeType === 'video/mp4') {
    return <video src={asset.url} autoPlay muted loop playsInline />
  }

  return <div>{asset.mimeType} not supported</div>
}
