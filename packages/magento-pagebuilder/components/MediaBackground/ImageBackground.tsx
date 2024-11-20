import { Image } from '@graphcommerce/image'
import type { SxProps, Theme } from '@mui/material'
import { extractImageBackgroundProps } from './extractImageBackgroundProps'
import type { ImageBackgroundProps } from './getImageBackgroundProps'

type ImageBackgroundComponentProps = ImageBackgroundProps & {
  sx?: SxProps<Theme>
}

export function ImageBackground(props: ImageBackgroundComponentProps) {
  const { sx = [] } = props
  const [
    {
      desktopImage,
      mobileImage,
      backgroundSize,
      backgroundRepeat, // @todo implement backgroundRepeat
      backgroundPosition,
      backgroundAttachment, // @todo implement backgroundAttachment
    },
  ] = extractImageBackgroundProps(props)

  const objectFit = backgroundSize as React.CSSProperties['objectFit']
  const objectPosition = backgroundPosition as React.CSSProperties['objectPosition']

  return (
    <>
      {desktopImage && (
        <Image
          src={desktopImage}
          layout='fill'
          sizes='100vw'
          sx={{ objectFit, objectPosition }}
          pictureProps={{ sx: [...(Array.isArray(sx) ? sx : [sx])] }}
        />
      )}
      {mobileImage && (
        <Image
          src={mobileImage}
          layout='fill'
          sizes='100vw'
          sx={{ objectFit, objectPosition }}
          pictureProps={{ sx: [...(Array.isArray(sx) ? sx : [sx])] }}
        />
      )}
    </>
  )
}
