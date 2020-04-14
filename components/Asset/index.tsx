import React from 'react'
import { ImageMimeTypes } from '../PictureResponsive'
import FilestackPicture, { FilestackPictureProps } from '../FilestackPicture'

type UnsupportedProps = {
  asset: GQLAssetFragment
}

type ImageProps = {
  asset: {
    // width: number
    // height: number
    mimeType: ImageMimeTypes
  } & GQLAssetFragment
} & Omit<FilestackPictureProps, 'src' | 'type'>

type VideoProps = {
  asset: {
    mimeType: 'video/mp4'
  } & GQLAssetFragment
} & Omit<JSX.IntrinsicElements['video'], 'src'>

const Asset: React.FC<ImageProps | VideoProps | UnsupportedProps> = ({ asset, ...props }) => {
  if (!asset.mimeType) {
    throw new Error('Asset has no mimeType, can not determine renderer.')
  }

  const url = new URL(asset.url)
  url.pathname = `cache=expiry:max/${url.pathname.substr(1)}`

  switch (asset.mimeType) {
    case 'video/mp4':
      return (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video {...(props as VideoProps)}>
          <source src={url.toString()} type={(asset as VideoProps['asset']).mimeType} />
        </video>
      )
    case undefined:
    case null:
      return <div>Corrupt file {(asset as UnsupportedProps['asset']).url}</div>
    default:
      if (!asset.width || !asset.height) throw new Error('Missing width/height')
      if (!(props as ImageProps).width)
        console.warn(
          'Width property should be the width as rendered on Nexus5X (lighthouse) for:',
          asset.url,
        )

      // eslint-disable-next-line no-case-declarations
      const width = (props as ImageProps).width || 100

      return (
        <FilestackPicture
          {...(props as ImageProps)}
          src={(asset as VideoProps['asset']).url}
          type={(asset as ImageProps['asset']).mimeType}
          width={width}
          height={Math.round((asset.height / asset.width) * width)}
        />
      )
  }
}

export default Asset
