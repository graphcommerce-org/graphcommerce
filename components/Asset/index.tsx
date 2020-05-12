import React from 'react'
import { ImageMimeTypes } from 'components/PictureResponsive'
import FilestackPicture, { FilestackPictureProps } from 'components/FilestackPicture'
import VideoResponsive, {
  VideoResponsiveProps,
  VideoMimeTypes,
} from 'components/PictureResponsive/VideoResponsive'

export type MimeTypes = ImageMimeTypes & 'video/mp4'

type UnsupportedProps = { asset: GQLAssetFragment }

type SvgProps = {
  asset: { mimeType: 'image/svg+xml' } & GQLAssetFragment
} & Omit<JSX.IntrinsicElements['img'], 'src' | 'type'>

type ImageProps = {
  asset: { mimeType: Omit<ImageMimeTypes, 'image/svg+xml'> } & GQLAssetFragment
} & Omit<FilestackPictureProps, 'src' | 'type' | 'height'>

type VideoProps = {
  asset: { mimeType: VideoMimeTypes } & GQLAssetFragment
} & Omit<VideoResponsiveProps, 'src' | 'height'>

const Asset: React.FC<SvgProps | ImageProps | VideoProps | UnsupportedProps> = ({
  asset,
  ...props
}) => {
  if (!asset.mimeType) {
    throw new Error('Asset has no mimeType, can not determine renderer.')
  }

  const url = new URL(asset.url)
  url.pathname = `cache=expiry:max/${url.pathname.substr(1)}`

  switch (asset.mimeType) {
    case 'video/mp4':
    case 'video/webv':
      return (
        <VideoResponsive
          muted
          playsInline
          loop
          autoPlay
          src={url.toString()}
          {...(props as VideoProps)}
        />
      )
    case 'image/svg+xml':
      return (
        <img
          src={url.toString()}
          alt={asset.alt ?? ''}
          {...(props as JSX.IntrinsicElements['img'])}
        />
      )
    case undefined:
    case null:
      return <div>Corrupt file {asset.url}</div>
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
          src={asset.url}
          alt={asset.alt ?? ''}
          type={asset.mimeType as ImageMimeTypes}
          width={width}
          height={Math.round((asset.height / asset.width) * width)}
        />
      )
  }
}

export default Asset
