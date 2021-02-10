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
  alt: string
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
} & Omit<PictureResponsiveNextProps, 'type' | 'src' | 'height' | 'alt'>

export default function Asset(props: AssetProps) {
  const { asset, width, ...imgProps } = props

  if (isImage(asset)) {
    return (
      <PictureResponsiveNext
        type={asset.mimeType}
        src={asset.url}
        height={Math.round((asset.height / asset.width) * width)}
        width={width}
        alt={asset.alt}
        {...imgProps}
      />
    )
  }

  return <div>{asset.mimeType} not supported</div>
}
