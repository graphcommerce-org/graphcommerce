import { imageMimeTypes, ImageMimeTypes } from '@reachdigital/next-ui/PictureResponsive'
import PictureResponsiveNext, {
  PictureResponsiveNextProps,
} from '@reachdigital/next-ui/PictureResponsiveNext'
import React from 'react'
import { AssetFragment } from './Asset.gql'

type ImageAsset = Pick<AssetFragment, 'url'> & {
  mimeType: ImageMimeTypes
  width: number
  height: number
}

function isImage(asset: AssetFragment): asset is ImageAsset {
  return !!(
    asset.width &&
    asset.height &&
    imageMimeTypes.includes(asset.mimeType as ImageMimeTypes)
  )
}

type AssetProps = {
  asset: AssetFragment
} & Omit<PictureResponsiveNextProps, 'type' | 'alt' | 'src' | 'height' | 'ref'>

export default function Asset(props: AssetProps) {
  const { asset, width, ...imgProps } = props

  if (isImage(asset)) {
    return (
      <PictureResponsiveNext
        type={asset.mimeType}
        src={asset.url}
        height={Math.round((asset.height / asset.width) * width)}
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
