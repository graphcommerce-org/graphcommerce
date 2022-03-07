import { removeNull } from '@graphcommerce/graphql'
import { Image, ImageProps } from '@graphcommerce/image'
import { AssetFragment } from './Asset.gql'

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
} & Omit<ImageProps, 'src' | 'width' | 'height'>

export function Asset(props: AssetProps) {
  const { asset, ...imgProps } = props

  if (isImage(asset)) {
    const { url, height, mimeType, size, width, ...assetProps } = removeNull(asset)
    return (
      <Image
        src={url}
        height={height}
        width={width}
        {...imgProps}
        {...assetProps}
        unoptimized={mimeType === 'image/svg+xml'}
      />
    )
  }

  if (asset.mimeType === 'video/mp4') {
    return <video src={asset.url} autoPlay muted loop playsInline disableRemotePlayback />
  }

  if (process.env.NODE_ENV !== 'production') return <div>{asset.mimeType} not supported</div>
  return null
}
